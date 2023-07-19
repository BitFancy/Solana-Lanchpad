//     // Fetch the user data using the access token
//     const userData = await axios.get('https://api.twitter.com/1.1/account/verify_credentials.json', {
//       headers: {
//         Authorization: `Bearer ${response.data.access_token}`,
//       },
//     });







// import axios from 'axios';

// const TWITTER_CLIENT_ID = 'f2HoWwaWN1fbzJbrpdGupEJcc';
// const TWITTER_CLIENT_SECRET = '2FbIz2Io0bF5QHL9W8s9NguulrS9waUGGnkpdnjIJMBkOZrgvN';

// export default async function handler(req, res) {
//   try {
//     const credentials = Buffer.from(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`).toString('base64');

//     const requestBody = new URLSearchParams();
//     requestBody.append('grant_type', 'client_credentials');

//     const response = await axios.post(
//       'https://api.twitter.com/oauth2/token',
//       requestBody.toString(),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': `Basic ${credentials}`,
//         },
//       }
//     );

//     const { access_token } = response.data;
//     // Use the access_token for authenticated requests to the Twitter API

//     res.status(200).json({ access_token });

//   } catch (error) {
//     console.error('Failed to obtain Twitter API bearer token:', error);
//     res.status(500).json({ error: 'Failed to authenticate with Twitter' });
//   }
// }



import axios from 'axios';
import { generateCodeVerifier, generateCodeChallenge } from '../../../utils/pkceUtils';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import qs from 'qs';
import got from 'got';

const codeVerifier = generateCodeVerifier();

const TWITTER_CLIENT_ID = 'f2HoWwaWN1fbzJbrpdGupEJcc';
const TWITTER_CLIENT_SECRET = '2FbIz2Io0bF5QHL9W8s9NguulrS9waUGGnkpdnjIJMBkOZrgvN';
const REDIRECT_URI = 'http://www.localhost:3000/api/oauth/twitter'; // Replace with your redirect URI
const CODE_VERIFIER = codeVerifier; // Replace with your code verifier

const consumer_key = 'f2HoWwaWN1fbzJbrpdGupEJcc';
const consumer_secret = '2FbIz2Io0bF5QHL9W8s9NguulrS9waUGGnkpdnjIJMBkOZrgvN';
const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob';
const endpointURL = `https://api.twitter.com/2/users/me?{params}`;


const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

async function requestToken() {
  const authHeader = oauth.toHeader(oauth.authorize({
    url: requestTokenURL,
    method: 'POST'
  }));

  try {
    const req = await got.post(requestTokenURL, {
      headers: {
        Authorization: authHeader["Authorization"]
      }
    });

    if (req.body) {
      return qs.parse(req.body);
    } else {
      throw new Error('Cannot get an OAuth request token');
    }
  } catch (error) {
    console.error('Failed to obtain Twitter OAuth request token:', error);
    throw new Error('Cannot get an OAuth request token');
  }
}

async function exchangeTokens(oauthToken, oauthTokenSecret, pin) {
  const accessTokenURL = 'https://api.twitter.com/oauth/access_token';

  const token = {
    key: oauthToken,
    secret: oauthTokenSecret
  };

  const authHeader = oauth.toHeader(oauth.authorize({
    url: accessTokenURL,
    method: 'POST',
    data: { oauth_verifier: pin }
  }, token));

  const req = await got.post(accessTokenURL, {
    headers: {
      Authorization: authHeader["Authorization"],
      'Content-Type': 'application/json'
    },
    form: {
      oauth_verifier: pin
    }
  });

  if (req.body) {
    const parsedBody = qs.parse(req.body);
    const accessToken = parsedBody.oauth_token;
    const accessTokenSecret = parsedBody.oauth_token_secret;

    // Store the user's access tokens securely for future use
    // Use accessToken and accessTokenSecret for authenticated requests

    console.log('Access Tokens:', {
      accessToken,
      accessTokenSecret
    });
  } else {
    throw new Error('Failed to exchange tokens');
  }
}


async function getRequest({ oauth_token, oauth_token_secret }) {
  const token = {
    key: oauth_token,
    secret: oauth_token_secret
  };

  const authHeader = oauth.toHeader(oauth.authorize({
    url: endpointURL,
    method: 'GET'
  }, token));

  try {
    const req = await got(endpointURL, {
      headers: {
        Authorization: authHeader["Authorization"],
        'user-agent': "v2UserLookupJS"
      }
    });

    if (req.body) {
      return JSON.parse(req.body);
    } else {
      throw new Error('Unsuccessful request');
    }
  } catch (error) {
    console.error('Failed to make Twitter API request:', error);
    throw new Error('Unsuccessful request');
  }
}


export default async function handler(req, res) {
  try {

    const requestBody = new URLSearchParams();
    requestBody.append('code', req.query.oauth_verifier);
    requestBody.append('grant_type', 'client_credentials');
    requestBody.append('redirect_uri', REDIRECT_URI);
    requestBody.append('code_verifier', CODE_VERIFIER);

    const credentials = Buffer.from(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`).toString('base64');

    const response = await axios.post(
      'https://api.twitter.com/oauth2/token',
      requestBody.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`,
        },
      }
    );

    const { access_token } = response.data;
    // Use the access_token for authenticated requests to the Twitter API
    const oAuthRequestToken = await requestToken();

    const authorizationURL = `https://api.twitter.com/oauth/authenticate?oauth_token=${oAuthRequestToken.oauth_token}`;
    // res.redirect(authorizationURL);

    // Pass oAuthRequestToken to the redirect URL as a query parameter
    res.redirect(`/pinpage?oAuthToken=${oAuthRequestToken.oauth_token}&oAuthTokenSecret=${oAuthRequestToken.oauth_token_secret}&authURL=${authorizationURL}`);

    // await exchangeTokens(
    //   oAuthRequestToken.oauth_token,
    //   oAuthRequestToken.oauth_token_secret,
    //   pin
    // );

    res.status(200).json({ access_token, oAuthRequestToken});

  } catch (error) {
    console.error('Failed to authenticate with Twitter:', error);
    res.status(500).json({ error: 'Failed to authenticate with Twitter' });
  }
}
