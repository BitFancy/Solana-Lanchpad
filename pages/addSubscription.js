import React, { useState } from "react";
import Layout from "../Components/Layout";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function AddSubscription() {
    const [loading, setLoading] = useState(false);
    const load = () => {
      setLoading(true);
  
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };

  return (
    <Layout>
      <div className="buy-back-image" style={{ marginTop: "100px" }}>
        <div className="font-bold text-3xl p-5">Add subscription Details</div>
        <hr></hr>
        <div className="flex gap-5 p-5">
          <div className="select-file-image">
            <div>
              <input
                type="file"
                accept="image/png, image/jpeg,.txt,.doc,video/mp4,audio/mpeg,.pdf"
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className="font-bold">Tradehub Name:</div>
            <InputText className="w-full input-back mt-2" />
            <div className="mt-5 font-bold">Account ID:</div>
            <InputText className="w-full input-back mt-2" />
            <div className="mt-5 font-bold">Plan:</div>
            <InputText className="w-full input-back mt-2" />
            <div className="mt-5 ">
              <Button loading={loading} onClick={load} label="Add Subscription"></Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
