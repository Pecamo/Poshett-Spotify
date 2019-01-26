// @ts-ignore
import SpotifyWebApi from "spotify-web-api-node";
import credentials from './config/credentials.json';
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

    auth() {
        const appCreds = {
            clientId: clientId,
            clientSecret: credentials.clientSecret,
            redirectUri: redirectUri,
        };

        this.SWA = new SpotifyWebApi(appCreds);

        const authorizeURL = this.SWA.createAuthorizeURL(scopes, state);

        /* Create an HTTP server to handle responses */

        http.createServer((req, res) => {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write("Hello World");
            res.end();
        }).listen(this.port);

        opn(authorizeURL);

        console.log(authorizeURL);
    }

    run() {
        this.auth();
    }


}
