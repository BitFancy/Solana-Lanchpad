import Layout from "@/Components/Layout";
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function LuanchNFTs() {
  return (
    <Layout
      title="Launchpad NFTs"
      description="Used to show launchpad NFTs"
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
            <div className="mt-10 flex justify-around">
                <Button label="create NFTs" severity="Primary" rounded />

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
