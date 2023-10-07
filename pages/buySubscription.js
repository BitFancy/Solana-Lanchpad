import { ethers } from "ethers";
import { Button } from "primereact/button";
import React, { useContext, useRef, useState } from "react";
import subscriptionAbi from "../artifacts/contracts/abi.json";
import { Toast } from "primereact/toast";
import { useContract, useSigner } from "wagmi";
import axios from "axios";
import Layout2 from "../Components/Layout2";
import { LayoutContext } from "../layout/context/layoutcontext";
import { useRouter } from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function BuyNft() {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const [basicResponse, setbasitResponse] = useState();
  const [proResponse, setproResponse] = useState();
  const { data: signerData } = useSigner();
  const router = useRouter();
  const flowSubscriptionAddress =
    process.env.NEXT_PUBLIC_FLOW_SUBSCRIPTION_ADDRESS;
  const toast = useRef(null);
  const showSuccessPro = () => {
    toast.current.show({
      severity: "success",
      summary: "Success ",
      detail: "Your Pro plan has been minted/Transaction mined and confirmed",
      life: 10000,
    });
  };
  const showSuccessBasic = () => {
    toast.current.show({
      severity: "success",
      summary: "Success ",
      detail: "Your Basic plan subscription has been successfully created",
      life: 10000,
    });
  };

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

      tx.wait().then(async (transaction) => {
        setproResponse(transaction);
        showSuccessPro();
        setTimeout(() => {
          setLoading1(false);
        }, 2000);
        router.push("/dashboard");

      });
    } catch (error) {
      console.log(error)
    } finally {
      setLoading1(false);
    }
  };

  const buySubscription = async () => {
    const token = localStorage.getItem("platform_token");
    setLoading(true);
    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/profile/subscribe`,
        {
          plan: "basic"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        setbasitResponse(response);
        showSuccessBasic();
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        router.push("/dashboard");
      })
     

      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      });
  };

 
  return (
    <Layout2 title="Buy Subscription" description="Used to Subscribe the NFTs">
      <div >
        <div className="font-bold text-4xl p-5 text-black">
          Buy Subscription
        </div>
        <hr></hr>
        <Toast ref={toast} />
        <div className="flex  justify-content-center gap-5 " style={{marginTop:'100px'}}>
          <div style={{marginTop:'100px'}}>
            <img style={{ width: "465px",height:'375px' }} src="./garden.png"></img>
          </div>
          <div
             
             className="subscribe-modal p-5 subscribe-modal2"
            style={{ marginBottom: "0px",boxShadow: "0px 50px 60px 0px rgba(83, 71, 231, 0.50)",
          }}
          >
            <div className="font-bold text-6xl text-center mt-5">Basic</div>
            <div className=" mb-5 text-center text-2xl">$0/Month</div>

            <div className="mt-5  plan-des" style={{marginLeft:'70px',borderTop:'1px solid #aba2a2'}}>
              <ul>
                <li>2% platform Fee </li>
                <li>Only 2 deployments</li>
                <li> 5+ contracts Support</li>
                <li>customizable Frontend </li>
                <li>Metaverse Support</li>
                <li>Community Support</li>
              </ul>
            </div>
            <div className=" text-center" style={{marginTop:'75px',}}>
              <Button
                loading={loading}
                onClick={buySubscription}
                label="BUY BASIC PLAN"
                className="buy-back-color"
                rounded
                
              ></Button>
            </div>
          </div>
          <div className="p-5 subscribe-modal subscribe-modal2" style={{ boxShadow: "0px 50px 60px 0px rgba(83, 71, 231, 0.50)",
}}>
            <div className="font-bold text-6xl text-center mt-5">Pro</div>
            <div className="text-2xl mb-5 text-center">$99/Month</div>
            <div className="mt-5  plan-des " style={{marginLeft:'70px',borderTop:'1px solid #aba2a2'}}>
              <ul>
                <li>0% platform Fee</li>
                <li>Unlimited Deployments</li>
                <li>Custom Contracts Support</li>
                <li>Customizable Frontend </li>
                <li>Metaverse Support</li>
                <li> Priority Support</li>
                <li>Premium account accessibility</li>
              </ul>
            </div>
            <div className="mt-5 text-center ">
              <Button
                onClick={mint}
                loading={loading1}
                label="BUY PRO PLAN"
                className="buy-back-color"
                rounded
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
}
