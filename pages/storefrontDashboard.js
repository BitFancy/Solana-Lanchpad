import React, { useEffect, useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import Link from "next/link";
import axios from "axios";
import Loader from "../Components/LoadingSpinner";
import { Toast } from "primereact/toast";
import { LayoutContext } from "../layout/context/layoutcontext";
import LayoutDashbord from "../Components/LayoutDashbord";
import { useAccount } from "wagmi";
import { withRouter } from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

function StorefrontDashboard(props) {
  const [storefrontData, setStorefrontData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading5] = useState(false);
  const [plan, setsetPlan] = useState(null);
  const toaste = useRef(null);
  const { layoutConfig } = useContext(LayoutContext);
  const { address } = useAccount();
  const showError = () => {
    toaste.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While get storefront data",
      life: 3000,
    });
  };
  useEffect(() => {
    getStorefrontData();
    setsetPlan(
      JSON.parse(localStorage.getItem("profiledetails"))?.plan ?? null
    );
  }, []);

  const loadsetup = () => {
    setLoadingsetup(true);

    setTimeout(() => {
      setLoadingsetup(false);
    }, 2000);
  };

  const getStorefrontData = () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/storefront`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        setLoading(true);
        if (response?.data?.length > 0) {
          setStorefrontData(
            response.data.filter((sf) => sf.walletAddress === address)
          );
        }
        setLoading(false);
      })

      .catch(() => {
        showError();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const load2 = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  const load1 = () => {
    setLoading1(true);

    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  };
  const load3 = () => {
    setLoading3(true);

    setTimeout(() => {
      setLoading3(false);
    }, 2000);
  };
  const load4 = () => {
    setLoading4(true);

    setTimeout(() => {
      setLoading4(false);
    }, 2000);
  };

  return (
    <LayoutDashbord>
      <div>
        <Toast ref={toaste} />

        <div className="overview-donut-top-back">
          <div className="text-white text-3xl font-bold">Storefronts</div>
          <div className="flex mt-2 text-center justify-content-center gap-5 align-items-center">
            <div className="text-white text-2xl">Testnet</div>
            <div>
              <img
                style={{ width: "95px", height: "65px" }}
                src="/Toggle.png"
              ></img>
            </div>
            <div className="text-white text-2xl">Mainnet</div>
          </div>
          <div className="flex justify-content-end gap-5">
            <div>
              <Link href="/addStorefront">
                <Button
                  loading={loading2}
                  className="buy-img"
                  onClick={load2}
                  rounded
                  style={{
                    background: "white",
                    color: "black",
                    padding: "10px 45px 10px 45px",
                  }}
                  label="Launch"
                ></Button>
              </Link>
            </div>
            <div>
              {plan === "basic" && (
                <Button
                  rounded
                  style={{
                    border: "1px solid white",
                    padding: "10px 45px 10px 45px",
                  }}
                  label="Upgrade"
                  className="buy-img"
                ></Button>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            layoutConfig.colorScheme === "light"
              ? "buy-back-image-storefront-dashboard"
              : "dark"
          }`}
        >
          <hr></hr>

          <div style={{ width: "85%", margin: "0 auto" }}>
            <div className="text-center">
              <div className="font-bold text-4xl p-5">
                Your storefronts in testnet
              </div>
            </div>

            <hr></hr>
            {storefrontData?.length > 0 ? (
              storefrontData.map((storefront) => {
                return (
                  <div key={1}>
                    {
                      <div className=" flex justify-content-between mt-5 align-items-center subscription-back-part ">
                        <div className="flex gap-5">
                          <div>
                            <img
                              style={{ width: "100px", height: "100px" }}
                              src={
                                storefront.image
                                  ? storefront.image
                                  : "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png"
                              }
                            ></img>
                          </div>
                          <div>
                            <div className="font-bold mt-3">
                              Name: {storefront?.name}
                            </div>
                            <div className="mt-2">
                              Blockchain : {storefront?.blockchain}
                            </div>
                            <div className="mt-2">
                              Headline : {storefront?.headline}
                            </div>
                            <div className="mt-2">
                              Description : {storefront?.description}
                            </div>
                          </div>
                        </div>
                        {storefront.deployed===false &&   <div>
                        <Link
                          href={{
                            pathname: "/step1",
                            query: { storefrontId: storefront.id },
                          }}
                        >
                          <div>
                            <Button
                              loading={loading1}
                              onClick={load1}
                              label="Setup"
                              className=" buy-back-color"
                            ></Button>
                          </div>
                        </Link>
                      </div>
              }
                      
                        {storefront.deployed===true && <div>
                          <div>
                            <Link
                              href={{
                                pathname: "/getAllSignatureseriesContract",
                                query: { storefrontId: storefront.id },
                              }}
                            >
                              <div>
                                <Button
                                  loading={loading3}
                                  onClick={load3}
                                  label="View"
                                  className=" buy-back-color"
                                ></Button>
                              </div>
                            </Link>
                          </div>
                          <div className="mt-5">
                            <Link
                              href={{
                                pathname: "/accessMasterRole",
                                query: { storefrontId: storefront.id },
                              }}
                            >
                              <div>
                                <Button
                                  loading={loading4}
                                  onClick={load4}
                                  label="Manage"
                                  className="buy-back-color"
                                ></Button>
                              </div>
                            </Link>
                          </div>
                        </div>
                        }
                      
                      </div>
                    }
                  </div>
                );
              })
            ) : loading ? (
              <Loader />
            ) : (
              <div className="text-2xl pb-10 font-bold text-center">
                You haven&apos;t created any Storefront.
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(StorefrontDashboard);
