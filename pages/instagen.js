import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "next/router";
import Layout from "../Components/Layout";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_LAUNCH;

const Instagen = (props) => {
  const [marketplaceContarctA, setMarketplaceContarctA] = useState("");
  const [flowcontarctAddress, setFlowcontractAddress] = useState("");
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const instagenData = async () => {
    const token = localStorage.getItem("authToken");
    localStorage.getItem("");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let tokenData;
    try {
      tokenData = await axios.post(
        `${BASE_URL_LAUNCH}/InstaGen`,
        config,
        { contractName: "InstaGen" }
      );
      setsupabaseToken(tokenData);
      console.log("InstaGen  contarct data", tokenData);
    } catch (e) {
      console.log(e);
    }
  }
    const handleInputName = (e) => {
      setContractName(e.target.value);
    };
    const handleInputSymbol = (e) => {
      setcontractSymbol(e.target.value);
    };

    useEffect(() => {
      setFlowcontractAddress(props.router.query.contractAddress);
    }, [props.router.query.contractAddress]);

    useEffect(() => {
      setMarketplaceContarctA(props.router.query.contractAddress);
    }, [props.router.query.contractAddress]);

    return (
      <Layout
        title="Deploy InstaGen"
        description="This is use to show information of the deploy InstaGen contract"
      >
        <div>
          <div className="card p-5 font-bold text-center">
            Deploy InstaGen
          </div>
          <div className="flex justify-content-center gap-5">
            <div className="card" style={{ width: "50%" }}>
              <div className="text-center mt-5">
                <div className="text-left">Enter InstaGen name</div>
                <div className="mt-3">
                  <InputText
                    value={contractName}
                    onChange={handleInputName}
                    className="p-2 w-full"
                    type="text"
                  />
                </div>
                <div className="mt-3 text-left">
                  Enter InstaGen Symbol
                </div>
                <div className="mt-2">
                  <InputText
                    value={contractSymbol}
                    onChange={handleInputSymbol}
                    className="p-2 w-full"
                    type="text"
                  />
                </div>
                <div className="mt-3 text-left">Marketplace address</div>
                <div className="mt-2">
                  <InputText
                    value={marketplaceContarctA}
                    className="p-2 w-full"
                    type="text"
                  />
                </div>
                <div className="mt-3 text-left">Flowcontract Address</div>
                <div className="mt-2">
                  <InputText
                    value={flowcontarctAddress}
                    className="p-2 w-full"
                    type="text"
                    disabled
                  />
                </div>
              </div>
              <div className="text-center mt-5">
                <Button
                  onClick={instagenData}
                  label="Deploy InstaGen"
                  severity="Primary"
                  icon="pi pi-external-link"
                  rounded
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

export default withRouter(Instagen);
