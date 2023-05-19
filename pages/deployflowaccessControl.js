import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import marketplaceAbi from "../artifacts/contracts/flow-accesscontrol/FlowAccessControl.sol/FlowAccessControl.json";
import Web3 from "web3";
import Router from "next/router";
import { useEffect } from "react";

export default function Deployflowmarket() {
  const [marketplaceContarctA, setMarketplaceContarctA] = useState("");
  const [visible, setVisible] = useState(false);
  const msgs = useRef(null);

  var web3 = new Web3(Web3.givenProvider);

  const flowAccessMarletContarct = () => {
    const marketplaceContarct = new web3.eth.Contract(marketplaceAbi.abi);
    web3.eth.getAccounts().then((accounts) => {
      marketplaceContarct
        .deploy({
          data: marketplaceAbi.bytecode,
        })
        .send({ from: accounts[0], gas: '7492052'})
        .on("receipt", (receipt) => {
          setMarketplaceContarctA(receipt.contractAddress);
          console.log("Contract Address:", receipt.contractAddress);
          setVisible(true);

          setTimeout(() => {
            Router.push({
              pathname: "/step1",
              query: { contractAddressFlowAccess: receipt.contractAddress },
            });
          }, 2000);
        });
    });
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     Router.push({
  //       pathname: "/step1",
  //       query: { contractAddressFlowAccess: "Hello address"},
  //     });
  //   }, 2000);
  // },[])
  
  return (
    <div>
      <div className="text-center">
        <Button
          label="Deploy Flow Access Control"
          icon="pi pi-external-link"
          onClick={flowAccessMarletContarct}
        />
      </div>
      <Dialog
        visible={visible}
        style={{ width: "50vw", textAlign: "center" }}
        onHide={() => setVisible(false)}
      >
        <div className="m-0 bg-blue-600 text-white p-5 text-lg">
          <div>Well done !</div>
          <div>you are now the admin, Flow access control</div>
          <div>has been successfully deployed</div>
        </div>
      </Dialog>
    </div>
  );
}
