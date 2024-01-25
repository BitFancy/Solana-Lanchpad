import { useState } from "react";
import Layout2 from "../../../Components/Layout2";
import LaunchContarctSidebar from "../../launchContarctSidebar";
import { Button } from "primereact/button";
import Link from "next/link";
import { withRouter, useRouter } from "next/router";

const LaunchPhygitalNFTs = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div>
      <Layout2 title="Launch Phygital NFts" description="">
        <div>
          <div className="flex justify-content-center">
            <div className="flex buy-img" style={{ marginTop: "100px" }}>
              <div>
                <LaunchContarctSidebar />
              </div>
              {/* ---  */}
              <div
                className="bg-blue-100 p-5"
                style={{ height: "435px", borderRadius: "10px" }}
              >
                <div className="text-center" style={{ marginTop: "35px" }}>
                  <img
                    src=""
                    style={{ width: "200px", height: "185px" }}
                    alt="garden"
                    className="buy-img"
                  ></img>
                </div>
                <div>
                  <div className="flex gap-5 p-5" style={{ marginTop: "40px" }}>
                    <div style={{ color: "black" }}>
                      <div className="font-bold text-2xl">
                        Launch Phygital NFTs
                      </div>
                      <div className="mt-2">
                        Deploy your own ERC-721 contract &
                      </div>
                      <div>launch Phygital NFTs</div>
                    </div>
                    <div>
                      <Link
                        href={{
                          pathname: "/launchPhygitalNFT",
                          query: {
                            storefrontId: router?.query?.storefrontId,
                          },
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

              {/* ---------  */}
            </div>
          </div>
        </div>
      </Layout2>
    </div>
  );
};

export default LaunchPhygitalNFTs;
