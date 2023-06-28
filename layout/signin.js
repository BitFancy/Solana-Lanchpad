import { useEffect, useState } from "react";
import Router from 'next/router'

import { SocialIcon } from 'react-social-icons';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { GoogleLogin } from 'react-google-login';
// import TwitterLogin from "react-twitter-login";
import Layout from "../Components/Layout";

export default function SignIn() {
  const [account, setAccount] = useState();

  
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return (
    <Layout title="Sign In" description="Used to Sign in information of the User">

    <div>
      <div className='text-center'>
      <div className='text-center mt-10 '>
        <div className='font-bold text-3xl'>Sign In</div>
        <div className='text-2xl mt-3 '>continue with</div>
        </div>
        <div className='flex justify-content-center gap-5 mt-5 border-b-2 border-indigo-500 ... p-5'>
{/* <div><SocialIcon url="https://google.com" /></div> */}
{/* <GoogleLogin
    clientId="772086324452-lu65slr4drogjeeilglhf7f7l15tk1pl.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  /> */}
{/* <div><SocialIcon url="https://facebook.com" /></div> */}
{/* <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook} /> */}
{/* <div><SocialIcon network="twitter" url="https://tweeter.com" /></div> */}
{/* <TwitterLogin
      authCallback={authHandler}
     
    /> */}
<div><SocialIcon url="https://discord.com" /></div>

        </div>
        <div className='border-b-2 border-indigo-500 ... p-5'>
          <div>Email</div>
          <div className='mt-3'>
            <InputText id="email" type="email" style={{width:"50%"}} className='rounded-full p-3.5 w-5/12' placeholder='Email'/>
          </div>
          <div className='mt-5'>
          {/* <GoogleLogin
    clientId="772086324452-lu65slr4drogjeeilglhf7f7l15tk1pl.apps.googleusercontent.com"
    buttonText="Continue with Email"
    onSuccess={responseGoogle}
    cookiePolicy={'single_host_origin'}
  /> */}
          </div>
        </div>
        <div className='mt-5'>EXTERNAL WALLET</div>
        
        
        <div className='mt-3'>
          
          {!account ? (
              <Button style={{width:"50%"}} label="Connect with wallet" severity="Primary" rounded  onClick={(e)=>{
                e.preventDefault()
                connectWallet()
              }
              }/>
            ) : (
              <Button onClick={disconnect}>Disconnect</Button>
            )}
        </div>
        </div>
    </div>
    </Layout>
  )
}
