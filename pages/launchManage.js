import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from "react";
import accessMasterAbi from "../artifacts/contracts/accessmaster/AccessMaster.sol/AccessMaster.json";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import Layout from "../Components/Layout";

export default function LunchManage() {
  const walletAddr = useSelector(selectUser);
  var wallet = walletAddr ? walletAddr[0] : "";   
  const [grantRole, setGrantRole] = useState(true);
  const [revokeRole, setRevokeRole] = useState(true);

  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const token = localStorage.getItem("platform_token");
  //     if (token) {
  //     }
  //     const flowAccessControlContract = await etherContract(
  //           process.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
  //           accessMasterAbi.abi
  //     );
  //     setGrantRole(
  //       await flowAccessControlContract.grantRole(
  //         await flowAccessControlContract.FLOW_ADMIN_ROLE(),
  //         wallet
  //       )
  //     );
  //   };
  //   asyncFn();
  // }, [grantRole]);

  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const token = localStorage.getItem("platform_token");
  //     if (token) {
  //     }
  //     const flowAccessControlContract = await etherContract(
  //           process.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
  //           accessMasterAbi.abi
  //     );
  //     setRevokeRole(
  //       await flowAccessControlContract.revokeRole(
  //         await flowAccessControlContract.FLOW_ADMIN_ROLE(),
  //         wallet
  //       )
  //     );
  //   };
  //   asyncFn();
  // }, [revokeRole]);

  return (  
    <Layout
    title="Launch Manage Page"
    description="This is use to show information of the launch manage page"
  >
    <div>
      <div>
        <div className="font-bold mt-10 manage-colloection-back">Manage your FusionSeries</div>
        <div className="flex gap-right mt-5">
        <div className=" p-5 overflow-y-auto ... overflow-dashboard-left">
          <div className="font-bold">
          overview
          </div>
          <div className="ml-3 mt-3">
          <div>Analytics</div>
          <div className="mt-3">Subscription</div>
          </div>
         
          <div className="font-bold mt-5">Contracts</div>
         <div className="ml-3">
         <div className="mt-3">SignatureSeries</div>
          <div className="mt-3">FusionSeries</div>
          <div className="mt-3">DynamicRealms</div>
          <div className="mt-3">EternumPass</div>
          <div className="mt-3">Instagen</div>
         </div>
          <div className="border-bottom-das"></div>
          <div className="font-bold mt-5">Settings</div>
         <div className="ml-3">
         <div className="mt-3">Roles</div>
          <div className="mt-3">TradeHub</div>
          <div className="mt-3">Gateway</div>
          <div className="mt-3">Frontend</div>
          <div className="mt-3">Metaverse</div>
         </div>
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
                <Button label="Deploy  another FusionSeries" severity="Primary" rounded />

            </div>
          
      </div>
      </div>
      </Layout>
  )
}
