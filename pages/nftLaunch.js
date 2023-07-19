import { Button } from "primereact/button";
import React, { useState } from "react";
import Layout from "../Components/Layout";

export default function NftLaunch() {
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);

    setTimeout(() => {
        setLoading(false);
    }, 2000);
};
  return (
    <Layout
    title="Launch NFt"
    description="This is use to show information of the launch NFT"
  >
    <div>
      <div className="flex justify-content-center" style={{ height: "340px",marginTop:'130px' }}>
        <div className="bg-blue-600 text-white p-5">
          <div className="font-bold text-2xl">Create As</div>
          <div className="flex gap-3 mt-5">
            <div>
              <img src="edition.png" alt="edition"></img>
            </div>
            <div className="edition-note">SignatureSeries</div>
          </div>
          <div className="flex gap-3 mt-5">
            <div>
              <img src="collection.png" alt="FusionSeries"></img>
            </div>
            <div className="edition-note">FusionSeries</div>
          </div>
          <div className="mt-3 ml-5">DynamicRealms</div>
          <div className="mt-3 ml-5">EternumPass</div>
          <div className="mt-3 ml-5">Phygital NFTs</div>
        </div>
        <div className="bg-blue-100 p-5">
          <div className="text-center">
            <img
              src="garden.png"
              style={{ width: "200px", height: "185px" }}
              alt="garden"
            ></img>
          </div>
          <div>
            <div className="flex mt-5 gap-5">
              <div>
                <div className="font-bold text-2xl">Launch SignatureSeries</div>
                <div>Deploy your own ERC-721 contract &</div>
                <div>launch SignatureSeries of assets</div>
              </div>
              <div>
                <Button
                  label="Launch"
                  severity="Primary"
                  rounded
                  style={{ width: "150px" }}
                  loading={loading} onClick={load} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
