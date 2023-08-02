import { ethers } from "ethers";
import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import subscriptionAbi from '../artifacts/contracts/subscription/abi.json';
import { Messages } from "primereact/messages";
import {
    useAccount, useContract, useEnsName, useSigner,
  } from 'wagmi'
import Layout from "../Components/Layout";
import axios from "axios";
import Router from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function BuyNft() {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);


  const { data: signerData } = useSigner();
  const flowSubscriptionAddress=process.env.NEXT_PUBLIC_FLOW_SUBSCRIPTION_ADDRESS;
    const [error, setError] = useState(null);
    const msgs = useRef(null);
    const { address} = useAccount()
    const { data: ensName } = useEnsName({ address })
    const flowSubscriptionContarct = useContract({
      addressOrName: flowSubscriptionAddress,
      contractInterface: subscriptionAbi.abi,
      signerOrProvider: signerData,
    });
    const mint = async () => {
        try {
          setLoading1(true);
          const tx = await flowSubscriptionContarct.subscribe({
            value: ethers.utils.parseEther("0.00"),
          });
         
          tx.wait().then((transaction) => {
            setTimeout(() => {
              setLoading1(false);
          }, 2000);
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
            }, 2000);
              Router.push('/subscriptionDashboard')
             
            } else {
              setTimeout(() => {
              }, 2000);             
               setError("Transaction failed or rejected by the user");
            }
          });
        } catch (error) {
          console.log(error);
          setTimeout(() => {
          }, 2000);          
          setError("Transaction failed or rejected by the user");
        }
      };
    
      const buySubscription=async ()=>{
        const token = localStorage.getItem("authToken");
        setLoading(true);
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
              setLoading(false);
          }, 2000);
          console.log("buy basic plan details", response);

            msgs.current.show([
              {
                sticky: true,
                severity: "success",
                detail: "Your Basic plan subscription has been successfully created",
                closable: true,
              },
            ]);
            Router.push('/addSubscription')
          })
         
          .catch((error) => {
            console.log("err", error);
          });
      }
  return (
    <Layout title="Launchpad" description="Used to Subscribe the NFTs">
    <div className="buy-back-image" style={{marginTop:'65px'}}>
      <div className="font-bold text-3xl p-5 text-center">Buy Subscription</div>
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
            <Button loading={loading} onClick={buySubscription} style={{background:'white',color:'black'}}  severity="info" label="Buy Basic Subscription"></Button>
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
            <Button onClick={mint} loading={loading1}  severity="info" style={{background:'white',color:'black'}} label="Buy Pro Subscription"></Button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
