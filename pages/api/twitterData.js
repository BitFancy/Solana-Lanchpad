// import OAuth from 'oauth-1.0a';
// import crypto from 'crypto';
// import got from 'got';

// const endpointURL = 'https://api.twitter.com/2/users/me';

// // Replace with your Twitter API credentials
// const consumer_key = process.env.MYRIADFLOW_TWITTER_API_KEY;
// const consumer_secret = process.env.MYRIADFLOW_TWITTER_API_SECRET_KEY;

// const oauth = OAuth({
//     consumer: {
//       key: consumer_key,
//       secret: consumer_secret,
//     },
//     signature_method: 'HMAC-SHA1',
//     hash_function: (baseString, key) =>
//       crypto.createHmac('sha1', key).update(baseString).digest('base64'),
//   });

// const getRequest = async (req, res) => {

//   const { oauth_token, oauth_token_secret } = req.body;

//   const token = {
//     key: oauth_token,
//     secret: oauth_token_secret,
//   };

//   const authHeader = oauth.toHeader(
//     oauth.authorize(
//       {
//         url: endpointURL,
//         method: 'GET',
//       },
//       token
//     )
//   );

//   try {
//     const req = await got(endpointURL, {
//       headers: {
//         Authorization: authHeader['Authorization'],
//         'user-agent': 'v2UserLookupJS',
//       },
//     });

//     if (req.body) {
//       return JSON.parse(req.body);
//     } else {
//       throw new Error('Unsuccessful request');
//     }
//   } catch (error) {
//     console.error('Failed to fetch Twitter user data:', error);
//     throw new Error('Failed to fetch Twitter user data');
//   }
// };

// export default getRequest;

import OAuth from "oauth-1.0a";
import crypto from "crypto";
import qs from "qs";
import got from "got";

const consumer_key = process.env.NEXT_PUBLIC_MYRIADFLOW_TWITTER_API_KEY;
const consumer_secret =
  process.env.NEXT_PUBLIC_MYRIADFLOW_TWITTER_API_SECRET_KEY;

const verifyCredentialsURL =
  "https://api.twitter.com/1.1/account/verify_credentials.json";

const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret,
  },
  signature_method: "HMAC-SHA1",
  hash_function: (baseString, key) =>
    crypto.createHmac("sha1", key).update(baseString).digest("base64"),
});

async function getTwitterData(access_token, access_token_secret) {
  const token = {
    key: access_token,
    secret: access_token_secret,
  };

  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url: verifyCredentialsURL,
        method: "GET",
      },
      token
    )
  );

  try {
    const req = await got.get(verifyCredentialsURL, {
      headers: {
        Authorization: authHeader["Authorization"],
        "user-agent": "v2UserLookupJS",
      },
    });

    if (req.body) {
      return JSON.parse(req.body);
    } else {
      throw new Error("Unsuccessful request");
    }
  } catch (error) {
    console.error("Failed to fetch Twitter data:", error);
    throw new Error("Failed to fetch Twitter data");
  }
}

export default async function handler(req, res) {
  const { access_token, access_token_secret } = req.body;

  try {
    const twitterData = await getTwitterData(access_token, access_token_secret);
    res.status(200).json(twitterData);
  } catch (error) {
    console.error("Failed to authenticate with Twitter:", error);
    res.status(500).json({ error: "Failed to fetch Twitter data" });
  }
}
