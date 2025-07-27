import 'dotenv/config';
import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import querystring from 'querystring';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/auth/login', (req, res) => {
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || `http://localhost:${PORT}/auth/callback`;
  const scope = 'user-top-read';
  const params = querystring.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope
  });
  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Missing code');
  }
  try {
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI || `http://localhost:${PORT}/auth/callback`;
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      })
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) {
      throw new Error('No access token');
    }
    const tracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const tracksData = await tracksResponse.json();
    const html = `<html><body><h2>Your Top 10 Tracks (last month)</h2><ul>` +
      tracksData.items.map(t => `<li>${t.name} - ${t.artists.map(a => a.name).join(', ')}</li>`).join('') +
      `</ul></body></html>`;
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching tracks');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
