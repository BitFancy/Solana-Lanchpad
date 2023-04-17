import React from "react";
import { InputText } from 'primereact/inputtext';

export default function UpdateMarketPlace() {
  return (
    // <Layout title="Step one" description="Used to deploy contract">
      <div>
        <div className="card p-5 font-bold">
          Step 1 : Update Parameters{" "}
        </div>
        <div className="card">
        <div className="flex p-2 justify-content-around">
          <div>Enter new marketplace fee</div>
          <div>Enter payout address</div>
        </div>
        <div className="flex p-2 justify-content-around">
          <div>
            <InputText className="p-2" type="number"/>
          </div>
          <div>
            <InputText className="p-2" type="text"/>
          </div>
        </div>
        </div>
      </div>
    // </Layout>
  );
}
