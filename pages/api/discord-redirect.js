import axios from 'axios';

const handler = async(req, res) => {
  const { code } = req.query;

  console.log(code);

  // Replace with your Discord application's client ID and client secret
  const clientId = '1127173732104929332';
  const clientSecret = 'SogOYINA-dsY4fJ444sULxjJdONuE_G1';
  const redirectUri = 'http://localhost:3000/api/discord-redirect'; // Replace with your redirect URI

  try {
    // Exchange the authorization code for an access token
    const response = await axios.post('https://discord.com/api/v10/oauth2/token', {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      scope: 'identify',
    });

    const accessToken = response.data.access_token;
    // Store the access token or perform further actions with it

    // Redirect the user to a success page or the desired route
    res.redirect('/profile');
  } catch (error) {
    console.log('Discord authentication error:', error.response.data);
  }
}

export default handler;