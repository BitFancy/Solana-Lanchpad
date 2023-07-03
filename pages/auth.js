import AppConfig from "../layout/AppConfig";
import Layout from "../Components/Layout";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
const Auth=()=> {
   return (
    <Layout title="Auth Page" description="Used to Authentication of the user">

    <div className="row justify-content-center flex">
      <div className="col-6 form-widget text-center mt-5">
        <h1 className="header">Sign In</h1>
        <div className='mt-5'>EXTERNAL WALLET</div>
        <div style={{margin:"40px 0px 0px 273px"}}>
        <ConnectButton/>
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