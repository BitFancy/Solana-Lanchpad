import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useEffect } from "react";
import marketplaceAbi from "../artifacts/contracts/FLOWMARKETPLACE/FlowMarketplace.sol/FlowMarketplace.json";
import { Messages } from "primereact/messages";
import { withRouter } from "next/router";

import Web3 from "web3";
import Router from "next/router";
const Step1=(props)=> {
  const msgs = useRef(null);
  const [marketplaceContarctA, setMarketplaceContarctA] = useState("");
  const [flowContarctA, setFlowContarctA] = useState("");
  const [_platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");

  var web3 = new Web3(Web3.givenProvider);
  const marketPlaceContract = (props) => {
  //   msgs.current.show([
  //     {
  //       sticky: true,
  //       severity: "success",
  //       detail: "Your contract has been  successfully deployed",
  //       closable: true,
  //     },
  //   ]);
  //  setTimeout(()=>{
  //   Router.push({
  //     pathname: "/step2",
  //     query: { contractAddress: "jasdfiuhe4j59w9u98wquron2k4jr98we9fnsiof98shf9b" },
  //   });
  //  },2000)
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
        .send({ from: accounts[0], gas: '7492052' })
        .on("receipt", (receipt) => {
          console.log("Props???????:", props);
          setMarketplaceContarctA(receipt.contractAddress);
          msgs.current.show([
            {
              sticky: true,
              severity: "success",
              detail: "Your contract has been  successfully deployed",
              closable: true,
            },
          ]);
         setTimeout(()=>{
          Router.push({
            pathname: "/step2",
            query: { contractAddress: receipt.contractAddress, contractAddressFlowAccess: flowContarctA },
          });
        },2000)
        });
    });
  };

  useEffect(() => {
    setFlowContarctA(props.router.query.contractAddressFlowAccess)
  }, [props.router.query.contractAddressFlowAccess])

  const handleInputFee = (e) => {
    if (e.target.value <= 100) {
      setPlatformfee(e.target.value);
    }
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };

  console.log("props.router.query.contractAddressFlowAccess",props.router.query.contractAddressFlowAccess);
  return (
    <div>
      <div className="card p-5 font-bold">
        Step 1 : Setup Roles & marketplace
      </div>
      <div className="card m-auto" style={{ width: "50%" }}>
       
          <div>
          <div>Enter marketplace Name</div>

            <InputText
              type="text"
              name="contractName"
              value={contractName}
              onChange={handleInputName}
              id="contractName"
              className="p-2 w-full mt-3"
              style={{ width: "100%" }}
            />
          </div>
          <div>
          <div className="mt-5">Enter marketplace fee</div>
            <InputText
              type="number"
              name="_platformFee"
              value={_platformFee}
              onChange={handleInputFee}
              className="p-2 w-full mt-3"
            />
          </div>
      

        <div className="text-center mt-5">
          <Button
            label="deploy contract"
            onClick={marketPlaceContract}
            severity="Primary"
            rounded
          />
        </div>
        {msgs && <Messages ref={msgs} />}
      </div>
    </div>
  );
}
export default withRouter(Step1)