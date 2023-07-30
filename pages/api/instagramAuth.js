// api/instagramAuth.js

import axios from "axios";

const shortLivedTokenEndpoint = 'https://api.instagram.com/oauth/access_token';
const longLivedTokenEndpoint = 'https://graph.instagram.com/access_token';


export default async function handler(req, res) {

  const { code } = req.query;

  try {
    // Step 1: Exchange the authorization code for a short-lived access token
    const formData = new URLSearchParams();
    formData.append('client_id', process.env.NEXT_PUBLIC_MYRIADFLOW_INSTAGRAM_CLIENT_ID);
    formData.append('client_secret', process.env.NEXT_PUBLIC_MYRIADFLOW_INSTAGRAM_CLIENT_SECRET);
    formData.append('code', code);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', process.env.NEXT_PUBLIC_MYRIADFLOW_INSTAGRAM_REDIRECT_URL);

    const response = await axios.post(shortLivedTokenEndpoint, formData);
    const shortLivedAccessToken = response.data.access_token;

    // Step 2: Exchange the short-lived access token for a long-lived token
    const longLivedTokenResponse = await axios.get(longLivedTokenEndpoint, {
      params: {
        grant_type: 'ig_exchange_token',
        client_secret: process.env.NEXT_PUBLIC_MYRIADFLOW_INSTAGRAM_CLIENT_SECRET,
        access_token: shortLivedAccessToken,
      },
    });

    const longLivedAccessToken = longLivedTokenResponse.data.access_token;


    const userDataEndpoint = `https://graph.instagram.com/me?fields=id,username,name,account_type,media_count,followers_count,follows_count,biography,profile_picture_url&access_token=${longLivedAccessToken}`;
    const userData = await axios.get(userDataEndpoint);

    try {

      // Construct the API endpoint for reading an Instagram user profile
      const graphApiEndpoint = `https://www.instagram.com/${userData.data.username}/?__a=1&__d=1`;

      const userDataResponse = await axios.get(graphApiEndpoint);

      res.status(200).json({ data: userDataResponse.data});

    }
    catch (error) {

      const farFutureDate = new Date();
      farFutureDate.setFullYear(farFutureDate.getFullYear() + 10);

      // Set the cookie with the user data
      res.setHeader(
        'Set-Cookie',
        `instaData=${JSON.stringify(userData.data)}; Path=/; Expires=${farFutureDate.toUTCString()};`
      );

      res.redirect("/profile");

      // res.status(200).json({
      //   "error": error.message, "Request URL:": error.config.url, "Request params:": error.config.params,
      //   "Response data:": error.response?.data,

      //   code: code, shortLivedAccessResponse: response.data, longLivedTokenResponse: longLivedTokenResponse.data, success: userData.data
      // });
    }

  } catch (error) {
    console.error("Error:", error.message);
    // Send an error response back to the client
    res.status(500).json({ error: "Failed to authenticate with Instagram" });
  }
}
