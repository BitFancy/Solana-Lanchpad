import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";

export default function LuanchNFTs() {
  return (
    <Layout
      title="Launchpad NFTs"
      description="Used to show launchpad NFTs"
    >
      <div>
        <div className="text-center mt-5 card p-5">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search by marketplace name" />
        </span>
        </div>
        <hr></hr>
        <div className="flex justify-content-between mt-5">
          <div className="font-bold p-5" style={{borderRight:"1px solid"}}>
            <div className="mt-5 cursor-pointer">SignatureSeries</div>
            <div className="mt-5 cursor-pointer">FusionSeries</div>
            <div className="mt-5 cursor-pointer">Roles</div>
            <div className="mt-5 cursor-pointer">Marketplace</div>
          </div>
          <div className="w-full ml-5">
           
            <div className="flex mt-5 gap-5" >
              <div className="card" style={{marginBottom:"0px" ,flex:"1"}}>Hello</div>
              <div className="card" style={{flex:"1"}}></div>
            </div>
            <div>
              <div className="flex mt-5 gap-5" >
                <div className="card " style={{marginBottom:"0px",flex:"1"}}></div>
                <div className="card " style={{flex:"1"}}></div>
              </div>
            </div>
            <div className="mt-5 flex justify-around">
                <Button label="create NFTs" severity="Primary" rounded />

            </div>
          </div>
        </div>
      </div>
     </Layout>
  );
}
