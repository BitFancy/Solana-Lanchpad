import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import { Messages } from "primereact/messages";
import { withRouter } from "next/router";
import Router from "next/router";
import Layout from "../Components/Layout";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

const Step1 = () => {
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);

    setTimeout(() => {
        setLoading(false);
    }, 2000);
};
  const msgs = useRef(null);
  const [_platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [supabaseToken, setsupabaseToken] = useState();
  const tradHubContarctData = () => {
    const token = localStorage.getItem("authToken");
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
        load();
        console.log("response data", response);
        setsupabaseToken(response.data.contractAddress);
        msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail: "Your Tradhub contract has been  successfully deployed",
            closable: true,
          },
        ]);
        Router.push({
          pathname: "./fusionSeries",
          query: { contractAddress: response.data.contractAddress },
        });
        Router.push({
          pathname: "./signatureseries",
          query: { contractAddress: response.data.contractAddress },
        });
      })

      .catch((error) => {
        console.log("err", error);
      });
  };
  const handleInputFee = (e) => {
    if (e.target.value <= 100) {
      setPlatformfee(e.target.value);
    }
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };
  return (
    <Layout title="Step 1" description="Step one of the launchpad">
      <div style={{ marginTop: "100px" }}>
        <div
          className="font-bold p-3 mb-5"
          style={{ borderBottom: "2px solid" }}
        >
          Step 1 : Setup TradeHub
        </div>
        <div className="card">
          <div className="flex justify-content-between gap-5">
            <div style={{ width: "50%" }}>
              <div>Enter TradeHub Name</div>

              <InputText
                type="text"
                name="contractName"
                value={contractName}
                onChange={handleInputName}
                id="contractName"
                className="p-2 w-full mt-3 input-back"
                placeholder="Enter TradeHub Name"
              />
            </div>
            <div style={{ width: "50%" }}>
              <div>Enter TradeHub Fee</div>
              <InputText
                type="number"
                name="_platformFee"
                value={_platformFee}
                onChange={handleInputFee}
                className="p-2 w-full mt-3 input-back "
                placeholder="Enter TradeHub fee"
              />
            </div>
          </div>

          <div className="text-center">
            <Button
              label="deploy Tradhub Contract"
              onClick={tradHubContarctData}
              severity="Primary"
              className=" mt-7"
              style={{ width: "30%" }}
              rounded
              loading={loading} 
            />
          </div>
          <Messages ref={msgs} />
        </div>
      </div>
    </Layout>
  );
};
export default withRouter(Step1);
