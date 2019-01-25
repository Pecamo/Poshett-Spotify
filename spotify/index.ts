// @ts-ignore
import SpotifyWebApi from "spotify-web-api-node";
import credentials from './config/credentials.json';

const scopes = ['user-read-private', 'user-read-currently-playing', 'user-read-playback-state', 'user-read-recently-played'];
const redirectUri = 'http://localhost:34567/callback';
const clientId = credentials.clientId;
const state = 'test1';
export class PoshettSpotify {

    SWA: SpotifyWebApi;

    auth() {
        const appCreds = {
            clientId: clientId,
            clientSecret: credentials.clientSecret,
            redirectUri: redirectUri,
        };

        this.SWA = new SpotifyWebApi(appCreds);

        const authorizeURL = this.SWA.createAuthorizeURL(scopes, state);

        console.log(authorizeURL);
    }

    run() {
        this.auth();
    }
}
