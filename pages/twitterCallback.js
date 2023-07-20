import React, { useEffect , useState} from 'react';
import { useRouter } from 'next/router';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

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

const TwitterCallbackPage = () => {
  const router = useRouter();
  const [twitt, settwitt] = useState(null);

  const saveUserDataToLocalStorage = (user) => {
    localStorage.setItem('twitteruserData', JSON.stringify(user));
  };



  useEffect(() => {
    // Get the query parameters from the URL
    const { oauth_token, oauth_verifier } = router.query;

    const fetchTokens = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oauth_token , oauth_verifier })
      };
      
      try {
        const response = await fetch('/api/twitterCallback', requestOptions);
        const data = await response.json();

        if(data.screen_name){
          settwitt(data);
          saveUserDataToLocalStorage(data);
          router.push("/profile");
          return data;
        }
        else {
          // seterror(true);
          return data;
        }

        console.log('Access tokens exchanged successfully!', data);
      } catch (error) {
        console.error('Failed to exchange tokens:', error);
      }
    };

    fetchTokens();
  }, [router.query]);

  return (
    <div>
      <h1>Processing...</h1>
      {/* You can show a loading spinner or other UI elements while the exchange is in progress */}
    </div>
  );
};

export default TwitterCallbackPage;
