import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Sidemenu from "./sidemenu";
import { Button } from "primereact/button";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function GetAllSubscription() {
  const [subscriptionData, setSubscriptionData] = useState([]);
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
  return (
    <Layout>
      <div style={{ marginTop: "100px" }}>
        <div className="font-bold text-3xl text-black text-center">
          Subscription Details
        </div>

        <div className="flex">
          <div>
            <Sidemenu />
          </div>

          <div className=" mt-5 align-items-center subscription-back-part p-5 ">
            {subscriptionData.map((subscription) => {
              return (
                <div   key={1} className="flex justify-content-between gap-5 mt-5">
                  <div className="flex gap-5">
                    <div>
                      <img
                        className="dash-img-size"
                        style={{ width: "100px", height: "100px" }}
                        src="garden.png"
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
                    <Button label="Setup"></Button>
                  </div>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
