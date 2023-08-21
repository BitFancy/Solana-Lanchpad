import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";
import axios from "axios";
import { Messages } from "primereact/messages";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function Dashboard() {
  const msgs = useRef(null);
  const [active, setActive] = useState("");
  const [contractsData, setContractsData] = useState([]);
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubccriptionMenu, setActiveSubscription] = useState("");
  const [subscriptionData, setSubscriptionData] = useState([]);

  useEffect(() => {
    getAllContarctData();
    upadteSubscriptionData();
  }, []);
  const upadteSubscriptionData = () => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .put(
        `${BASE_URL_LAUNCH}api/v1.0/subscription`,
        {
          id: "025548f3-806e-4620-9d8d-c869d53bfd16",
          status: "active",
          validity: "2021-09-29",
          updatedBy: "Admin",
        },
        {
          headers,
        }
      )
      .then(async (response) => {
        msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail: "Subscription data fetch successfully",
            closable: true,
          },
        ]);
      })

      .catch(() => {
      });
  };
  const handleClick = (activeContract) => {
    setActive(event.target.id);
    setActiveMenu(activeContract);
    setActiveSubscription(activeContract);
  };
 
  const getAllContarctData = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response?.data?.length > 0) {
          setContractsData(response.data);
        }
      })
      .catch((error) => {
      });
  };
  return (
    <Layout
      title="Launchpad Dashboard"
      description="This is use to show launchpad Information"
    >
      <div>
        <div className="text-center mt-10 border-b-2 border-indigo-500 ... dashboardl-top-back">
          <div className="flex ml-5">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 120 120"
                fill="none"
              >
                <circle cx="60" cy="60" r="60" fill="#D9D9D9" />
              </svg>
            </div>
            <Messages ref={msgs} />

            <div className="ml-3">
              <div className="text-white text-2xl font-bold">
                My First Marketplace
              </div>
              <div className="text-white">Id:{12}</div>
              <div className="text-white">Plane:{}</div>
            </div>
          </div>
        </div>
        <hr></hr>

        <div className="flex justify-content-between mt-10">
          <div
            className="overflow-y-auto ... overflow-dashboard-left"
            style={{ padding: "55px" }}
          >
            <div className="font-bold">overview</div>
            <div className="ml-3 mt-3">
              <div
                key={1}
                className={active === "1" ? "active" : undefined}
                id={"1"}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              >
                Analytics
              </div>

              <div className="ml-3">
                {subscriptionData.map((subscription) => {
                  return (
                    <div
                      key={subscription.id}
                      className={
                        activeSubccriptionMenu.id === subscription.id
                          ? "active"
                          : undefined
                      }
                      id={"7"}
                      onClick={() => handleClick(subscription)}
                      style={{ marginTop: "20px", cursor: "pointer" }}
                    >
                      Subscription
                    </div>
                  );
                })}
              </div>

             
            </div>

            <div className="font-bold mt-5">Contracts</div>
            <div className="ml-3">
              {contractsData.map((contract) => {
                return (
                  <div
                    key={contract.contractName}
                    className={
                      activeMenu.contractName === contract.contractName
                        ? "active"
                        : undefined
                    }
                    id={"3"}
                    onClick={() => handleClick(contract)}
                    style={{ marginTop: "20px", cursor: "pointer" }}
                  >
                    {contract.contractName}
                  </div>
                );
              })}
            </div>
            <div className="border-bottom-das"></div>
            <div className="font-bold mt-5">Settings</div>
            <div className="ml-3">
              <div
                key={8}
                className={active === "8" ? "active" : undefined}
                id={"8"}
                onClick={handleClick}
                style={{ marginTop: "20px", cursor: "pointer" }}
              >
                AccessMaster
              </div>
              <div
                key={11}
                className={active === "11" ? "active" : undefined}
                id={"11"}
                onClick={handleClick}
                style={{ marginTop: "20px", cursor: "pointer" }}
              >
                Web App
              </div>
              <div
                key={12}
                className={active === "12" ? "active" : undefined}
                id={"12"}
                onClick={handleClick}
                style={{ marginTop: "20px", cursor: "pointer" }}
              >
                Metaverse
              </div>
            </div>
          </div>
          <div className="w-full right-collection-box">
            <div>
              <div className="flex justify-content-between">
                <div className="font-bold">No. of items </div>
                <div>
                  <Link href="/launchManage">
                    <Button label="Manage" severity="Primary" rounded />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex gap-5 mt-5">
              <div className="card" style={{ flex: "1", marginBottom: "0px" }}>
                <div className="text-center">
                  <img className="dash-img-size" src="garden.png"></img>
                </div>
                <div>
                  Contract Name :{" "}
                  <span style={{ color: "blue" }}>
                    {activeMenu.contractName}
                  </span>
                </div>
                <div>
                  Contract Address:{" "}
                  <span style={{ color: "blue" }}>
                    {activeMenu.contractAddress}
                  </span>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
