# Spotify Login Example

This project demonstrates a basic login flow using Spotify's OAuth API.

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

Before running, set the following environment variables with your Spotify app credentials:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/auth/callback
```

Start the server and open `http://localhost:3000` in your browser. After logging in with Spotify, your top 10 tracks from the last month will be displayed.
