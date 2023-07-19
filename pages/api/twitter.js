import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import qs from 'qs';

const consumer_key = 'f2HoWwaWN1fbzJbrpdGupEJcc';
const consumer_secret = '2FbIz2Io0bF5QHL9W8s9NguulrS9waUGGnkpdnjIJMBkOZrgvN';

const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

const handler = async (req, res) => {
  const { oauth_token, oauth_token_secret, oauth_verifier } = req.body;

  const accessTokenURL = 'https://api.twitter.com/oauth/access_token';

  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: accessTokenURL,
      method: 'POST',
      data: { oauth_verifier }
    }, { key: oauth_token, secret: oauth_token_secret })
  );

  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: authHeader['Authorization'],
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ oauth_verifier })
  };

  try {
    const response = await fetch(accessTokenURL, requestOptions);
    const body = await response.text();
    const parsedBody = qs.parse(body);

    // Handle the response and send the access token back to the client
    res.status(200).json(parsedBody);
  } catch (error) {
    console.error('Failed to exchange tokens:', error);
    res.status(500).json({ error: 'Failed to exchange tokens' });
  }
};

export default handler;
