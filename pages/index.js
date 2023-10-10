import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Router from "next/router";
import Launchpad from "./launchpad";
import BuyNft from "./buySubscription";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
        setIsLoading(false);
      }
    }

    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, []);
  useEffect(() => {
    const pageHref = window.location.search;
    const searchParams = new URLSearchParams(
      pageHref.substring(pageHref.indexOf("?"))
    );
    const paseto = searchParams.get("paseto");
    if (paseto) {
      setAuthToken(paseto);
      localStorage.setItem("authToken", paseto);
      Router.push("/launchpad");
    } else {
      setAuthToken(localStorage.getItem("authToken"));
    }
    if (!session) {
      Router.push("/");
    }
  }, []);
  return (
    <div className="container">
      {!(session || authToken) ? <Launchpad /> :<BuyNft />}
    </div>
  );
}
