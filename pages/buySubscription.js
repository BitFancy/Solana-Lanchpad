import { ethers } from "ethers";
import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import subscriptionAbi from "../artifacts/contracts/subscription/abi.json";
import { Toast } from "primereact/toast";

import { useContract, useSigner } from "wagmi";
import Layout from "../Components/Layout";
import axios from "axios";
import Link from "next/link";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function BuyNft() {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [basicResponse, setbasitResponse] = useState();
  const [proResponse, setproResponse] = useState();
  const { data: signerData } = useSigner();
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
  const showErrorBasic = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While Basic plan",
      life: 10000,
    });
  };
  const showErrorpro = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While Pro Plan",
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
      });
    } catch (error) {
      showErrorpro();
    } finally {
      setLoading1(false);
    }
  };

  const buySubscription = async () => {
    const token = localStorage.getItem("platform_token");
    setLoading(true);
    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/storefront`,
        {
          name: "John",
          owner: "asd3rfsdaf2334r23",
          currency: "USD",
          createdBy: "Admin",
          updatedBy: "Admin",
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
      })
      .catch(() => {
        showErrorBasic();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const load2 = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  const load3 = () => {
    setLoading3(true);

    setTimeout(() => {
      setLoading3(false);
    }, 2000);
  };
  return (
    <Layout title="Launchpad" description="Used to Subscribe the NFTs">
      <div className="buy-back-image">
        <div className="font-bold text-3xl p-5 text-center">
          Buy Subscription
        </div>
        <hr></hr>
        <Toast ref={toast} />
        <div className="flex mt-5 justify-content-center gap-5 ">
          <div className="mt-5 card buy-img">
            <img style={{ height: "200px" }} src="./showroom.png"></img>
          </div>
          <div
            className="p-5 subscribe-modal card"
            style={{ marginBottom: "0px" }}
          >
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
              <Button
                className="buy-img"
                loading={loading}
                onClick={buySubscription}
                style={{ background: "white", color: "black" }}
                severity="info"
                label="Buy Basic Plan"
              ></Button>
            </div>
          </div>
          <div className="p-5 subscribe-modal card">
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
              <Button
                onClick={mint}
                loading={loading1}
                severity="info"
                style={{ background: "white", color: "black" }}
                label="Buy Pro Plan"
              ></Button>
            </div>
          </div>

          {proResponse && (
            <div>
              <Link href="/subscriptionDashboard">
                <Button
                  className="buy-img"
                  onClick={load2}
                  loading={loading2}
                  severity="info"
                  style={{ background: "white", color: "black" }}
                  label="Continue"
                ></Button>
              </Link>
            </div>
          )}

          {basicResponse && (
            <div>
              <Link href="/subscriptionDashboard">
                <Button
                  className="buy-img"
                  onClick={load3}
                  loading={loading3}
                  severity="info"
                  style={{ background: "white", color: "black" }}
                  label="Continue"
                ></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
