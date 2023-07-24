import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";
import axios from "axios";
import Sidemenu from "./sidemenu";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function LuanchNFTs() {
  useEffect(() => {
    getAllContarctData();
  }, []);
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
        console.log("Error in Fetching contracts..!", error);
      });
  };

  return (
    <Layout
      title="Launchpad NFTs"
      description="Used to show launchpad NFTs"
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
        <Sidemenu/>
        <div className="w-full right-collection-box">
        <div>
            <div className="flex justify-content-between">
              <div className="font-bold">Title of the sidebar</div>
              <div>
                <Link href='/assets'>
                <Button label="create NFTs" severity="Primary" rounded />
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
                  {/* <span style={{ color: "blue" }}>
                    {activeMenu.contractName}
                  </span> */}
                </div>
                <div>
                  Contract Address:{" "}
                  {/* <span style={{ color: "blue" }}>
                    {activeMenu.contractAddress}
                  </span> */}
                </div>
              </div>
            
            </div>
          <div className="flex gap-5 mt-5">
            <div className="card" style={{ flex: "1", marginBottom: "0px" }}>
              <div className="text-center">
                <img className="dash-img-size" src="garden.png"></img>
              </div>
              <div>Asset Description</div>
              <div>price</div>
              <div>Last sale:</div>
            </div>
            <div className="card" style={{ flex: "1" }}>
              <div className="text-center">
                <img className="dash-img-size" src="garden.png"></img>
              </div>
              <div>Asset Description</div>
              <div>price</div>
              <div>Last sale:</div>
                          </div>
          </div>
          <div className="mt-5">
            <div className="flex gap-5">
              <div className="card" style={{ flex: "1", marginBottom: "0px" }}>
                <div className="text-center">
                  <img className="dash-img-size" src="garden.png"></img>
                </div>
                <div>Asset Description</div>
              <div>price</div>
              <div>Last sale:</div>              </div>
              <div className="card" style={{ flex: "1" }}>
                <div className="text-center">
                  <img className="dash-img-size" src="garden.png"></img>
                </div>
                <div>Asset Description</div>
              <div>price</div>
              <div>Last sale:</div>
                            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </Layout>
  );
}
