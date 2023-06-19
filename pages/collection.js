import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import fusionSeriesAbi from "../artifacts/contracts/fusionseries/FusionSeries.sol/FusionSeries.json";
import { Messages } from "primereact/messages";
import { FileUpload } from "primereact/fileupload";
import { withRouter } from "next/router";
import Layout from "../Components/Layout";

const FusionSeries = (props) => {
  const msgs = useRef(null);
  const [marketplaceContarctA, setMarketplaceContarctA] = useState("");
  const [collectionContractA, setCollectionContractA] = useState("");
  const [_platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  var web3 = new Web3(Web3.givenProvider);
  const collectionContarct = () => {
    const contractName = "nft";
    const contractSymbol = "NFT";
    const creatifyContarct = new web3.eth.Contract(fusionSeriesAbi.abi);
    web3.eth.getAccounts().then((accounts) => {
      creatifyContarct
        .deploy({
          data: fusionSeriesAbi.bytecode,
          arguments: [contractName, contractSymbol, marketplaceContarctA],
        })
        .send({ from: accounts[0], gas: 10002 })
        .on("receipt", (receipt) => {
          console.log("Contract Address FusionSeries:", receipt.contractAddress);
          setCollectionContractA(receipt.contractAddress);
        });
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
            <div className="mt-3 text-left">Marketplace address</div>
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
              onClick={collectionContarct}
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
