import React, { useContext, useState } from "react";
import LaunchContarctSidebar from "./launchContarctSidebar";
import { Button } from "primereact/button";
import Link from "next/link";
import { LayoutContext } from "../layout/context/layoutcontext";
import Layout2 from "../Components/Layout2";
import { withRouter } from "next/router";
 function LaunchSignatureseries(props) {
  const [loading, setLoading] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <Layout2 title="Deploy SignatureSeries"
    description="This is use to show information of the deploy signatureSeries contract">
      <div>
        <div >
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
                    <div style={{color:'black'}}>
                      <div className="font-bold text-2xl">
                        Launch SignatureSeries
                      </div>
                      <div className="mt-2">Deploy your own ERC-721 contract &</div>
                      <div>launch SignatureSeries of assets</div>
                    </div>
                    <div>
                      <Link 
                        href={{
                          pathname: "/signatureseries",
                          query: { storefrontId: props?.router?.query?.storefrontId},
                        }}
                      >
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
    </Layout2>
  );
}
export default withRouter(LaunchSignatureseries)