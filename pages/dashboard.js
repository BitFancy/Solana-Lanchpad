import Layout from "@/Components/Layout";
import React from "react";
import { InputText } from "primereact/inputtext";

export default function Dashboard() {
  return (
    <Layout
      title="Dashboard launchpad"
      description="Used to show launchpad dashboard"
    >
      <div>
        <div className="text-center mt-10 border-b-2 border-indigo-500 ... p-5">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search by marketplace name" />
        </span>
        </div>
        <hr></hr>
        <div className="flex justify-evenly mt-10">
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
          <div>
             <div>
       <div className="flex justify-between">
       <div className="font-bold">No. of items </div>
       <div>
        <button className="bg-blue-500 rounded-full text-white p-3.5 w-full">Manage</button>
       </div>
       </div>
       </div>
            <div className="flex gap-20 mt-10">
              <div className="border-solid border-2 border-indigo-600 ... h-64 w-64"></div>
              <div className="border-solid border-2 border-indigo-600 ... h-64 w-64"></div>
            </div>
            <div>
              <div className="flex gap-20 mt-10">
                <div className="border-solid border-2 border-indigo-600 ... h-64 w-64"></div>
                <div className="border-solid border-2 border-indigo-600 ... h-64 w-64"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
