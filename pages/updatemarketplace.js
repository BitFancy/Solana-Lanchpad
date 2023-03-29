import Layout from "@/Components/Layout";
import React from "react";

export default function UpdateMarketPlace() {
  return (
    <Layout title="Step one" description="Used to deploy contract">
      <div>
        <div className="border-b-2 border-indigo-500 ... p-5 font-bold">
          Step 1 : Update Parameters{" "}
        </div>
        <div className="flex p-2 justify-around">
          <div>Enter new marketplace fee</div>
          <div>Enter payout address</div>
        </div>
        <div className="flex p-2 justify-around">
          <div>
            <input className="p-2" type="number"></input>
          </div>
          <div>
            <input className="p-2" type="text"></input>
          </div>
        </div>
      </div>
    </Layout>
  );
}
