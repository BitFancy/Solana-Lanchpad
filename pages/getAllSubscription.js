import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Sidemenu from "./sidemenu";
import { Button } from "primereact/button";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Link from "next/link";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function GetAllSubscription() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [defulatImage, setDefulatImage]=useState("https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png");
  useEffect(() => {
    getSubscriptionData();
  }, []);
  const getSubscriptionData = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/subscription`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response?.data?.length > 0) {
          setSubscriptionData(response.data);
        }
      })
      .catch((error) => {
        console.log("Error in Fetching subscription..!", error);
      });
  };
const  replaceImage = (error) => {
   
    error.target.src = defulatImage;
}
  return (
    <Layout>
      <div style={{ marginTop: "65px" }}>
        
        <MarketplaceProfileDetails/>
        <hr></hr>
        <div className="flex  buy-back-image">
          <div>
            <Sidemenu />
          </div>

         
          <div style={{width:'85%',margin:'0 auto'}}>
     <div className="font-bold text-3xl p-5 text-center">Buy Subscription Details</div>
      <hr></hr>
      {subscriptionData.map((subscription) => {
              return (
                <div key={1} >
                   <div className="flex justify-content-between mt-5 ml-5 align-items-center subscription-back-part p-5">
                   <div className="flex gap-5">
                    <div>
                      <img
                        className="dash-img-size"
                        style={{ width: "100px", height: "100px" }}
                        src={subscription.image}
                        onError={replaceImage}
                      ></img>
                    </div>
                    <div className="text-white">
                      <div>My first marketplace</div>
                      <div>Id: {subscription?.id}</div>
                      <div>Plan: {subscription.plan}</div>
                      <div>Cost: {subscription.cost}</div>
                      <div>owner: {subscription.owner}</div>
                      <div>Currency: {subscription.currency}</div>
                    </div>
                  </div>

                  <Link href='/step1'>
                  <div>
                    <Button label="Setup"></Button>
                  </div>
                  </Link>
                </div>
                <div className="flex ml-5 justify-content-between mt-5 align-items-center subscription-back-part p-5">
                <div className="flex gap-5">
                    <div>
                      <img
                        className="dash-img-size"
                        style={{ width: "100px", height: "100px" }}
                        src={subscription.image}
                        onError={replaceImage}
                      ></img>
                    </div>
                    <div className="text-white">
                      <div>My first marketplace</div>
                      <div>Id: {subscription?.id}</div>
                      <div>Plan: {subscription.plan}</div>
                      <div>Cost: {subscription.cost}</div>
                      <div>owner: {subscription.owner}</div>
                      <div>Currency: {subscription.currency}</div>
                    </div>
                  </div>

                  <div>
                    <Link href='/getAllSignatureseries'>
                  <div >
                    <Button style={{width:'100%'}} label="View"></Button>
                  </div>
                  </Link>

                  <Link href='/accessMasterRole' >
                  <div className='mt-5'>
                    <Button style={{width:'100%'}}   label="Manage"></Button>
                  </div>
                  </Link>
                  </div>
                  
                </div>
              </div>
                 );
                })}
              </div>
        </div>
      </div>
    </Layout>
  );
}
