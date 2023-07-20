import { useEffect } from 'react';
import axios from 'axios';

const TwitterAuthPage = () => {
  useEffect(() => {
    // Step 1: Obtain request token
    const requestData = {
      oauth_callback: 'http://www.localhost:3000/twitterCallback',
      oauth_consumer_key: 'QXFsUzJwelJTVDd1TnpVR0VCNzE6MTpjaQ',
    };

    console.log('Request Data:', requestData); // Log the request data

    axios
      .post('/api/twitter', requestData)
      .then((response) => {
        // Step 2: Redirect user to authorize your application
        const { oauth_token } = response.data;
        window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`;
      })
      .catch((error) => {
        console.error('Error obtaining request token:', error);
      });
  }, []);

  return <div>Redirecting to Twitter for authorization...</div>;
};

export default TwitterAuthPage;


