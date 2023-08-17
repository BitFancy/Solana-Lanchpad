import React, { useEffect, useState } from "react";
import Layout from '../Components/Layout'
import { Button } from 'primereact/button'
import Link from 'next/link'
import axios from "axios";
import Loader from "../Components/LoadingSpinner";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function SubscriptionDashboard() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [defulatImage, setDefulatImage]=useState("https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png");
  const [loadingsetup, setLoadingsetup] = useState(false);
  const [loadingmanage, setLoadingmanage] = useState(false);
  const [loadingview, setLoadingview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [loading1, setLoading1] = useState(false);


  useEffect(() => {
    getSubscriptionData();
  }, []);

  const loadsetup = () => {
    setLoadingsetup(true);

    setTimeout(() => {
        setLoadingsetup(false);
    }, 2000);
}; 
const loadnewPlan = () => {
  setLoading1(true);

  setTimeout(() => {
      setLoading1(false);
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
      .get(`${BASE_URL_LAUNCH}api/v1.0/storefront`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        setLoading(true);

        if (response?.data?.length > 0) {
          setSubscriptionData(response.data);
        }
        setLoading(false);

      })
      
      .catch((error) => {
        console.log("Error in Fetching subscription..!", error);
      }).finally(()=>{
        setLoading(false);
        setLoading1(false);
        setLoading2(false);
        
      })
  };
  const load2 = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
const  replaceImage = (error) => {
   
    error.target.src = defulatImage;
}
  return (
   <Layout>
    <div className="overview-donut-top-back">
   <div className="text-white text-3xl font-bold">Storefronts</div> 
<div className="flex mt-2 text-center justify-content-center gap-5 align-items-center">
  <div className="text-white text-2xl">Testnet</div>
  <div>
    <img style={{width:'95px',height:'65px'}} src='/Toggle.png'></img>
  </div>
  <div className="text-white text-2xl">Mainnet</div>
</div>
<div className="flex justify-content-end gap-5">
  <div>
    <Link href='/addSubscription'>
   <Button   loading={loading2} onClick={load2}  rounded style={{background:'white',color:'black'}} label="Launch"></Button>
   </Link>
  </div>
  <div>
    <Button rounded style={{border:'1px solid white'}} label="Upgrade"></Button>
  </div>
</div>
      </div>
     <div  className="buy-back-image-subs-dashboard">
      <hr></hr>
      
      <div style={{width:'85%',margin:'0 auto'}}>
        <div className="flex justify-content-between">
        <div className="font-bold text-3xl p-5 text-center">You are Currently Observing the 
Deployed Storefronts</div>
<div className="p-5">
  <Link href='/buySubscription'>
  <Button onClick={loadnewPlan} loading={loading1} label="Buy Anather Plan"></Button>
  </Link>
</div>
        </div>
    
      <hr></hr>
      {subscriptionData?.length > 0 ? (
      subscriptionData.map((subscription) => {
              return (
                <div key={1} >
                  {subscription.plan==='basic' &&
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
                  }
                  
                {subscription.plan==='pro' &&
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
                }
               
              </div>
                 );
                })
                ) : loading ? (
                  <Loader />
                ) : (
                  <div className="text-2xl pb-10 font-bold text-center">
                    You haven&apos;t created any asset.
                  </div>
                )}
              </div>
              </div>
   </Layout>
  )
}
