import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import Web3 from "web3";
import marketplaceAbi from "../artifacts/contracts/FLOWMARKETPLACE/FlowMarketplace.sol/FlowMarketplace.json";
import creatifyAbi from "../artifacts/contracts/FLOWCOLLECTION/FlowCollection.sol/FlowCollection.json";
import { Messages } from "primereact/messages";
import { FileUpload } from 'primereact/fileupload';

// Contract Address: 0x96D6CAd0B0E9890225702f9dc202fB95618eA4E7
export default function Collection() {
  const msgs = useRef(null);
  const [marketplaceContarctA, setMarketplaceContarctA] = useState("");
  const [collectionContractA, setCollectionContractA] = useState("");
  const [_platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  var web3 = new Web3(Web3.givenProvider);
  const marketPlaceFlowContract = () => {
    const marketplaceContarct = new web3.eth.Contract(marketplaceAbi.abi);
    web3.eth.getAccounts().then((accounts) => {
      marketplaceContarct
        .deploy({
          data: marketplaceAbi.bytecode,
          arguments: [
            _platformFee,
            contractName,
            process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
          ],
        })
        .send({ from: accounts[0], gas: 2580052 })
        .on("receipt", (receipt) => {
          console.log(
            "Contract Address flow markelplace:",
            receipt.contractAddress
          );
          setMarketplaceContarctA(receipt.contractAddress);
        });
    });
  };
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
  return (
    <div>
      <div className="card p-5 font-bold text-center">
        Deploy Collection
      </div>
      <div className="flex justify-content-center gap-5">
        {/* <div className="card" style={{ width: "50%" }}>
          <div className="flex p-2 justify-content-around">
            <div>Enter marketplace Name</div>
            <div>Enter marketplace fee</div>
          </div>
          <div className="flex p-2 justify-content-around gap-5">
            <div>
              <InputText
                type="text"
                name="contractName"
                value={contractName}
                onChange={handleInputName}
                id="contractName"
                className="p-2"
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <InputText
                type="number"
                name="_platformFee"
                value={_platformFee}
                onChange={handleInputFee}
                className="p-2"
              />
            </div>
          </div>
          <div className="text-center mt-5">
            <Button
              label="Deploy FLow Marketplace"
              onClick={marketPlaceFlowContract}
              severity="Primary"
              rounded
            />
          </div>
          {msgs && <Messages ref={msgs} />}
        </div> */}
        <div className="card" style={{ width: "50%" }}>
          <div className="text-center mt-5">
            <div>Enter Collection name</div>
            <div className="mt-3">
              <InputText
                value={contractName}
                onChange={handleInputName}
                className="p-2"
                type="text"
              />
            </div>
            <div className="mt-3">Enter Collection Symbol</div>
            <div className="mt-2">
              <InputText
                value={contractSymbol}
                onChange={handleInputSymbol}
                className="p-2"
                type="text"
              />
            </div>
            <div className="mt-3">Enter Marketplace address</div>
            <div className="mt-2">
              <InputText
                value={marketplaceContarctA}
                className="p-2"
                type="text"
              />
            </div>
            <div className="mt-3">Choose img</div>
            <div className="mt-2">
            <FileUpload name="demo[]" url={'/api/upload'}  accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />

            </div>
          </div>
          <div className="text-center mt-5">
            <Button
              onClick={collectionContarct}
              label="Deploy Collection"
              severity="Primary"
              rounded
            />
          </div>
        </div>
      </div>
    </div>
  );
}
