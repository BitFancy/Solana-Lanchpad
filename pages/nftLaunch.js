import { Button } from "primereact/button";
import React from "react";
import Layout from "../Components/Layout";

export default function NftLaunch() {
  return (
    <Layout
    title="Launch NFt"
    description="This is use to show information of the launch NFT"
  >
    <div>
      <div className="flex justify-content-center" style={{ height: "340px" }}>
        <div className="bg-blue-600 text-white p-5">
          <div className="font-bold text-2xl">Create As</div>
          <div className="flex gap-3 mt-5">
            <div>
              <img src="edition.png" alt="edition"></img>
            </div>
            <div className="edition-note">Edition</div>
          </div>
          <div className="flex gap-3 mt-5">
            <div>
              <img src="collection.png" alt="collection"></img>
            </div>
            <div className="edition-note">Collection</div>
          </div>
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
                <div className="font-bold text-2xl">Launch Edition</div>
                <div>Deploy your own ERC-721 contract &</div>
                <div>launch edition of assets</div>
              </div>
              <div>
                <Button
                  label="Launch"
                  severity="Primary"
                  rounded
                  style={{ width: "150px" }}
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
