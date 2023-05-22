import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Router from 'next/router'

export default function Auth() {
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
    <div className="row justify-content-center flex">
      <div className="col-6 form-widget text-center mt-5">
        <h1 className="header">Sign In</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <InputText
            className="inputField w-full"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="button block m-auto"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </Button>
        </div>
        <div className="gap-5 flex mt-5 justify-content-center ">
          <div>
        <Button>
          <i
            onClick={signInWithGoogle}
            className="pi pi-google"
            style={{ fontSize: "2rem" }}
          >
            {" "}
          </i>
        </Button>
        </div>
        <div>
        <Button>
          <i
            onClick={signInWithFacebook}
            className="pi pi-facebook"
            style={{ fontSize: "2rem" }}
          >
           
          </i>
        </Button>
        </div>
        <div>
        <Button>
          <i
            onClick={signInWithDiscord}
            className="pi pi-discord"
            style={{ fontSize: "2rem" }}
          >
          
          </i>
        </Button>
        </div>
        <div >
        <Button>
          <i
            onClick={signout}
            className="pi pi-sign-out"
            style={{ fontSize: "2rem" }}
          >
            {" "}
          </i>
        </Button>
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
  );
}
