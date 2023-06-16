import { useEffect, useState } from "react";
import Router from 'next/router'

import { SocialIcon } from 'react-social-icons';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { GoogleLogin } from 'react-google-login';
// import TwitterLogin from "react-twitter-login";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Layout from "../Components/Layout";

export default function SignIn() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState("");

  const providerOptions={walletconnect: {
    package: WalletConnect, 
    options: {
      infuraId: process.env.INFURA_KEY 
    }
  }}
  let web3Modal
  if(typeof window!== "undefined"){
    web3Modal=new Web3Modal({
      network:'mainnet',
      cacheProvider:true,
      providerOptions
    })
  }
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      setProvider(provider);
      if (accounts){
        setAccount(accounts[0]);
        console.log("navigation to dashboard")
          Router.push('/dashboardl')
      } 
    } 
  catch (error) {
      setError(error);
    }

  };

  const refreshState = () => {
    setAccount(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();

  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();

    }
  }, []); 

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };
      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  // const responseGoogle = (response) => {
  //   console.log(response);
  // }
  // const responseFacebook = (response) => {
  //   console.log(response);
  // }
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
