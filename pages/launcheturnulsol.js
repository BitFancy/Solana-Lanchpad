import React, { useState } from "react";
import Layout from "../Components/Layout";
import LaunchContarctSidebar from "./launchContarctSidebar";
import { Button } from "primereact/button";
import Link from "next/link";
export default function LaunchEturnulsol() {
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <Layout >
      <div className="buy-back-image">

        <div className="flex justify-content-center" style={{marginTop:'100px'}}>
          <div>
            <LaunchContarctSidebar />
          </div>

          <div className="bg-blue-100 p-5" style={{ height: "360px" }}>
            <div className="text-center">
              <img
                src="garden.png"
                style={{ width: "200px", height: "185px" }}
                alt="garden"
              ></img>
            </div>
            <div>
              <div className="flex mt-5 gap-5 p-5">
                <div>
                  <div className="font-bold text-2xl">
                    Launch EternalSoul
                  </div>
                  <div>Deploy your own ERC-721 contract &</div>
                  <div>launch EternalSoul of assets</div>
                </div>
                <div>
                  <Link href='/eturnalsol'>
                  <Button
                    label="Launch EternalSoul"
                    severity="Primary"
                    rounded
                    style={{ width: "200px" }}
                    loading={loading}
                    onClick={load}
                  />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
