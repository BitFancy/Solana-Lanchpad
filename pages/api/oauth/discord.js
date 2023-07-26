import axios from 'axios';

const CLIENT_ID = process.env.NEXT_PUBLIC_MYRIADFLOW_DISCORD_CLIENT_ID;
const REDIRECT_URL = process.env.NEXT_PUBLIC_MYRIADFLOW_DISCORD_REDIRECT_URI;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_MYRIADFLOW_DISCORD_CLIENT_SECRET;
const API_ENDPOINT = 'https://discord.com/api/v10';


function isAccessTokenValid(tokenData) {
  if (!tokenData || !tokenData.expires_in || !tokenData.token_time) {
    return false;
  }

  // Convert the `expires_in` value to milliseconds and calculate the token expiration time
  const expiresInMs = tokenData.expires_in * 1000;
  const tokenExpirationTime = tokenData.token_time + expiresInMs;

  // Compare the current time with the token expiration time
  const currentTime = Date.now();
  return currentTime < tokenExpirationTime;
}


export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided.' });
  }

  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URL,
    scope: 'identify'
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.post(`${API_ENDPOINT}/oauth2/token`, data, {
      headers: headers,
    });


    response.data.token_time = Date.now();


    if (isAccessTokenValid(response.data)) {

      // res.status(200).json({ access_token: response.data });
      
      // perform get user data api
      const userDataResponse = await axios.get(`${API_ENDPOINT}/users/@me`, {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });

      // Set the cookie with the user data
      res.setHeader(
        'Set-Cookie',
        `discordUserData=${JSON.stringify(userDataResponse.data)}; Path=/;`
      );

      res.redirect("/profile");
  
      // Send a response with the user data
      res.status(200).json({ user: userDataResponse.data});
    }
    else {

      const tokendata = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: response.data.refresh_token,
      });

      const refreshToken = await axios.post(`${API_ENDPOINT}/oauth2/token`, tokendata, {
        headers: headers,
      });

      res.status(200).json({ refresh_token: refreshToken.data });

    }

  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    res.status(500).json({ error: error, code });
  }
}
