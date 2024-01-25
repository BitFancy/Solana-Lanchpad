import { useEffect, useRef, useState } from "react";
import Sidemenu from "../../sidemenu";
import axios from "axios";
import LayoutDashbord from "../../../Components/LayoutDashbord";
import MarketplaceProfileDetails from "../../marketplaceProfileDetails";
import { useRouter } from "next/router";
import Loader from "../../../Components/LoadingSpinner";
import Link from "next/link";

const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

const PhygitalNFTCollections = () => {
  const [contractData, setContarctData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getcontractById();
  }, [router]);

  const getcontractById = () => {
    const token = localStorage.getItem("platform_token");

    axios
      .get(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts/${router.query.storefrontId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        setLoading(true);
        if (response?.data?.length > 0) {
          setContarctData(response.data);
          console.log("here", contractData);
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
  console.log("here", contractData);
  return (
    <LayoutDashbord
      title=""
      description="Used to Show All Phygital Collection Details"
    >
      <MarketplaceProfileDetails id={router.query.storefrontId} />

      <div className="flex">
        <div>
          <Sidemenu />
        </div>
        <div>
          {/* --------Phygital------------  */}
          <div className="font-bold mt-5 mb-4 text-3xl text-black ml-5">
            Phygital Collections
          </div>
          <div
            className="grid cursor-pointer"
            style={{ gap: "20px", marginLeft: "30px" }}
          >
            {/* ----------------------  */}

            {contractData?.length > 0 ? (
              contractData
                .filter((cd) => cd.contractName === "Phygital")
                .map((contract) => {
                  return (
                    <Link
                      style={{ color: "black" }}
                      key={contract.contractAddress}
                      href={{
                        pathname: "/getAllEturnalsolNft",
                        // pathname: "/nfts/eternal-soul",

                        query: {
                          collectionName: contract.collectionName,
                          contractAddress: contract.contractAddress,
                          storefrontId: router.query.storefrontId,
                          //   redirectURL: router.query.redirectURL,
                        },
                      }}
                    >
                      <div
                        className="col-12 lg:col-6 xl:col-3 mt-5"
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
                              alt={contract.collectionName}
                              src={`https://ipfs.io/ipfs/${contract.thumbnail.slice(
                                7
                              )}`}
                              loading="lazy"
                            />
                          </div>
                          <div className="mt-2">
                            <b>{contract.collectionName}</b>
                          </div>
                          {/* <div>
                            <>{contract.contractName}</>
                          </div> */}
                        </div>
                      </div>
                    </Link>
                  );
                })
            ) : loading ? (
              <Loader />
            ) : (
              <div className="text-2xl pb-10 font-bold text-center mt-5">
                You haven&apos;t created any Phygital Collection in this
                storefront.
              </div>
            )}

            {/* ---------------  */}
          </div>
          {/* ---------Phygital A--------------------  */}
          <div className="font-bold mt-8 mb-4 text-3xl text-black ml-5">
            Phygital-A Collections
          </div>
          <div
            className="grid cursor-pointer"
            style={{ gap: "20px", marginLeft: "30px" }}
          >
            {/* ----------------------  */}

            {contractData?.length > 0 ? (
              contractData
                .filter((cd) => cd.contractName === "PhygitalA")
                .map((contract) => {
                  return (
                    <Link
                      style={{ color: "black" }}
                      key={contract.contractAddress}
                      href={{
                        pathname: "/getAllEturnalsolNft",
                        // pathname: "/nfts/eternal-soul",

                        query: {
                          collectionName: contract.collectionName,
                          contractAddress: contract.contractAddress,
                          storefrontId: router.query.storefrontId,
                          //   redirectURL: router.query.redirectURL,
                        },
                      }}
                    >
                      <div
                        className="col-12 lg:col-6 xl:col-3 mt-5"
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
                              alt={contract.collectionName}
                              src={`https://ipfs.io/ipfs/${contract.thumbnail.slice(
                                7
                              )}`}
                              loading="lazy"
                            />
                          </div>
                          <div className="mt-2">
                            <b>{contract.collectionName}</b>
                          </div>
                          {/* <div>
                            <>{contract.contractName}</>
                          </div> */}
                        </div>
                      </div>
                    </Link>
                  );
                })
            ) : loading ? (
              <Loader />
            ) : (
              <div className="text-2xl pb-10 font-bold text-center mt-5">
                You haven&apos;t created any Phygital-A Collection in this
                storefront.
              </div>
            )}

            {/* ---------------  */}
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
};

export default PhygitalNFTCollections;
