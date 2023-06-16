import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState,useEffect, useRef } from "react";
import Web3 from "web3";
import edition from "../artifacts/contracts/FLOWEDITION/FlowEdition.sol/FlowEdition.json"
import { Messages } from "primereact/messages";
import { withRouter } from "next/router";
import Layout from "../Components/Layout";

const Edition=(props)=> {
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
    const editionContarct = new web3.eth.Contract(edition.abi);
    web3.eth.getAccounts().then((accounts) => {
      editionContarct
        .deploy({
          data: edition.bytecode,
          arguments: [contractName, contractSymbol, marketplaceContarctA,flowcontarctAddress],
        })
        .send({ from: accounts[0], gas: 10002 })
        .on("receipt", (receipt) => {
          console.log(" Edition Contract Address:", receipt.contractAddress);
          setEditionContarctA(receipt.contractAddress);
          msgs.current.show([
            {
              sticky: true,
              severity: "success",
              detail: "Your Edition  contract has been  successfully deployed",
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
    title="Deploy Edition"
    description="This is use to show information of the deploy edition contract"
  >
    <div>
      <div className="card p-5 font-bold text-center">
        Deploy Edition
      </div>
      <div className="flex justify-content-center gap-5">
        <div className="card" style={{ width: "50%" }}>
          <div className="text-center mt-5">
            <div className="text-left">Enter Edition name</div>
            <div className="mt-3">
              <InputText
                value={contractName}
                onChange={handleInputName}
                className="p-2 w-full"
                type="text"
              />
            </div>
            <div className="mt-3 text-left">Enter Edition Symbol</div>
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
              label="Deploy Edition"
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
export default withRouter(Edition)
