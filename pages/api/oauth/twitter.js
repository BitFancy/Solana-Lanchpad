import OAuth from "oauth-1.0a";
import crypto from "crypto";
import qs from "qs";
import got from "got";

const REDIRECT_URI = "http://www.localhost:3000/twitterCallback"; // Replace with your redirect URI
// const REDIRECT_URI = 'https://launchpad.myriadflow.com/twitterCallback';

const consumer_key = process.env.NEXT_PUBLIC_MYRIADFLOW_TWITTER_API_KEY;
const consumer_secret =
  process.env.NEXT_PUBLIC_MYRIADFLOW_TWITTER_API_SECRET_KEY;

const requestTokenURL = "https://api.twitter.com/oauth/request_token";
const endpointURL = `https://api.twitter.com/2/users/me?{params}`;

const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret,
  },
  signature_method: "HMAC-SHA1",
  hash_function: (baseString, key) =>
    crypto.createHmac("sha1", key).update(baseString).digest("base64"),
});

async function requestToken() {
  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: requestTokenURL,
      method: "POST",
      data: { oauth_callback: REDIRECT_URI },
    })
  );

  try {
    const req = await got.post(requestTokenURL, {
      headers: {
        Authorization: authHeader["Authorization"],
      },
    });

    if (req.body) {
      return qs.parse(req.body);
    } else {
      throw new Error("Cannot get an OAuth request token");
    }
  } catch (error) {
    console.error("Failed to obtain Twitter OAuth request token:", error);
    throw new Error("Cannot get an OAuth request token");
  }
}

export default async function handler(req, res) {
  try {
    const oAuthRequestToken = await requestToken();

    res.status(200).json({ oauth_token: oAuthRequestToken.oauth_token });
  } catch (error) {
    console.error("Failed to authenticate with Twitter:", error);
    res.status(500).json({ error: "Failed to authenticate with Twitter" });
  }
}
