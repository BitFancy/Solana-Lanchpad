import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";

export default function LuanchNFTs() {
  return (
    <Layout
      title="Launchpad NFTs"
      description="Used to show launchpad NFTs"
    >
     <div>
      <div className="text-center mt-10 border-b-2 border-indigo-500 ... dashboardl-top-back">
        <div className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className="input-market-search"
            placeholder="Search by Tradhub name"
          />
        </div>
      </div>
      <hr></hr>
      <div className="flex justify-content-between mt-10">
        <div className="font-bold p-5 overflow-y-auto ... overflow-dashboard-left">
          <div className="mt-5">SignatureSeries</div>
          <div className="mt-5">FusionSeries</div>
          <div className="mt-5">AIREX</div>
          <div className="mt-5">EternumPass</div>
          <div className="mt-5">Phygital NFTs</div>
          <div className="border-bottom-das"></div>
          <div className="mt-5">Roles</div>
          <div className="mt-5">TradeHub</div>
          <div className="mt-5">Gateway</div>
          <div className="mt-5">Frontend</div>
          <div className="mt-5">Metaverse</div>
        </div>
        <div className="w-full right-collection-box">
          <div className="flex gap-5 mt-5">
            <div className="card" style={{ flex: "1", marginBottom: "0px" }}>
              <div className="text-center">
                <img className="dash-img-size" src="garden.png"></img>
              </div>
              <div>Asset Description</div>
              <div>price</div>
              <div>Last sale:</div>
            </div>
            <div className="card" style={{ flex: "1" }}>
              <div className="text-center">
                <img className="dash-img-size" src="garden.png"></img>
              </div>
              <div>Asset Description</div>
              <div>price</div>
              <div>Last sale:</div>
                          </div>
          </div>
          <div className="mt-5">
            <div className="flex gap-5">
              <div className="card" style={{ flex: "1", marginBottom: "0px" }}>
                <div className="text-center">
                  <img className="dash-img-size" src="garden.png"></img>
                </div>
                <div>Asset Description</div>
              <div>price</div>
              <div>Last sale:</div>              </div>
              <div className="card" style={{ flex: "1" }}>
                <div className="text-center">
                  <img className="dash-img-size" src="garden.png"></img>
                </div>
                <div>Asset Description</div>
              <div>price</div>
              <div>Last sale:</div>
                            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </Layout>
  );
}
