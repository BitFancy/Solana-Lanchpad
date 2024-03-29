import { useState, useEffect } from "react";
import Router from "next/router";
import Launchpad from "./launchpad";
import BuyNft from "./buySubscription";
export default function Home() {
  const [authToken, setAuthToken] = useState("");

 
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
   
  }, []);
  return (
    <div className="container">
      {!( authToken) ? <Launchpad /> :<BuyNft />}
    </div>
  );
}
