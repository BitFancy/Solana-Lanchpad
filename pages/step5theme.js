import Image from "next/image";
import React from "react";
import Layout from "../Components/Layout";

export default function Step5theme() {
  return (
    <Layout
      title="Theme page"
      description="Used to select theme of the metavers"
    >
      <div>
        <div className=" p-5 font-bold">Step 5 : Choose a metaverse theme </div>
        <div className="flex justify-content-around mt-5 font-bold">
          <div>museum</div>
          <div>Garden</div>
          <div>Showroom</div>
          <div>Live Show</div>
        </div>
        <div className="flex justify-content-around mt-5 gap-5">
          <div>
            <img src="./musium.png" />
          </div>
          <div>
            <img src="./garden.png" />
          </div>
          <div>
            <img src="./showroom.png" />
          </div>
          <div>
            <img src="./live.png" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
