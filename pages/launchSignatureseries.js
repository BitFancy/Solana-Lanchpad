import React, { useRef, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { Messages } from "primereact/messages";
import LaunchContarctSidebar from "./launchContarctSidebar";
import { Button } from "primereact/button";
import Link from "next/link";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function LaunchSignatureseries() {
  const msgs = useRef(null);

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
        <Messages ref={msgs} />

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
                    Launch SignatureSeries
                  </div>
                  <div>Deploy your own ERC-721 contract &</div>
                  <div>launch SignatureSeries of assets</div>
                </div>
                <div>
                  <Link href='/signatureseries'>
                  <Button
                    label="Launch SignatureSeries"
                    severity="Primary"
                    rounded
                    style={{ width: "200px" }}
                    onClick={load}
                    loading={loading}
                    className="w-full"
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
