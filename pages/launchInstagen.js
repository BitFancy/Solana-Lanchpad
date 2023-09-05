import React, { useState } from "react";
import Layout from "../Components/Layout";
import LaunchContarctSidebar from "./launchContarctSidebar";
import { Button } from "primereact/button";
import Link from "next/link";
export default function LaunchInstagen() {
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <Layout title="Deploy InstaGen"
    description="This is use to show information of the deploy InstaGen contract">
      <div>
      <div className="buy-back-image" >

        <div className="flex justify-content-center">
        <div className="flex  buy-img" style={{ marginTop: "100px" }}>
          <div>
            <LaunchContarctSidebar />
          </div>

          <div className="bg-blue-100 p-5" style={{ height: "435px",borderRadius:'10px' }}>
            <div className="text-center">
              <img
                src="garden.png"
                style={{ width: "200px", height: "185px" }}
                alt="garden"
                className="buy-img "

              ></img>
            </div>
            <div>
              <div className="flex gap-5 p-5" style={{marginTop:'75px'}}>
                <div>
                  <div className="font-bold text-2xl">
                    Launch InstaGen
                  </div>
                  <div>Deploy your own ERC-721 contract &</div>
                  <div>launch InstaGen of assets</div>
                </div>
                <div>
                  <Link href='/instagen'>
                  <Button
                    label="Launch"
                    severity="Primary"
                    className="buy-img"
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
      </div>
      </div>
    </Layout>
  );
}
