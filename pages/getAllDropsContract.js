import React, { useEffect, useState, useRef } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Loader from "../Components/LoadingSpinner";
import Link from "next/link";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { withRouter } from "next/router";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

/**
 * Shilpa -> line 80, No idea from where this line(cd.contractName === "SignatureSeries") is coming from
 */

function GetAllDropsContract(props) {
  const [contractData, setContractData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  useEffect(() => {
    getallDropsContract();
  }, []);
  console.log("props in sig con", props.router.query.redirectURL);

  /**
   * Shilpa -> No idea abot this function (line 43)
   */
  const getallDropsContract = () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts/${props.router.query.storefrontId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        setLoading(true);
        if (response?.data?.length > 0) {
          setContractData(
            response.data.filter(
              (sf) => sf.contractName === "SignatureSeries" && sf.drops === true
            )
          );
        }
        setLoading(false);
      })

      .catch((error) => {
        console.log("error while get contract by id", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(contractData);
  return (
    <LayoutDashbord
      title="Drops Contarct"
      description="Used to Show All Drops Contarct Details"
    >
      <h1>Hello world</h1>
      <div>
        <MarketplaceProfileDetails id={props.router.query.storefrontId} />
        <Toast ref={toast} />

        <div className="flex">
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className="font-bold mt-5 ml-5  text-3xl text-black">
              Drops Collections
            </div>
            <div className="border-bottom-das" style={{ width: "136%" }}></div>

            <div
              className="grid cursor-pointer"
              style={{ gap: "20px", marginLeft: "30px" }}
            >
              {contractData?.length > 0 ? (
                contractData
                  .filter((cd) => cd.contractName === "SignatureSeries")
                  .map((contract) => {
                    return (
                      <Link
                        style={{ color: "black" }}
                        key={1}
                        href={{
                          pathname: "/getAllDropsNFT",
                          query: {
                            contractAddress: contract.contractAddress,
                            storefrontId: props.router.query.storefrontId,
                            collectionName: contract.collectionName,
                            // redirectURL: props.router.query.redirectURL,
                          },
                        }}
                      >
                        <div
                          className="col-12 lg:col-6 xl:col-3   mt-5"
                          style={{ width: "285px" }}
                        >
                          <div
                            className="p-5"
                            style={{
                              border: "1px solid",
                            }}
                          >
                            <div className="text-center">
                              <img
                                className="dash-img-size"
                                style={{
                                  width: "200px",
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                                src={`https://nftstorage.link/ipfs/${contract.thumbnail.slice(
                                  7
                                )}`}
                                loading="lazy"
                              />
                            </div>
                            <div className="mt-3">
                              <b>{contract.collectionName}</b>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
              ) : (
                <div className="text-2xl pb-10 font-bold text-center mt-5">
                  You haven&apos;t created any Drops Contract Under this
                  storefront.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}

export default withRouter(GetAllDropsContract);
