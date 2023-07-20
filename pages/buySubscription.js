import { ethers } from "ethers";
import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import subscriptionAbi from '../artifacts/contracts/subscription/abi.json';
import { Messages } from "primereact/messages";
import {
    useAccount, useEnsName,
  } from 'wagmi'
import Layout from "../Components/Layout";
import axios from "axios";
import Router from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function BuyNft() {
  const flowSubscriptionAddress=process.env.NEXT_PUBLIC_FLOW_SUBSCRIPTION_ADDRESS;
    const [isLoadingTx, setLoadingTx] = useState(false);
    const [error, setError] = useState(null);
    const [isMinted, setMinted] = useState(false);
    const [isOwned, setIsOwned] = useState(false);
    const msgs = useRef(null);
    const { address} = useAccount()
    const { data: ensName } = useEnsName({ address })
    
    const mint = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            flowSubscriptionAddress,
            subscriptionAbi,
            signer
        );
    
        function clearError() {
          setError(null);
        }
    
        try {
          clearError();
          setLoadingTx(true);
          const tx = await contract.subscribe({
            value: ethers.utils.parseEther("0.00"),
          });
          setTimeout(() => {
            setLoadingTx(false);
          }, 2000);
        
          tx.wait().then((transaction) => {
            console.log('transaction',transaction)
            if (transaction.status === 1) {
              msgs.current.show([
                {
                  sticky: true,
                  severity: "success",
                  detail: "Transaction mined and confirmed",
                  closable: true,
                },
              ]);
              setTimeout(() => {
              setLoadingTx(false);
            }, 2000);
              setMinted(true);
              Router.push('/subscriptionDashboard')
              if (!isOwned) {
                setIsOwned(true);
              }
            } else {
              setTimeout(() => {
                setLoadingTx(false);
              }, 2000);             
               setError("Transaction failed or rejected by the user");
            }
          });
        } catch (error) {
          console.log(error);
          setTimeout(() => {
            setLoadingTx(false);
          }, 2000);          
          setError("Transaction failed or rejected by the user");
        }
      };
    
      const buySubscription=async ()=>{
        const token = localStorage.getItem("authToken");
        setLoadingTx(true);
        axios
          .post(
            `${BASE_URL_LAUNCH}api/v1.0/subscription`, { name:"John",
            owner:"asd3rfsdaf2334r23",
            plan:"basic",
            cost:99,
            currency:"USD",
            createdBy:"Admin",
            updatedBy:"Admin"},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                
              },
             
            },
           
          )
         
          .then(async (response) => {
            setTimeout(() => {
              setLoadingTx(false);
            }, 2000);
            msgs.current.show([

              {
                sticky: true,
                severity: "success",
                detail: "Basic Plan Subscription Created Succesfully ",
                closable: true,
              },
            ]);
          })
          setTimeout(() => {
            setLoadingTx(false);
          }, 2000);
       Router.push('/subscriptionDashboard')
          .catch((error) => {
            console.log("err", error);
          });
      }
  return (
    <Layout title="Launchpad" description="Used to Subscribe the NFTs">
    <div className="buy-back-image" style={{marginTop:'65px'}}>
      <div className="font-bold text-3xl p-5">Buy Subscription</div>
      <hr></hr>
      <Messages  ref={msgs} />
      <div className="flex mt-5 justify-content-center gap-5 ">
        <div className="mt-5">
          <img style={{height:'200px'}} src="./showroom.png"></img>
        </div>
        <div className="p-5 subscribe-modal">
          <div className="font-bold text-3xl">Basic</div>
          <div className="font-bold">$0/Month</div>

         
          <hr></hr>
          <div>
               
            <ul>
              <li>2% platform Fee Total Sales</li>
              <li>Unlimited Deployments</li>
              <li> 5+ contracts Support</li>
              <li>customizable Frontend </li>
              <li>Metaverse Support</li>
              <li>Community Support</li>
            </ul>
          </div>
          <div className="mt-5">
            <Button  onClick={buySubscription} isLoadingTx={isLoadingTx} style={{background:'white',color:'black'}} severity="info" label="Buy Basic Subscription"></Button>
          </div>
        </div>
        <div className="p-5 subscribe-modal">
          <div className="font-bold text-3xl">Pro</div>
          <div className="font-bold">$99/Month</div>
          <hr></hr>
          <div>
               
            <ul>
              <li>0% platform Fee</li>
              <li>Unlimited Deployments</li>
              <li>Custom Contracts Support</li>
              <li>Customizable Frontend </li>
              <li>Metaverse Support</li>
              <li> Priority Support</li>
            </ul>
          </div>
          <div className="mt-5">
            <Button onClick={mint} isLoadingTx={isLoadingTx} severity="info" style={{background:'white',color:'black'}} label="Buy Pro Subscription"></Button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
