import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from "react";
import flowAccessControlJson from "../artifacts/contracts/flow-accesscontrol/FlowAccessControl.sol/FlowAccessControl.json";
import etherContract from "../utils/web3Modal";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

export default function LunchManage() {
  const walletAddr = useSelector(selectUser);
  var wallet = walletAddr ? walletAddr[0] : "";   
  const [grantRole, setGrantRole] = useState(true);
  const [revokeRole, setRevokeRole] = useState(true);

  useEffect(() => {
    const asyncFn = async () => {
      const token = localStorage.getItem("platform_token");
      if (token) {
      }
      const flowAccessControlContract = await etherContract(
            process.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        flowAccessControlJson.abi
      );
      setGrantRole(
        await flowAccessControlContract.grantRole(
          await flowAccessControlContract.FLOW_ADMIN_ROLE(),
          wallet
        )
      );
    };
    asyncFn();
  }, [grantRole]);

  useEffect(() => {
    const asyncFn = async () => {
      const token = localStorage.getItem("platform_token");
      if (token) {
      }
      const flowAccessControlContract = await etherContract(
            process.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        flowAccessControlJson.abi
      );
      setRevokeRole(
        await flowAccessControlContract.revokeRole(
          await flowAccessControlContract.FLOW_ADMIN_ROLE(),
          wallet
        )
      );
    };
    asyncFn();
  }, [revokeRole]);

  return (  
    <div>
      <div>
        <div className="font-bold mt-10 manage-colloection-back">Manage your collection</div>
        <div className="flex gap-right mt-5">
        <div className="font-bold p-5 overflow-y-auto ... overflow-manage-left">
          <div className="mt-5">Edition</div>
          <div className="mt-5">Collection</div>
          <div className="mt-5">AIREX</div>
          <div className="mt-5">Subscription NFTs</div>
          <div className="mt-5">Phygital NFTs</div>
          <div className="border-bottom-das"></div>
          <div className="mt-5">Roles</div>
          <div className="mt-5">Marketplace</div>
          <div className="mt-5">Gateway</div>
          <div className="mt-5">Frontend</div>
          <div className="mt-5">Metaverse</div>
        </div>
        <div style={{width:"100%"}}>
          <div className=" p-5 card card-role">
            <div> 1 . Grantrole</div>
            <div className="mt-3">Role</div>
            <span className="mt-2">
                <InputText id="role"  placeholder="role" type="text"style={{width:"100%"}}/>
            </span>
            <div className="mt-5">Account (address)</div>
            <div className="mt-2">
                <InputText  type="text" placeholder="Account (address)" style={{width:"100%"}}/>
            </div>
            <div className="mt-5 text-center">
                <Button  label="Assign" severity="Primary" rounded />
            </div>
          </div>
          <div className=" p-5 card card-role" >
            <div> 2. Revokrole</div>
            <div className="mt-3">Role</div>
            <div className="mt-2">
                <InputText  placeholder="role" type="text"style={{width:"100%"}}/>
            </div>
            <div className="mt-5">Account (address)</div>
            <div className="mt-2">
                <InputText  type="text" placeholder="Account (address)"style={{width:"100%"}}/>
            </div>
            <div className="mt-5 text-center">
                <Button label="Revoke/remove" severity="Primary" rounded />

            </div>
          </div>
          </div>
          
        </div>
        <div className="mt-5 text-center">
                <Button label="Deploy  another Collection" severity="Primary" rounded />

            </div>
          
      </div>
      </div>
  )
}
