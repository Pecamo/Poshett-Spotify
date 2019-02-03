// @ts-ignore
import SpotifyWebApi from "spotify-web-api-node";
import credentials from './config/credentials.json';
import PoshettWeb from '@fnu/poshett-web';
import http from 'http';
// @ts-ignore
import opn from 'opn';

const scopes = ['user-read-private', 'user-read-currently-playing', 'user-read-playback-state', 'user-read-recently-played'];
const redirectUri = 'http://localhost:34567/callback';
const clientId = credentials.clientId;
const state = 'test1';
export class PoshettSpotify {

  SWA: SpotifyWebApi;
  port: number = 34567;
  token: string;
  web: PoshettWeb;

  init() {
    this.web = new PoshettWeb();
    this.web.initServer();
    this.auth();
  }

  start() {
    this.web.startServer();
  }

  auth() {
    const appCreds = {
      clientId: clientId,
      clientSecret: credentials.clientSecret,
      redirectUri: redirectUri,
    };

    this.SWA = new SpotifyWebApi(appCreds);

    const authorizeURL = this.SWA.createAuthorizeURL(scopes, state);

    http.createServer((req, res) => { // TODO : Configure the web server instead
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write("Hello World");
      res.end();
    }).listen(this.port);

    opn(authorizeURL);

    console.log(authorizeURL);
  }

  setAccessToken(token: string) {
    this.token = token;
  }

  run() {
    this.auth();
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
