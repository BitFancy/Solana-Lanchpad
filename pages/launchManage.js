import Layout from "@/Components/Layout";
import { InputText } from "primereact/inputtext";
import React from "react";

export default function LunchManage() {
  return (
    <Layout title="launchpad Manage page" description="Used to manage the collection">
      <div>
        <div className="font-bold ml-5 mt-10">Manage your collection</div>
        <div className="flex justify-around">
        <div className="font-bold p-5" style={{borderRight:"1px solid"}}>
            <div className="mt-5">Edition</div>
            <div className="mt-5">Collection</div>
            <div className="mt-5">AIREX</div>
            <div className="mt-5">Subscription NFTs</div>
            <div className="mt-5">Phygital NFTs</div>
            <div className="mt-5">Roles</div>
            <div className="mt-5">Marketplace</div>
            <div className="mt-5">Gateway</div>
            <div className="mt-5">Frontend</div>
            <div className="mt-5">Metaverse</div>
          </div>
          <div className="w-2/5 p-5 border border-indigo-600 ...">
            <div> 1 . Grantrole</div>
            <div className="mt-3">Role</div>
            <div className="mt-2">
                <InputText className="w-full" placeholder="role" type="text"/>
            </div>
            <div className="mt-10">Account (address)</div>
            <div className="mt-2">
                <InputText className=" w-full" type="text" placeholder="Account (address)"/>
            </div>
            <div className="mt-10 text-center">
                <button className="bg-blue-500 rounded-full text-white p-3.5 w-2/5">Assign</button>
            </div>
          </div>
          <div className="w-2/5 p-5 border border-indigo-600 ...">
            <div> 2. Revokrole</div>
            <div className="mt-3">Role</div>
            <div className="mt-2">
                <InputText className="w-full" placeholder="role" type="text"/>
            </div>
            <div className="mt-10">Account (address)</div>
            <div className="mt-2">
                <InputText className=" w-full" type="text" placeholder="Account (address)"/>
            </div>
            <div className="mt-10 text-center">
                <button className="bg-blue-500 rounded-full text-white p-3.5 w-2/5">Revoke/remove</button>
            </div>
          </div>
        </div>
       
          
      </div>
    </Layout>
  );
}
