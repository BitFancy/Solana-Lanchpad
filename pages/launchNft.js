import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function LuanchNFTs() {
  const [active, setActive] = useState("");
  const [contractsData, setContractsData] = useState([]);
  const [activeMenu, setActiveMenu] = useState("");

  const handleClick = (event) => {
    setActive(event.target.id);
    setActiveMenu(activeContract);


  };
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
        <div className=" overflow-y-auto ... overflow-dashboard-left" style={{padding:'55px'}}>
        <div className="font-bold">overview</div>
              <div className="ml-3 mt-3">
                <div
                  key={1}
                  className={active === "1" ? "active" : undefined}
                  id={"1"}
                  onClick={handleClick}
                >
                  Analytics
                </div>
                <div
                  key={1}
                  className={active === "2" ? "active" : undefined}
                  id={"2"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Subscription
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
                  style={{ marginTop: "20px" }}
                >
                  Roles
                </div>
                <div
                  key={9}
                  className={active === "9" ? "active" : undefined}
                  id={"9"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  TradeHub
                </div>
                <div
                  key={10}
                  className={active === "10" ? "active" : undefined}
                  id={"10"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Gateway
                </div>
                <div
                  key={11}
                  className={active === "11" ? "active" : undefined}
                  id={"11"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Frontend
                </div>
                <div
                  key={12}
                  className={active === "12" ? "active" : undefined}
                  id={"12"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Metaverse
                </div>
                </div>
        </div>
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
                  Contarct Name :{" "}
                  <span style={{ color: "blue" }}>
                    {activeMenu.contractName}
                  </span>
                </div>
                <div>
                  Contarct Address:{" "}
                  <span style={{ color: "blue" }}>
                    {activeMenu.contractAddress}
                  </span>
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
