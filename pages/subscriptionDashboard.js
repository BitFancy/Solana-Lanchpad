import React, { useEffect, useState } from "react";
import Layout from '../Components/Layout'
import { Button } from 'primereact/button'
import Link from 'next/link'
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function SubscriptionDashboard() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [defulatImage, setDefulatImage]=useState("https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png");
  const [loadingsetup, setLoadingsetup] = useState(false);
  const [loadingmanage, setLoadingmanage] = useState(false);
  const [loadingview, setLoadingview] = useState(false);

  useEffect(() => {
    getSubscriptionData();
  }, []);

  const loadsetup = () => {
    setLoadingsetup(true);

    setTimeout(() => {
        setLoadingsetup(false);
    }, 2000);
}; 
const loadsetupManage = () => {
  setLoadingmanage(true);

  setTimeout(() => {
      setLoadingmanage(false);
  }, 2000);
}; 
const loadsetupview = () => {
  setLoadingview(true);

  setTimeout(() => {
      setLoadingview(false);
  }, 2000);
}; 

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
     <div  className="buy-back-image" style={{marginTop:'100px'}}>
      <hr></hr>
                  <div style={{width:'85%',margin:'0 auto'}}>
     <div className="font-bold text-3xl p-5 text-center">Buy Subscription</div>
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
                    <Button loading={loadingsetup} onClick={loadsetup} label="Setup"></Button>
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
                    <Button loading={loadingview} onClick={loadsetupview} style={{width:'100%'}} label="View"></Button>
                  </div>
                  </Link>

                  <Link href='/accessMasterRole' >
                  <div className='mt-5'>
                    <Button loading={loadingmanage} onClick={loadsetupManage} style={{width:'100%'}}   label="Manage"></Button>
                  </div>
                  </Link>
                  </div>
                  
                </div>
              </div>
                 );
                })}
              </div>
              </div>
   </Layout>
  )
}
