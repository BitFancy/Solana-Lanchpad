import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import Link from "next/link";
import axios from "axios";
import Loader from "../Components/LoadingSpinner";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { useAccount } from "wagmi";
import { withRouter } from "next/router";
import ReactSwitch from "react-switch";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
function StorefrontDashboard(props) {
  const [storefrontData, setStorefrontData] = useState([]);
  const [isDeploymentLoading, setIsDeploymentLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [checked, setChecked] = useState(false);
  const [network, setNetwork] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const toaste = useRef(null);
  const { address } = useAccount();
  useEffect(() => {
    getStorefrontData();
  }, []);

  const handleChange = (val) => {
    setChecked(val);
    const networkData = [...network];
    if (val) {
      setStorefrontData(networkData.filter((sf) => sf.network === "mainnet"));
    } else {
      setStorefrontData(networkData.filter((sf) => sf.network === "testnet"));
    }
  };
  const deployStorefrontGraph = (storefrontData) => {
    const token = localStorage.getItem("platform_token");
    console.log(storefrontData);
    setIsDeploymentLoading(true);

    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/storefront/deploy`,
        {
          name: storefrontData.name,
          id: storefrontData.id,
          tag: "v1",
          headline: storefrontData.headline,
          description: storefrontData.description,
          profileImage: storefrontData.profileimage,
          storefrontImage: "ipfs://",
          personalTagline: "personalTagline",
          personalDescription: "personalDescription",
          relevantImage: "ipfs://",
          mailId: "mailId",
          twitter: "twitter",
          discord: "discord",
          instagram: "instagram",
          region: "us01",
          type: "marketplace",
          category: "nft",
          tags: "digital store",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        console.log("deployment", response);
        if (response.status === 200) {
          alert(response.data.message);
          location.reload;
        }
      })
      .catch((error) => {
        alert("Error while deploying Storefront", error);
      })
      .finally(() => {
        setIsDeploymentLoading(false);
      });
  };

  const getStorefrontData = () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/storefront/myStorefronts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (payload) => {
        setLoading(true);

        if (payload?.data?.payload.length > 0) {
          setStorefrontData(
            payload?.data?.payload.filter((sf) => sf.walletAddress === address)
          );

          setNetwork(
            payload?.data?.payload.filter((sf) => sf.network === "testnet")
          );
        }
        setLoading(false);
      })

      .catch((error) => {
        console.log("error while storefront data", error);
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
  console.log(storefrontData);
  return (
    <LayoutDashbord>
      <div>
        <Toast ref={toaste} />

        <div className="backstore flex justify-content-between p-5">
          {/* <div className="text-white text-3xl font-bold ml-5 ">  */}
          <div className="mt-5 text-white text-3xl font-bold">Storefronts</div>
          {/* </div>  */}
          {/* <div className="flex mt-2 text-center justify-content-center gap-5 align-items-center">  */}
          {/* <div>
            <div className="text-white text-2xl">Testnet</div>
          </div> */}

          {/* </div>   */}
          <div className="mt-3">
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

            {/* <div>
              {plan === "basic" && (
                <Link 
                href={{
                  pathname: "/buySubscription",
                  query: { storefrontId: props?.router?.query?.storefrontId },
                }}
              >
            <Button
                  rounded
                  style={{
                    border: "1px solid white",
                    padding: "10px 45px 10px 45px",
                  }}
                  label="Upgrade"
                  className="buy-img"
                ></Button>

              </Link>
              )}
            </div> */}
          </div>
        </div>
        <div>
          {storefrontData[0]?.network === "testnet" && (
            <div className="text-center">
              <div className="font-bold text-4xl p-5">
                Your storefronts in Testnet
              </div>
            </div>
          )}
          {storefrontData[0]?.network === "mainnet" && (
            <div className="text-center">
              <div className="font-bold text-4xl p-5">
                Your storefronts in Mainnet
              </div>
            </div>
          )}

          <div style={{ width: "85%", margin: "0 auto" }}>
            <hr></hr>
            {storefrontData?.length > 0 ? (
              storefrontData.map((storefront, index) => {
                return (
                  <div key={storefront.id}>
                    {
                      <div className=" flex justify-content-between mt-5 align-items-center subscription-back-part ">
                        <div className="flex gap-5">
                          <div>
                            <img
                              style={{ width: "100px", height: "100px" }}
                              src={
                                storefront.image
                                  ? storefront.image
                                  : "storefront.png"
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

                        <Link
                          href={{
                            pathname: "/contracts/eternal-soul-collections",
                            query: { storefrontId: storefront.id },
                          }}
                        >
                          <div>
                            <Button
                              // loading={loading1}
                              // onClick={load1}
                              onClick={() => {
                                localStorage.setItem(
                                  "selectedStorefront",
                                  storefront.name
                                );
                              }}
                              label="Manage"
                              className="buy-back-color"
                            ></Button>
                          </div>
                        </Link>

                        {storefront.deployed === false && (
                          <div>
                            <div>
                              <Button
                                loading={
                                  isDeploymentLoading &&
                                  index === selectedIndex &&
                                  isDeploymentLoading
                                }
                                disabled={
                                  isDeploymentLoading &&
                                  index === selectedIndex &&
                                  isDeploymentLoading
                                }
                                onClick={() => {
                                  deployStorefrontGraph(storefront);
                                  setSelectedIndex(index);
                                }}
                                label={
                                  isDeploymentLoading && index === selectedIndex
                                    ? "Deploying"
                                    : "Deploy"
                                }
                                className=" buy-back-color"
                              ></Button>

                              <Link
                                href={{
                                  pathname:
                                    "/contracts/eternal-soul-collections",
                                  query: { storefrontId: storefront.id },
                                }}
                              >
                                <div>
                                  <Button
                                    onClick={() => {
                                      localStorage.setItem(
                                        "selectedStorefront",
                                        storefront.name
                                      );
                                    }}
                                    label="Manage"
                                    className="buy-back-color"
                                  ></Button>
                                </div>
                              </Link>
                              {/* -------------------  */}
                            </div>
                          </div>
                        )}
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

// <div>
//   <Button
//     loading={
//       isDeploymentLoading &&
//       index === selectedIndex &&
//       isDeploymentLoading
//     }
//     disabled={
//       isDeploymentLoading &&
//       index === selectedIndex &&
//       isDeploymentLoading
//     }
//     onClick={() => {
//       deployStorefrontGraph(storefront);
//       setSelectedIndex(index);
//     }}
//     label={
//       isDeploymentLoading && index === selectedIndex
//         ? "Redeploying"
//         : "Redeploy"
//     }
//     className=" buy-back-color"
//   ></Button>

//   {/* ------------------  */}
//   <Link
//     href={{
//       pathname: "/contracts/eternal-soul-collections",
//       query: { storefrontId: storefront.id },
//     }}
//   >
//     <div>
//       <Button
//         // loading={loading1}
//         // onClick={load1}
//         onClick={() => {
//           localStorage.setItem(
//             "selectedStorefront",
//             storefront.name
//           );
//         }}
//         label="Manage"
//         className="buy-back-color"
//       ></Button>
//     </div>
//   </Link>
// </div>
// <div>
//   <div>
//     <Link
//       target="_blank"
//       href={{
//         pathname: `https://${storefront.webappUrl}`,
//       }}
//     >
//       <Button
//         loading={loading3}
//         onClick={load3}
//         label="View"
//         className=" buy-back-color"
//       ></Button>
//     </Link>
//   </div>
//   <div className="mt-5">
//     <Link
//       href={{
//         pathname: "/overview",
//         query: {
//           storefrontId: storefront.id,
//           redirectURL: storefront.subgraphUrl,
//         },
//       }}
//     >
//       <div>
//         <Button
//           loading={loading4}
//           onClick={load4}
//           label="Manage"
//           className="buy-back-color"
//         ></Button>
//       </div>
//     </Link>
//   </div>
// </div>
