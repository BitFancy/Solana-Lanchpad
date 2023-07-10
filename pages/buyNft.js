import { ethers } from "ethers";
import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import subscriptionAbi from '../artifacts/contracts/subscription/abi.json';
import { Messages } from "primereact/messages";
import {
    useAccount, useEnsName,
  } from 'wagmi'
import Layout from "../Components/Layout";
export default function buyNft() {
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
            address,
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
            value: ethers.utils.parseEther("0.05"),
          });
          tx.wait().then((transaction) => {
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
    
  return (
    <Layout title="Launchpad" description="Used to Subscribe the NFTs">
    <div style={{marginTop:'100px'}}>
      <div className="font-bold text-3xl p-5">Buy NFT</div>
      <hr></hr>
      <Messages  ref={msgs} />
      <div className="flex mt-5 justify-content-center gap-5 ">
        <div className="mt-5">
          <img style={{height:'200px'}} src="./showroom.png"></img>
        </div>
        <div className="p-5 subscribe-modal">
          <div>$99</div>
          <div>per month</div>
          <hr></hr>
          <div>
            <ul>
              <li>unlimited deployments</li>
              <li>5+ contracts support</li>
              <li>customizable frontend</li>
              <li>metaverse support </li>
            </ul>
          </div>
          <div>
            <Button onClick={mint} label="Buy Subscription"></Button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
