import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setAlertmsg] = useState("");
  const [alerttype, setAlerttype] = useState("error");

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
  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <InputText
            className="inputField"
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
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </Button>
        </div>
        <div className="gap-5 flex mt-5">
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
       
      </div>
    </div>
  );
}
