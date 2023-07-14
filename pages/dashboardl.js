import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Layout
    title="Launchpad Dashboard"
    description="This is use to show launchpad Information"
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
        <div className="w-full right-collection-box">
          <div>
            <div className="flex justify-content-between">
              <div className="font-bold">No. of items </div>
              <div>
                <Link href='/launchManage'>
                <Button label="Manage" severity="Primary" rounded />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-5 mt-5">
            <div className="card" style={{ flex: "1", marginBottom: "0px" }}>
              <div className="text-center">
                <img className="dash-img-size" src="garden.png"></img>
              </div>
              <div>TradeHub Name:</div>
            </div>
            <div className="card" style={{ flex: "1" }}>
              <div className="text-center">
                <img className="dash-img-size" src="garden.png"></img>
              </div>
              <div>TradeHub Name:</div>{" "}
            </div>
          </div>
          <div className="mt-5">
            <div className="flex gap-5">
              <div className="card" style={{ flex: "1", marginBottom: "0px" }}>
                <div className="text-center">
                  <img className="dash-img-size" src="garden.png"></img>
                </div>
                <div>TradeHub Name:</div>{" "}
              </div>
              <div className="card" style={{ flex: "1" }}>
                <div className="text-center">
                  <img className="dash-img-size" src="garden.png"></img>
                </div>
                <div>TradeHub Name:</div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
