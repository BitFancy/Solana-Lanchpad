import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "next/router";
import Layout from "../Components/Layout";
import { Messages } from "primereact/messages";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

const Instagen = (props) => {
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [saleprePrice, setSalePrePrice] = useState("");
  const [countdownTime, setcontDownTime] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [royltybps, setRoyltybps] = useState("");
  const [baseURI, setBaseURI] = useState("");

  const [supabaseToken, setsupabaseToken] = useState();
  const msgs = useRef(null);
  const instaGenContarctData = () => {
    const token = localStorage.getItem("authToken");
    const data = {
      contractName: "InstaGen",
      constructorParams: {
        param1: "NFT MELA",
        param2: "NM",
        param3: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
        param4: "0xEFf4209584cc2cE0409a5FA06175002537b055DC",
        param5: "1000000000000000000",
        param6: "100000000000000000",
        param7: 0,
        param8: 2000,
        param9: 300,
        param10: "www.abc.com",
      },
    };
    axios
      .post(
        `${BASE_URL_LAUNCH}/api/v1.0/launchpad/InstaGen`,
        { data, network: "hardhat" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        console.log("response InstaGen data", response);
        setsupabaseToken(response.data.contractAddress);
        msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail: "Your InstaGen contract has been  successfully deployed",
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
  const handleInputSalePrice = (e) => {
    setSalePrice(e.target.value);
  };

  const handleInputSalePrePrice = (e) => {
    setSalePrePrice(e.target.value);
  };
  const handleInputCountDownTime = (e) => {
    setcontDownTime(e.target.value);
  };
  const handleInputMaxSupply = (e) => {
    setMaxSupply(e.target.value);
  };

  const handleInputRoyelty = (e) => {
    setRoyltybps(e.target.value);
  };
  const handleInputBaseURI = (e) => {
    setBaseURI(e.target.value);
  };
  return (
    <Layout
      title="Deploy InstaGen"
      description="This is use to show information of the deploy InstaGen contract"
    >
      <div style={{ marginTop: "85px" }}>
        <div className="p-5 font-bold text-align-center">Deploy InstaGen</div>

        <div className="flex justify-content-center gap-5">
          <div className="card" style={{ width: "50%" }}>
            <div className="text-center mt-5">
              <div className="text-left">Enter InstaGen name</div>
              <div className="mt-3">
                <InputText
                  value={contractName}
                  onChange={handleInputName}
                  className="p-2 w-full input-back"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">Enter InstaGen Symbol</div>
              <div className="mt-2">
                <InputText
                  value={contractSymbol}
                  onChange={handleInputSymbol}
                  className="p-2 w-full input-back"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">Enter SalePrice</div>
              <div className="mt-2">
                <InputText
                  value={salePrice}
                  onChange={handleInputSalePrice}
                  type="number"
                  className="p-2 w-full input-back"
                />
              </div>
              <div className="mt-3 text-left">Enter pre SalePrice</div>
              <div className="mt-2">
                <InputText
                  value={saleprePrice}
                  onChange={handleInputSalePrePrice}
                  className="p-2 w-full input-back"
                  type="number"
                />
              </div>
              <div className="mt-3 text-left">Enter Countdown Time</div>
              <div className="mt-2">
                <InputText
                  value={countdownTime}
                  onChange={handleInputCountDownTime}
                  className="p-2 w-full input-back"
                  type="number"
                />
              </div>
              <div className="mt-3 text-left">Enter Max. Supply</div>
              <div className="mt-2">
                <InputText
                  value={maxSupply}
                  onChange={handleInputMaxSupply}
                  className="p-2 w-full input-back"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">Enter Royalty BPS</div>
              <div className="mt-2">
                <InputText
                  value={royltybps}
                  onChange={handleInputRoyelty}
                  className="p-2 w-full input-back"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">Enter BaseUri</div>
              <div className="mt-2">
                <InputText
                  value={baseURI}
                  onChange={handleInputBaseURI}
                  className="p-2 w-full input-back"
                  type="text"
                />
              </div>
            </div>
            <div className="text-center mt-5">
              <Button
                onClick={instaGenContarctData}
                label="Deploy InstaGen"
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

export default withRouter(Instagen);
