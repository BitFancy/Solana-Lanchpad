import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

export default function Dashboard() {
  return (
    // <Layout
    //   title="Dashboard launchpad"
    //   description="Used to show launchpad dashboard"
    // >
      <div>
        <div className="text-center mt-10 border-b-2 border-indigo-500 ... p-5">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search by marketplace name" />
        </span>
        </div>
        <hr></hr>
        <div className="flex justify-content-between mt-10">
          <div className="font-bold p-5" style={{borderRight:"1px solid"}}>
            <div className="mt-5">Edition</div>
            <div className="mt-5">Collection</div>
            <div className="mt-5">Roles</div>
            <div className="mt-5">Marketplace</div>
          </div>
          <div className="w-full ml-5">
             <div>
       <div className="flex justify-content-between">
       <div className="font-bold">No. of items </div>
       <div>
        <Button label="Manage" severity="Primary" rounded />
       </div>
       </div>
       </div>
            <div className="flex gap-5 mt-5">
              <div className="card" style={{flex:"1",marginBottom:'0px'}}></div>
              <div className="card"style={{flex:"1"}}></div>
            </div>
            <div className="mt-5">
              <div className="flex gap-5">
                <div className="card" style={{flex:"1",marginBottom:"0px"}}></div>
                <div className="card" style={{flex:"1"}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </Layout>
  );
}
