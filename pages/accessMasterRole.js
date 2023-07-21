import React, { useState } from 'react'
import accessMasterAbi from "../artifacts/contracts/accessmaster/AccessMaster.sol/AccessMaster.json";
import { InputText } from 'primereact/inputtext';
const accessMaterAddress = process.env.NEXT_PUBLIC_FLOW_ACCESS_Master_ADDRESS;
import { useAccount, useEnsName } from "wagmi";
import { Button } from 'primereact/button';
import Layout from '../Components/Layout';
import Link from 'next/link';
import Sidemenu from './sidemenu';
import MarketplaceProfileDetails from './marketplaceProfileDetails';
import { ethers } from 'ethers';

export default function AccessMasterRole() {
    const { address } = useAccount();
    const { data: ensName } = useEnsName({ address });
  
    const [role, setRole] = useState("");
    const [userAdddress, setuserAdddress] = useState(address);
  
    const revokeRoleData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accessmasterContarct = new ethers.Contract(
          accessMaterAddress,
          accessMasterAbi.abi,
          signer
        );
        const revokerole = await accessmasterContarct.revokeRole(
          await accessmasterContarct.FLOW_CREATOR_ROLE(),
          address
        );
        console.log("revoke role data", revokerole);
      };
      const grantRoleData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accessmasterContarct = new ethers.Contract(
          accessMaterAddress,
          accessMasterAbi.abi,
          signer
        );
        const grantrole = await accessmasterContarct.grantRole(
          await accessmasterContarct.FLOW_CREATOR_ROLE(),
          address
        );
        console.log("grant role", grantrole);
      };
      const handleInputRole = (e) => {
        setRole(e.target.value);
      };
      const handleInputAddress = (e) => {
        setuserAdddress(e.target.value);
      };
  return (
    <Layout>
        <div  style={{marginTop:'65px'}}>
        <MarketplaceProfileDetails/>
       
       
<div className='flex justify-content-between buy-back-image'>
<div>
<Sidemenu/>
</div>
<div style={{width:'100%'}}>
<div className="flex justify-content-between">
       
       <div style={{ width: "80%",margin:'0 auto' }}>
          <div className='font-bold text-3xl'>Manage Your Role</div>
          <hr></hr>
            <div className=" p-5 card card-role">
              <div> 1 . Grantrole</div>
              <div className="mt-3">Role</div>
              <span className="mt-2">
                <InputText
                  id="role"
                  value={role}
                  onChange={handleInputRole}
                  placeholder="Role"
                  type="text"
                  style={{ width: "100%" }}
                />
              </span>
              <div className="mt-5">Account (Address)</div>
              <div className="mt-2">
                <InputText
                  type="text"
                  onChange={handleInputAddress}
                  placeholder="Account (Address)"
                  value={userAdddress}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mt-5 text-center">
                <Button
                  onClick={grantRoleData}
                  label="Assign"
                  severity="Primary"
                  rounded
                />
              </div>
            </div>
            <div className=" p-5 card card-role">
              <div> 2. Revokrole</div>
              <div className="mt-3">Role</div>
              <div className="mt-2">
                <InputText
                  placeholder="Role"
                  type="text"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mt-5">Account (Address)</div>
              <div className="mt-2">
                <InputText
                  type="text"
                  placeholder="Account (Address)"
                  value={address}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mt-5 text-center">
                <Button
                  onClick={revokeRoleData}
                  label="Revoke/Remove"
                  severity="Primary"
                  rounded
                />
              </div>
            </div>
            </div>
  </div>
</div>
</div>
          
       
    </div>
    </Layout>
  )
}
