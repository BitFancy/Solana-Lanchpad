import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function Dashboard() {
  const [active, setActive] = useState("");
  const [getTradhub, setGetTradhub] = useState();
  const [getfusionSeries, setGetFusionSeries] = useState();
  const [getSignatureSeries, setGetSignatureSeries] = useState();
  const [getdynamicRealmes, setGetdynamicRealmes] = useState();
  const [getEternumpass, setGetEternumpass] = useState();
  const [getinstagen, setGetInstagen] = useState();
  const [getSubscription, setGetSubscription] = useState();


  const handleClick = (event) => {
    setActive(event.target.id);
    gettradhubContractData();

  };
  const gettradhubContractData = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
         
        },
       
      )
      .then(async (response) => {
        console.log("response FusionSeries data", response);
        setGetTradhub(response.data.contractName)
        msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail: "Your FusionSeries contract has been  successfully deployed",
            closable: true,
          },
        ]);
      })
  
      .catch((error) => {
        console.log("err", error);
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
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="60" fill="#D9D9D9"/>
       </svg>
        </div>
        <div className="ml-3">
        <div className="text-white text-2xl font-bold">My First Marketplace</div>
        <div className="text-white">Id:{12}</div>
        <div className="text-white">Plane:{}</div>
        </div>
       
        </div>
      </div>
      <hr></hr>
      <div className="flex justify-content-between mt-10">
      <div className="overflow-y-auto ... overflow-dashboard-left" style={{padding:'55px'}}>
              <div className="font-bold">overview</div>
              <div className="ml-3 mt-3">
                <div 
                  key={1}
                  className={active === "1" ? "active" : undefined}
                  id={"1"}
                  onClick={handleClick}
                  style={{cursor:'pointer'}}
                >
                  Analytics
                </div>
                <div
                  key={1}
                  className={active === "2" ? "active" : undefined}
                  id={"2"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" ,cursor:'pointer'}}
                >
                  Subscription
                </div>
              </div>

              <div className="font-bold mt-5">Contracts</div>
              <div className="ml-3">
                <div
                  key={3}
                  className={active === "3" ? "active" : undefined}
                  id={"3"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}

                >
                  SignatureSeries
                </div>
                <div
                  key={9}
                  className={active === "9" ? "active" : undefined}
                  id={"9"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}
                >
                  TradeHub
                </div>
                <div
                  key={4}
                  className={active === "4" ? "active" : undefined}
                  id={"4"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}
                >
                  FusionSeries
                </div>
                <div
                  key={5}
                  className={active === "5" ? "active" : undefined}
                  id={"5"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}
                >
                  DynamicRealms
                </div>
                <div
                  key={6}
                  className={active === "6" ? "active" : undefined}
                  id={"6"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}
                >
                  EternumPass
                </div>
                <div
                  key={7}
                  className={active === "7" ? "active" : undefined}
                  id={"7"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}
                >
                  Instagen
                </div>
              </div>
              <div className="border-bottom-das"></div>
              <div className="font-bold mt-5">Settings</div>
              <div className="ml-3">
                <div
                  key={8}
                  className={active === "8" ? "active" : undefined}
                  id={"8"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}
                >
                  Roles
                </div>
                
                <div
                  key={10}
                  className={active === "10" ? "active" : undefined}
                  id={"10"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}
                >
                  Gateway
                </div>
                <div
                  key={11}
                  className={active === "11" ? "active" : undefined}
                  id={"11"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}
                >
                  Frontend
                </div>
                <div
                  key={12}
                  className={active === "12" ? "active" : undefined}
                  id={"12"}
                  onClick={handleClick}
                  style={{ marginTop: "20px",cursor:'pointer' }}
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
                <Link href='/launchManage'>
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
              <div>{getTradhub}</div>
            </div>
            <div className="card" style={{ flex: "1" }}>
              <div className="text-center">
                <img className="dash-img-size" src="garden.png"></img>
              </div>
              <div>{getTradhub}</div>{" "}
            </div>
          </div>
          <div className="mt-5">
            <div className="flex gap-5">
              <div className="card" style={{ flex: "1", marginBottom: "0px" }}>
                <div className="text-center">
                  <img className="dash-img-size" src="garden.png"></img>
                </div>
                <div>{getTradhub}</div>{" "}
              </div>
              <div className="card" style={{ flex: "1" }}>
                <div className="text-center">
                  <img className="dash-img-size" src="garden.png"></img>
                </div>
                <div>{getTradhub}</div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
