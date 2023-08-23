import React, { useState } from 'react'
import accessMasterAbi from "../artifacts/contracts/accessmaster/AccessMaster.sol/AccessMaster.json";
import { InputText } from 'primereact/inputtext';
const accessMaterAddress = process.env.NEXT_PUBLIC_FLOW_ACCESS_Master_ADDRESS;
import { useAccount, useEnsName } from "wagmi";
import { Button } from 'primereact/button';
import Layout from '../Components/Layout';
import Sidemenu from './sidemenu';
import MarketplaceProfileDetails from './marketplaceProfileDetails';
import { ethers } from 'ethers';

export default function AccessMasterRole() {
    const { address } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
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
        setLoading1(true);
        const revokerole = await accessmasterContarct.revokeRole(
          await accessmasterContarct.FLOW_CREATOR_ROLE(),
          address
        );
        setTimeout(() => {
          setLoading1(false);
      }, 2000);
      };
      const grantRoleData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accessmasterContarct = new ethers.Contract(
          accessMaterAddress,
          accessMasterAbi.abi,
          signer
        );
        setLoading(true);

        const grantrole = await accessmasterContarct.grantRole(
          await accessmasterContarct.FLOW_CREATOR_ROLE(),
          address
        );
        setTimeout(() => {
          setLoading(false);
      }, 2000);
      };
      const handleInputRole = (e) => {
        setRole(e.target.value);
      };
      const handleInputAddress = (e) => {
        setuserAdddress(e.target.value);
      };
  return (
    <Layout>
        <div>
        <MarketplaceProfileDetails/>
       
       
<div className='flex justify-content-between buy-back-image'>
<div >
<Sidemenu/>
</div>
<div style={{width:'100%'}}>
<div className="flex justify-content-between">
       
       <div style={{ width: "80%",margin:'0 auto' }}>
          <div className='font-bold text-3xl text-white'>Manage Your Role</div>
            <div className=" p-5 card card-role mt-5">
              <div className='text-white'>  Grantrole</div>
              <div className="mt-3 text-white">Role</div>
              <div className="mt-2">
                <InputText
                  id="role"
                  value={role}
                  onChange={handleInputRole}
                  placeholder="Role"
                  type="text"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mt-5 text-white">Account (Address)</div>
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
                  loading={loading}
                />
              </div>
            </div>
            <div className=" p-5 card card-role">
              <div className='text-white'> Revokrole</div>
              <div className="mt-3 text-white">Role</div>
              <div className="mt-2">
                <InputText
                  placeholder="Role"
                  type="text"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mt-5 text-white">Account (Address)</div>
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
                  loading={loading1}
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
