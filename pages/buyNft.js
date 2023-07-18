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
            value: ethers.utils.parseEther("0.01"),
          });
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
              setLoadingTx(false);
              setMinted(true);
              if (!isOwned) {
                setIsOwned(true);
              }
            } else {
              console.log("Transaction failed or rejected by the user");
              setLoadingTx(false);
              setError("Transaction failed or rejected by the user");
            }
          });
        } catch (error) {
          console.log(error);
          setLoadingTx(false);
          setError("Transaction failed or rejected by the user");
        }
      };
    
      const buySubscription=async ()=>{
        const token = localStorage.getItem("authToken");
        axios
          .post(
            `${BASE_URL_LAUNCH}api/v1.0/subscription/`, { name:"John",
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
            console.log("response of the basic plan subscription data", response);
            // setpostsubscription(response.data.contractAddress)
            msgs.current.show([
              {
                sticky: true,
                severity: "success",
                detail: "Subscription succesfully created",
                closable: true,
              },
            ]);
          })
      
          .catch((error) => {
            console.log("err", error);
          });
      }
  return (
    <Layout title="Launchpad" description="Used to Subscribe the NFTs">
    <div className="buy-back-image" style={{marginTop:'100px'}}>
      <div className="font-bold text-3xl p-5">Buy NFT</div>
      <hr></hr>
      <Messages  ref={msgs} />
      <div className="flex mt-5 justify-content-center gap-5 ">
        <div className="mt-5">
          <img style={{height:'200px'}} src="./showroom.png"></img>
        </div>
        <div className="p-5 subscribe-modal">
          <div className="font-bold text-3xl">Basic</div>
         
          <hr></hr>
          <div>
               
            <ul>
              <li>2% platform fee total sales</li>
              <li>unlimited deployments</li>
              <li> 5+ contracts support</li>
              <li>customizable frontend </li>
              <li>metaverse support</li>
              <li>priority support</li>
              <li>community support</li>
            </ul>
          </div>
          <div>
            <Button  onClick={buySubscription} severity="info" label="Buy Subscription"></Button>
          </div>
        </div>
        <div className="p-5 subscribe-modal">
          <div className="font-bold">Pro</div>
          <div className="font-bold">$99/month</div>
          <hr></hr>
          <div>
               
            <ul>
              <li>0% platform fee</li>
              <li>unlimited deployments</li>
              <li>5+ contracts support</li>
              <li>customizable frontend </li>
              <li>metaverse support</li>
              <li> Priority support</li>
              <li>community support</li>
            </ul>
          </div>
          <div>
            <Button onClick={mint} severity="info" label="Buy Subscription"></Button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
