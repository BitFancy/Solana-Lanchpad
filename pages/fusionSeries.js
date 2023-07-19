import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { withRouter } from "next/router";
import Layout from "../Components/Layout";
import axios from "axios";
import { Messages } from "primereact/messages";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const FusionSeries = (props) => {
  const msgs = useRef(null);
  const [tradhubContarctAddress, setTradhubContarctAddress] = useState("");
  const [_platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [supabaseToken, setsupabaseToken] = useState();

const fusionSerisData = () => {
  const token = localStorage.getItem("authToken");
  axios
    .post(
      `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`, {contractName : "FusionSeries",
      constructorParams:{
          param1:  "www.xyz.com",
          param2 : "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
          param3 : "0xEFf4209584cc2cE0409a5FA06175002537b055DC"
      },
      network : "hardhat"},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
       
      },
     
    )
    .then(async (response) => {
      console.log("response FusionSeries data", response);
      setsupabaseToken(response.data.contractAddress)
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
    title="FusionSeries"
    description="This is use to show deployed FusionSeries information"
  >
    <div style={{ marginTop: "85px" }}>
      <div className="p-5 font-bold text-align-center"style={{ borderBottom: "2px solid" }}
>Deploy FusionSeries</div>
      <div className="flex justify-content-center gap-5">
        <div className="card mt-5" style={{ width: "50%" }}>
          <div className="text-center mt-5">
            <div className="text-left">Enter FusionSeries Name</div>
            <div className="mt-3">
              <InputText
                value={contractName}
                onChange={handleInputName}
                className="p-2 w-full input-back"
                type="text"
              />
            </div>
            <div className="mt-3 text-left">Enter FusionSeries Symbol</div>
            <div className="mt-2">
              <InputText
                value={contractSymbol}
                onChange={handleInputSymbol}
                className="p-2 w-full input-back"
                type="text"
              />
            </div>
            <div className="mt-3 text-left">TradeHub address</div>
            <div className="mt-2">
              <InputText
                value={tradhubContarctAddress}
                className="p-2 w-full input-back"
                type="text"
              />
            </div>
            <div className="mt-3 text-left">Choose Img</div>
            <div className="mt-2">
              <FileUpload
                name="demo[]"
                url={"/api/upload"}
                accept="image/*"
                maxFileSize={1000000}
                emptyTemplate={
                  <p className="m-0">Drag And Drop Files To Here To Upload.</p>
                }
              />
            </div>
          </div>
          <div className="text-center mt-5">
            <Button
              onClick={fusionSerisData}
              label="Deploy FusionSeries"
              severity="Primary"
              icon="pi pi-external-link"
              rounded
            />
          </div>
          <Messages  ref={msgs} />
        </div>
      </div>
    </div>
    </Layout>
  );
};
export default withRouter(FusionSeries);
