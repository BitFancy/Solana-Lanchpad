import React, { useState, useEffect } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useRouter } from 'next/router';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import qs from 'qs';


const header = (
  <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
);

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


const PinPage = () => {
  const [pin, setPin] = useState('');
  const [twitt, settwitt] = useState(null);
  const [ error, seterror] = useState(false);

  const router = useRouter();
  const { oAuthToken, oAuthTokenSecret, authURL } = router.query;

  const saveUserDataToLocalStorage = (user) => {
    localStorage.setItem('twitteruserData', JSON.stringify(user));
  };
  

  async function exchangeTokens(ot, ots, pin) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ oauth_token: ot, oauth_token_secret: ots, oauth_verifier: pin })
    };

    try {
      const response = await fetch('/api/twitter', requestOptions);
      const data = await response.json();

      if(data.screen_name){
        settwitt(data);
        saveUserDataToLocalStorage(data);
        seterror(false);
        // fetchProfilePicture();
        router.push("/profile");
        return data;
      }
      else {
        // seterror(true);
        return data;
      }
    } catch (error) {
      console.error('Failed to exchange tokens:', error);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your Next.js API route with the entered PIN
      console.log(pin);

      const oAuthAccessToken = await exchangeTokens(
        oAuthToken,
        oAuthTokenSecret,
        pin
      );

      // Handle the response or redirect the user to a success page
      console.log(oAuthAccessToken);
    } catch (error) {
      console.error('Failed to authenticate with Twitter:', error);
      // Handle the error or redirect the user to an error page
    }
  };

  return (
      <div className="card flex justify-content-center">
            <Card title="Enter PIN" subTitle="Please go to the below Authentication link and enter the PIN displayed on the Twitter page" 
            // header={header} 
            className="md:w-25rem">
      <a href={authURL} target="_blank" rel="noopener noreferrer">Twitter Authentication Link</a>
            <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
            </Card>

      {
        error ? (
          <>
          <p>Enter correct pin please</p>
          </>
        ) : null
      }
    </div>
  );
};

export default PinPage;     
