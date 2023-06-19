import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState,useEffect, useRef } from "react";
import Web3 from "web3";
import signatureseries from "../artifacts/contracts/signatureseries/SignatureSeries.sol/SignatureSeries.json"
import { Messages } from "primereact/messages";
import { withRouter } from "next/router";
import Layout from "../Components/Layout";

const SignatureSeries=(props)=> {
  const msgs = useRef(null);
  const [marketplaceContarctA, setMarketplaceContarctA] = useState("");
  const [editionContarctA, setEditionContarctA] = useState("");
  const [flowcontarctAddress, setFlowcontractAddress] = useState("");
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  var web3 = new Web3(Web3.givenProvider);
  const collectionContarct = () => {
    const contractName = "nft";
    const contractSymbol = "NFT";
    const editionContarct = new web3.eth.Contract(signatureseries.abi);
    web3.eth.getAccounts().then((accounts) => {
      editionContarct
        .deploy({
          data: signatureseries.bytecode,
          arguments: [contractName, contractSymbol, marketplaceContarctA,flowcontarctAddress],
        })
        .send({ from: accounts[0], gas: 10002 })
        .on("receipt", (receipt) => {
          console.log(" SignatureSeries Contract Address:", receipt.contractAddress);
          setEditionContarctA(receipt.contractAddress);
          msgs.current.show([
            {
              sticky: true,
              severity: "success",
              detail: "Your SignatureSeries  contract has been  successfully deployed",
              closable: true,
            },
          ]);
        });
    });
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };
  const handleInputSymbol = (e) => {
    setcontractSymbol(e.target.value);
  };

  useEffect(() => {
    setFlowcontractAddress(props.router.query.contractAddress)
  }, [props.router.query.contractAddress])
  
  useEffect(() => {
    setMarketplaceContarctA(props.router.query.contractAddress)
  }, [props.router.query.contractAddress])
  
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
            <div className="mt-3 text-left">Enter SignatureSeries  Symbol</div>
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
              onClick={collectionContarct}
              label="Deploy SignatureSeries"
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
}
export default withRouter(SignatureSeries)
