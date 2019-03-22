// @ts-ignore
import SpotifyWebApi from "spotify-web-api-node";
import credentials from './config/credentials.json';
import PoshettWeb, { MusicInformations } from '@fnu/poshett-web';
// @ts-ignore
import opn from 'opn';
import * as path from "path";
import Timeout = NodeJS.Timeout;
import {CurrentPlaybackState} from "./spotify-api-types/types";

const scopes = ['user-read-private', 'user-read-currently-playing', 'user-read-playback-state', 'user-read-recently-played'];
const redirectUri = (port: number) => `http://localhost:${port}/spotify-callback`;
const clientId = credentials.clientId;

export class PoshettSpotify {

  SWA: SpotifyWebApi;
  port: number = 33033;
  connected: boolean = false;
  web: PoshettWeb;
  lastAuthenticationState: string;
  lastPlayingItemId: any;
  polling: Timeout;

  init() {
    this.web = new PoshettWeb();
    this.web.initServer((app) => {
      app.get('/connect', (req, res) => {
        res.sendFile(path.resolve('src/public/connect.html'));
      });
      app.get('/spotify-auth', (req, res) => {
        const authURL = this.launchAuth();
        res.redirect(authURL);
      });
      app.get('/spotify-callback', (req, res) => {
        const { query } = req;
        const { error, state, code } = query;
        if (error) {
          res.sendFile(path.resolve('src/public/authError.html'));
        } else {
          if (state === this.lastAuthenticationState) {
            this.SWA.authorizationCodeGrant(code).then(
              (data: any) => {
                console.log('--- New client connected ! ---');
                this.connected = true;
                const timeout = data.body['expires_in'];
                setTimeout(() => this.refreshToken(), timeout * 1000 - 30000);
                console.log('The token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                console.log('The refresh token is ' + data.body['refresh_token']);

                // Set the access token on the API object to use it in later calls
                this.SWA.setAccessToken(data.body['access_token']);
                this.SWA.setRefreshToken(data.body['refresh_token']);

                this.polling = setInterval(() => {
                  this.SWA.getMyCurrentPlaybackState({})
                    .then((data: any) => {
                      const body = data.body as CurrentPlaybackState;
                      if (!body.item) {
                        return;
                      }
                      const image = body.item.album.images[0];
                      if (this.lastPlayingItemId !== body.item.id) {
                        this.lastPlayingItemId = body.item.id;
                        const artists = body.item.artists.map(artist => artist['name']).join();
                        const formatted: MusicInformations = {
                          title: body.item.name,
                          album: body.item.album.name,
                          artist: artists,
                          imgUrl: image.url
                        };
                        console.log(`Now playing : ${artists} - ${body.item.name} [${body.item.album.name}]`);
                        this.web.setCurrentMusic(formatted);
                      }
                    }, function(err: any) {
                      console.log('Something went wrong!', err);
                    });
                }, 2000);
              },
              (error: any) => {
                console.warn(`Failed authentication when getting acces token :`);
                console.warn(error);
                res.sendFile(path.resolve('src/public/authError.html'));
              });
            res.sendFile(path.resolve('src/public/authSuccess.html'));
          } else {
            console.warn(`Failed authentication : State didn't match`);
            res.sendFile(path.resolve('src/public/authError.html'));
          }
        }
      });
    });
  }

  refreshToken() {
    if (!this.connected) {
      console.log('Disconnected from Spotify account.');
      return;
    }
    this.SWA.refreshAccessToken()
      .then((data : any) => {
        console.log('The access token has been refreshed.');
        this.SWA.setAccessToken(data.body['access_token']);
        const timeout = data.body['expires_in'];
        setTimeout(() => this.refreshToken(), timeout * 1000 - 30000);
      },
      (err: any) => {
        console.warn('Could not refresh access token', err);
        console.warn('Trying to refresh again in 10 seconds...');
        setTimeout(() => this.refreshToken(), 10 * 1000);
      }
    );
  }

  start() {
    this.web.startServer(this.port);
    opn(`http://localhost:${this.port}/connect`);
  }

  launchAuth() {
    const appCreds = {
      clientId: clientId,
      clientSecret: credentials.clientSecret,
      redirectUri: redirectUri(this.port),
    };

    this.SWA = new SpotifyWebApi(appCreds);

    this.lastAuthenticationState = PoshettSpotify.generateStateToken();

    return this.SWA.createAuthorizeURL(scopes, this.lastAuthenticationState);
  }

  static generateStateToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  poll() {
    this.SWA.getMyCurrentPlaybackState({})
      .then((data: any) => {
        // Output items
        console.log("Now Playing: ", data.body);
      }, function(err: any) {
        console.log('Something went wrong!', err);
      });
  }
}
