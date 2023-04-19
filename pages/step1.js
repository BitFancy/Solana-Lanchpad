import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState,useEffect ,useRef} from "react";
import marketplaceAbi from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
import marketbytecode from "../artifacts/bytecode/marketbytecode.json";
import { Messages } from 'primereact/messages';

import Web3 from "web3";
export default function Step1() {
    const msgs = useRef(null);

  const [marketplaceContarctA, setMarketplaceContarctA] = useState("");
  const [_platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
//   const [msgs, setMesg] = useState("");

  var web3 = new Web3(Web3.givenProvider);
  const marketPlaceContract = () => {
    const marketplaceContarct = new web3.eth.Contract(marketplaceAbi.abi);
    web3.eth.getAccounts().then((accounts) => {
      marketplaceContarct
        .deploy({
          data: marketbytecode,
          arguments: [_platformFee],
        })
        .send({ from: accounts[0], gas: 4700000 })
        .on("receipt", (receipt) => {
          console.log("Contract Address:", receipt.contractAddress);
          setMarketplaceContarctA(receipt.contractAddress);
        });
    });
    msgs.current.show([
        { sticky: true, severity: 'success', detail: 'Your contract has been  successfully deployed', closable: false },
       
    ]);
  };

         
  const handleInputFee = (e) => {
    if (e.target.value <= 100) {
      setPlatformfee(e.target.value);
    }
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };
  return (
    <div>
      <div className="card p-5 font-bold">
        Step 1 : Setup Roles & marketplace
      </div>
      <div className="card">
        <div className="flex p-2 justify-content-around">
          <div>Enter marketplace Name</div>
          <div>Enter marketplace fee</div>
        </div>
        <div className="flex p-2 justify-content-around ">
          <div>
            Address:{marketplaceContarctA}
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
            label="deploy contract"
            onClick={marketPlaceContract}
            severity="Primary"
            rounded
          />
        </div>
       {msgs &&  <Messages ref={msgs} />}
      </div>
    </div>
  );
}
