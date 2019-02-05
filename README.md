# Poshett-Spotify

**Poshett-Spotify** displays the currently playing track's album cover in your browser.

## Installing

### Installing the project

After cloning the project, run :

```bash
npm install
```

### Linking the Poshett-Spotify to your developer account

Now you'll need to register a Spotify Developer account.

- If you don't already have one, create a Spotify account : https://www.spotify.com/signup
- Using your account login to the developer dashboard : https://developer.spotify.com/dashboard/login
- Click on "CREATE AN APP" and fill the form this way :
  * "App or Hardware name" : `Poshett-Spotify`
  * "App or Hardware description" : `My personal instance of Poshett-Spotify`
  * "What are you building" : `I don't know`
- Tick all three checkboxes after reading them, and finish the app creation.
- Now that you're on the application dashboard, click on "Edit Settings"
  * Under "Redirect URIs", add the two following URIs :
    * `http://localhost:33033/spotify-callback`
    * `localhost:33033/spotify-callback`
  * Save your changes using the "Save" button at the bottom.
  
Once you did all of that, the last thing you'll need is to grab your new app's Client ID and Client Secret.
They are located at the left of the app's dashboard page. To show your client secret, click on "SHOW CLIENT SECRET".

Then, copy both values and paste them in a newly created ``spotify/config/credentials.json``. The file should look like this :

```json
{
  "clientId": "0123456789abcdef0123456789abcdef",
  "clientSecret": "fedcba9876543210fedcba9876543210"
}
```

## Building

If you got the code through GitHub, you need to compile the code before running it. To do this, run :

`
npm run build
`

## Usage

Once you did the necessary steps to complete the installation (and build), run :

`
npm run start
`

A browser should open, letting you log in using the Spotify account of your choice.
