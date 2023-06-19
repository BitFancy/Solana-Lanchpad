import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useEffect } from "react";
import tradhubAbi from "../artifacts/contracts/tradehub/TradeHub.sol/TradeHub.json";
import { Messages } from "primereact/messages";
import { withRouter } from "next/router";

import Web3 from "web3";
import Router from "next/router";
import Layout from "../Components/Layout";
const Step1 = (props) => {
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
    const marketplaceContarct = new web3.eth.Contract(tradhubAbi.abi);
    web3.eth.getAccounts().then((accounts) => {
      marketplaceContarct
        .deploy({
          data: tradhubAbi.bytecode,
          arguments: [
            _platformFee,
            contractName,
            process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
          ],
        })
        .send({ from: accounts[0], gas: "7492052" })
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
          setTimeout(() => {
            Router.push({
              pathname: "/step2",
              query: {
                contractAddress: receipt.contractAddress,
                contractAddressFlowAccess: flowContarctA,
              },
            });
          }, 2000);
        });
    });
  };

  useEffect(() => {
    setFlowContarctA(props.router.query.contractAddressFlowAccess);
  }, [props.router.query.contractAddressFlowAccess]);

  const handleInputFee = (e) => {
    if (e.target.value <= 100) {
      setPlatformfee(e.target.value);
    }
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };

  console.log(
    "props.router.query.contractAddressFlowAccess",
    props.router.query.contractAddressFlowAccess
  );
  return (
    <Layout title="Step 1" description="Step one of the launchpad">

    <div style={{ marginTop: "60px" }}>
      <div className="font-bold p-3 mb-5" style={{ borderBottom: "2px solid" }}>
        Step 1 : Setup Roles & marketplace
      </div>
      <div className="card">
        <div className="flex justify-content-between gap-5">
          <div style={{ width: "50%" }}>
            <div>Enter marketplace Name</div>

            <InputText
              type="text"
              name="contractName"
              value={contractName}
              onChange={handleInputName}
              id="contractName"
              className="p-2 w-full mt-3 input-back"
              placeholder="Enter Marketplace Name"
            />
          </div>
          <div style={{ width: "50%" }}>
            <div>Enter marketplace fee</div>
            <InputText
              type="number"
              name="_platformFee"
              value={_platformFee}
              onChange={handleInputFee}
              className="p-2 w-full mt-3 input-back "
              placeholder="Enter Marketplace fee"
            />
          </div>
        </div>

        <div className="text-center">
          <Button
            label="deploy contract"
            onClick={marketPlaceContract}
            severity="Primary"
            className=" mt-7"
            style={{ width: "30%" }}
            rounded
          />
        </div>
        {msgs && <Messages className="success-msg" ref={msgs} />}
      </div>
    </div>
    </Layout>
  );
};
export default withRouter(Step1);
