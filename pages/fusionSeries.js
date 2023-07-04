import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { withRouter } from "next/router";
import Layout from "../Components/Layout";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_LAUNCH;
const FusionSeries = (props) => {
  const msgs = useRef(null);
  const [marketplaceContarctA, setMarketplaceContarctA] = useState("");
  const [_platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [supabaseToken, setsupabaseToken] = useState();
const fusionSerisData=async()=>{
 const token= localStorage.getItem('authToken')
  localStorage.getItem('')
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
    let tokenData;
  try {
    tokenData = await axios.post(`${BASE_URL_LAUNCH}/FusionSeries`,config,  { contractName:"FusionSeries"})
    setsupabaseToken(tokenData)
    console.log("fusion series data",tokenData)  
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
    setMarketplaceContarctA(props.router.query.contractAddress);
  }, [props.router.query.contractAddress]);

  return (
    <Layout
    title="FusionSeries"
    description="This is use to show deployed FusionSeries information"
  >
    <div style={{ marginTop: "85px" }}>
      <div className="p-5 font-bold text-align-center">Deploy FusionSeries</div>
      <div className="flex justify-content-center gap-5">
        <div className="card" style={{ width: "50%" }}>
          <div className="text-center mt-5">
            <div className="text-left">Enter FusionSeries name</div>
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
                value={marketplaceContarctA}
                className="p-2 w-full input-back"
                type="text"
              />
            </div>
            <div className="mt-3 text-left">Choose img</div>
            <div className="mt-2">
              <FileUpload
                name="demo[]"
                url={"/api/upload"}
                accept="image/*"
                maxFileSize={1000000}
                emptyTemplate={
                  <p className="m-0">Drag and drop files to here to upload.</p>
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
        </div>
      </div>
    </div>
    </Layout>
  );
};
export default withRouter(FusionSeries);
