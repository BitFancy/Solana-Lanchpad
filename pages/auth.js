import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import AppConfig from "../layout/AppConfig";
import Router from 'next/router'
import Layout from "../Components/Layout";

const Auth=()=> {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
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
          Router.push('/launchpad')
          
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

  const handleLogin = async (email) => {

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }
  async function signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
  }

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }

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
  return (
    <Layout title="Auth Page" description="Used to Authentication of the user">

    <div className="row justify-content-center flex">
      <div className="col-6 form-widget text-center mt-5">
        <h1 className="header">Sign In</h1>
        <div>CONTINUE WITH</div>
        <div className="gap-5 flex mt-5 justify-content-center align-items-center">
         
      <div style={{borderRadius:"50%",padding:"10px",background:"black"}}>
        <img src="google.png" onClick={signInWithGoogle} style={{width:"20px"}} alt="google"></img>
      </div>
        
        
        
        <div style={{borderRadius:"50%",padding:"10px",background:"black"}}>
      
        <img src="facebook.png" alt="facebook" onClick={signInWithFacebook} style={{width:"20px"}}></img>

        
        </div>
        <div style={{borderRadius:"50%",padding:"10px",background:"black"}}>
        <img src="tweeter.png" alt="tweeter" onClick={signInWithFacebook} style={{width:"20px"}}></img>

        </div>
        <div style={{borderRadius:"50%",padding:"10px",background:"black"}}>
        <img src="discord.png" alt="discord" onClick={signInWithDiscord} style={{width:"20px"}}></img>

        </div>
        </div>
        <div style={{borderBottom:"1px solid",padding:"30px"}}></div>
      <div className="mt-5">EMAIL</div>
        <div >
          <InputText
            className="inputField w-full mt-5" style={{borderRadius:"22px"}}
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-5" >
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="button block m-auto w-full"
            disabled={loading} style={{borderRadius:"22px"}}
          >
            <span>{loading ? "Loading" : "Continue with Email"}</span>
          </Button>
        </div>
      <div style={{borderBottom:"1px solid",padding:"30px"}}></div>
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
  );
}

Auth.getLayout = function getLayout(page) {
  return (
      <React.Fragment>
          {page}
          <AppConfig simple />
      </React.Fragment>
  );
};

export default Auth;