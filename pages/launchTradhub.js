import React, { useRef, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { Messages } from "primereact/messages";
import LaunchContarctSidebar from "./launchContarctSidebar";
import { Button } from "primereact/button";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function LaunchTradhub() {
  const msgs = useRef(null);
  const [loading, setLoading] = useState(false);
  const tradHubContarctData = () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
        { contractName: "TradeHub",constructorParams: {
          param1: 30,
          param2: "NFT BAZAAR",
          param3: "0xEFf4209584cc2cE0409a5FA06175002537b055DC",
        }, network: "hardhat" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        setTimeout(() => {
            setLoading(false);
          }, 2000);
        msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail: "Your Tradhub contract has been  successfully deployed",
            closable: true,
          },
        ]);
      })

      .catch((error) => {
        console.log("err", error);
      });
  };
  return (
    <Layout>
      <div style={{ height: "340px", marginTop: "130px" }}>
        <Messages ref={msgs} />

        <div className="flex justify-content-center">
          <div>
            <LaunchContarctSidebar />
          </div>

          <div className="bg-blue-100 p-5" style={{ height: "360px" }}>
            <div className="text-center">
              <img
                src="garden.png"
                style={{ width: "200px", height: "185px" }}
                alt="garden"
              ></img>
            </div>
            <div>
              <div className="flex mt-5 gap-5 p-5">
                <div>
                  <div className="font-bold text-2xl">
                    Launch TradeHub
                  </div>
                  <div>Deploy your own ERC-721 contract &</div>
                  <div>launch TradeHub of assets</div>
                </div>
                <div>
                  <Button
                    label="Launch TradeHub"
                    severity="Primary"
                    rounded
                    style={{ width: "200px" }}
                    loading={loading}
                    onClick={tradHubContarctData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
