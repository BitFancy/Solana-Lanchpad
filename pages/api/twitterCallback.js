import OAuth from "oauth-1.0a";
import crypto from "crypto";
import qs from "qs";

// Replace these with your actual Twitter API credentials
const consumerKey = process.env.NEXT_PUBLIC_MYRIADFLOW_TWITTER_API_KEY;
const consumerSecret =
  process.env.NEXT_PUBLIC_MYRIADFLOW_TWITTER_API_SECRET_KEY;

const oauth = OAuth({
  consumer: {
    key: consumerKey,
    secret: consumerSecret,
  },
  signature_method: "HMAC-SHA1",
  hash_function: (baseString, key) =>
    crypto.createHmac("sha1", key).update(baseString).digest("base64"),
});

const handler = async (req, res) => {
  const accessTokenURL = "https://api.twitter.com/oauth/access_token";
  const { oauth_token, oauth_verifier } = req.body;

  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url: accessTokenURL,
        method: "POST",
        data: { oauth_verifier },
      },
      { key: oauth_token }
    )
  );

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: authHeader["Authorization"],
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oauth_verifier }),
  };

  try {
    const response = await fetch(accessTokenURL, requestOptions);
    const body = await response.text();
    const parsedBody = qs.parse(body);

    // Handle the response and send the access token back to the client
    res.status(200).json(parsedBody);
  } catch (error) {
    console.error("Failed to exchange tokens:", error);
    res.status(500).json({ error: "Failed to exchange tokens" });
  }
};

export default handler;
