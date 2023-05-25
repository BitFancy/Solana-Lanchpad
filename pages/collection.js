import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import creatifyAbi from "../artifacts/contracts/FLOWCOLLECTION/FlowCollection.sol/FlowCollection.json";
import { Messages } from "primereact/messages";
import { FileUpload } from "primereact/fileupload";
import { withRouter } from "next/router";

const Collection = (props) => {
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
    const creatifyContarct = new web3.eth.Contract(creatifyAbi.abi);
    web3.eth.getAccounts().then((accounts) => {
      creatifyContarct
        .deploy({
          data: creatifyAbi.bytecode,
          arguments: [contractName, contractSymbol, marketplaceContarctA],
        })
        .send({ from: accounts[0], gas: 10002 })
        .on("receipt", (receipt) => {
          console.log("Contract Address collection:", receipt.contractAddress);
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
    <div style={{ marginTop: "85px" }}>
      <div className="p-5 font-bold text-align-center">Deploy Collection</div>
      <div className="flex justify-content-center gap-5">
        <div className="card" style={{ width: "50%" }}>
          <div className="text-center mt-5">
            <div className="text-left">Enter Collection name</div>
            <div className="mt-3">
              <InputText
                value={contractName}
                onChange={handleInputName}
                className="p-2 w-full input-back"
                type="text"
              />
            </div>
            <div className="mt-3 text-left">Enter Collection Symbol</div>
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
              label="Deploy Collection"
              severity="Primary"
              icon="pi pi-external-link"
              rounded
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Collection);
