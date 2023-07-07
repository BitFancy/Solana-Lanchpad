import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "next/router";
import Layout from "../Components/Layout";
import { Messages } from "primereact/messages";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

const SignatureSeries = (props) => {
  const msgs = useRef(null);

  const [tradhubContarctAddress, setTradhubContarctAddress] = useState("");
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [supabaseToken, setsupabaseToken] = useState();

  const signatureSeriesdata = () => {
    const token = localStorage.getItem("authToken");
    const data = {
      contractName: "SignatureSeries",
      constructorParams: {
        param1: "NFT_MELA",
        param2: "NFM",
        param3: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
        param4: "0xEFf4209584cc2cE0409a5FA06175002537b055DC",
      },
    };
    axios
      .post(
        `${BASE_URL_LAUNCH}/api/v1.0/launchpad/SignatureSeries`,
        { data, network: "hardhat" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        console.log("response SignatureSeries data", response);
        setsupabaseToken(response.data.contractAddress);
        msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail:
              "Your SignatureSeries contract has been  successfully deployed",
            closable: true,
          },
        ]);
      })

      .catch((error) => {
        console.log("err", error);
      });
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };
  const handleInputSymbol = (e) => {
    setcontractSymbol(e.target.value);
  };

  useEffect(() => {
    setTradhubContarctAddress(props.router.query.contractAddress);
  }, [props.router.query.contractAddress]);

  return (
    <Layout
      title="Deploy SignatureSeries"
      description="This is use to show information of the deploy signatureSeries contract"
    >
      <div>
        <div className="card p-5 font-bold text-center">
          Deploy SignatureSeries
        </div>
        <div className="flex justify-content-center gap-5">
          <div className="card" style={{ width: "50%" }}>
            <div className="text-center mt-5">
              <div className="text-left">Enter SignatureSeries name</div>
              <div className="mt-3">
                <InputText
                  value={contractName}
                  onChange={handleInputName}
                  className="p-2 w-full"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">Enter SignatureSeries Symbol</div>
              <div className="mt-2">
                <InputText
                  value={contractSymbol}
                  onChange={handleInputSymbol}
                  className="p-2 w-full"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">TradeHub address</div>
              <div className="mt-2">
                <InputText
                  value={tradhubContarctAddress}
                  className="p-2 w-full"
                  type="text"
                />
              </div>
            </div>
            <div className="text-center mt-5">
              <Button
                onClick={signatureSeriesdata}
                label="Deploy SignatureSeries"
                severity="Primary"
                icon="pi pi-external-link"
                rounded
              />
            </div>
            <Messages ref={msgs} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(SignatureSeries);
