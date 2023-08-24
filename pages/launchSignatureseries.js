import React, { useState } from "react";
import Layout from "../Components/Layout";
import LaunchContarctSidebar from "./launchContarctSidebar";
import { Button } from "primereact/button";
import Link from "next/link";

export default function LaunchSignatureseries() {
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <Layout>
      <div>
        <div className="buy-back-image">
          <div className="flex justify-content-center">
            <div className="flex card" style={{ marginTop: "100px" }}>
              <div>
                <LaunchContarctSidebar />
              </div>

              <div className="bg-blue-100 p-5" style={{ height: "360px" }}>
                <div className="text-center">
                  <img
                    src="garden.png"
                    style={{ width: "200px", height: "185px" }}
                    alt="garden"
                    className="buy-img card"

                  ></img>
                </div>
                <div>
                  <div className="flex mt-5 gap-5 p-5">
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
                          label="Launch SignatureSeries"
                          severity="Primary"
                          rounded
                          style={{ width: "200px" }}
                          onClick={load}
                          loading={loading}
                          className="w-full buy-img"
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
