import React, { useContext, useState } from "react";
import Layout from "../Components/Layout";
import LaunchContarctSidebar from "./launchContarctSidebar";
import { Button } from "primereact/button";
import Link from "next/link";
import { LayoutContext } from "../layout/context/layoutcontext";

export default function LaunchSignatureseries() {
  const [loading, setLoading] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);

  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <Layout title="Deploy SignatureSeries"
    description="This is use to show information of the deploy signatureSeries contract">
      <div>
        <div className={`${layoutConfig.colorScheme === 'light' ? 'buy-back-image' : 'dark'}`}>
          <div className="flex justify-content-center">
            <div className="flex buy-img" style={{ marginTop: "100px" }}>
              <div>
                <LaunchContarctSidebar />
              </div>

              <div className="bg-blue-100 p-5" style={{ height: "435px",borderRadius:'10px' }}>
                <div className="text-center">
                  <img
                    src="garden.png"
                    style={{ width: "200px", height: "185px" }}
                    alt="garden"
                    className="buy-img"

                  ></img>
                </div>
                <div>
                  <div className="flex gap-5 p-5" style={{marginTop:'75px'}}>
                    <div>
                      <div className="font-bold text-2xl">
                        Launch SignatureSeries
                      </div>
                      <div>Deploy your own ERC-721 contract &</div>
                      <div>launch SignatureSeries of assets</div>
                    </div>
                    <div>
                      <Link href="/signatureseries">
                        <Button
                          label="Launch"
                          severity="Primary"
                          rounded
                          style={{ width: "200px" }}
                          onClick={load}
                          loading={loading}
                          className=" buy-img"

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
