import React, { useEffect, useState, useRef } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import Loader from "../Components/LoadingSpinner";
import { withRouter, useRouter } from "next/router";
import { ethers } from "ethers";
import Homecomp from "../Components/HomeCompo";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

// Shilpa -> no idea about next line ?
import { getAllSignetureseriesNfts } from "./api/signetureseriesAssets";

function GetAllDropsNft(props) {
  // const [assetsData, setAsseetsData] = useState([]);
  const [myAssets, setMyAssets] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const router = useRouter();
  const contractAddress = router.query.contractAddress;
  const collectionName = router.query.collectionName;
  const storefrontId = router.query.storefrontId;

  // const [contractAddress, setContractAddress] = useState(
  //   () => props?.router?.query?.contractAddress
  // );
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(document.location.search);
  //   setContractAddress(
  //     props?.router?.query?.contractAddress ??
  //       searchParams.get("contractAddress")
  //   );
  //   if (
  //     props?.router?.query?.contractAddress ??
  //     searchParams.get("contractAddress")
  //   ) {
  //     getSignetureSeriesAssets();
  //   }
  // }, []);

  // const getSignetureSeriesAssets = async () => {
  //   try {
  //     const endPoint = props?.router?.query?.redirectURL?.slice(
  //       0,
  //       props?.router?.query?.redirectURL?.indexOf("/graphql")
  //     );
  //     const { signatureSeriesAssetCreateds } = await getAllSignetureseriesNfts({
  //       endPoint: endPoint,
  //     });
  //     setAsseetsData(signatureSeriesAssetCreateds);
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     let tranasactionHashArray =
  //       signatureSeriesAssetCreateds?.map((asset) => asset.transactionHash) ??
  //       [];
  //     const innerContractAddress = [];
  //     if (tranasactionHashArray.length > 0) {
  //       await Promise?.all(
  //         tranasactionHashArray?.map(async (hash) => {
  //           const gqlcontractAddress = await provider.getTransaction(hash);
  //           if (gqlcontractAddress.to == contractAddress) {
  //             innerContractAddress.push(
  //               signatureSeriesAssetCreateds.find(
  //                 (asset) => asset.transactionHash === hash
  //               )
  //             );
  //           }
  //           setAsseetsData(innerContractAddress);
  //         })
  //       ).then(() => {
  //         console.log("innerContractAddress", innerContractAddress);
  //       });
  //     }
  //   } catch (error) {
  //     console.log("Error while fetching assets", error);
  //     setLoading(false);
  //   }
  // };

  // const load = () => {
  //   setLoading2(true);

  //   setTimeout(() => {
  //     setLoading2(false);
  //   }, 2000);
  // };

  useEffect(() => {
    getdata();
  }, [router]);

  /**
   * Shilpa -> No idea about this function
   */
  async function getdata() {
    const storefrontName = localStorage.getItem("selectedStorefront");
    const token = localStorage.getItem("platform_token");
    console.log("here", contractAddress);
    if (contractAddress == undefined || storefrontId == undefined) {
      console.log("returned");
      return;
    }
    const response = axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/delegateAssetCreation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          contractAddress: contractAddress,
          storefrontId: storefrontId,
        },
      })
      .then((res) => {
        if (!!res.data.payload) {
          fetchURIData(res.data.payload);
        }
      });
  }

  const fetchURIData = async (data) => {
    try {
      const responses = await Promise?.all(
        data?.map(async (item) => {
          let metaDataURI = item.metaDataHash;
          if (metaDataURI.startsWith("ipfs://")) {
            metaDataURI = metaDataURI.substring("ipfs://".length);
          }
          const response = await axios.get(
            `https://nftstorage.link/ipfs/${metaDataURI}`
          );
          return response.data;
        })
      );
      console.log(responses);
      setMyAssets(responses);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  // if (!myAssets) {
  //   return (
  //     <>
  //       <Loader />
  //     </>
  //   );
  // }

  console.log("contractAddress>>>>", contractAddress);
  return (
    <LayoutDashbord
      title="Drops NFts"
      description="Used to Show All Drops NFTs Details"
    >
      <div>
        <MarketplaceProfileDetails id={props.router.query.storefrontId} />
        <div className="flex">
          <div>
            <Sidemenu />
          </div>

          <div>
            <div className="flex ml-5 justify-content-around gap-5">
              <div className="font-bold mt-5 text-3xl text-black ">
                Drops &gt; {collectionName}
              </div>

              <div className="mt-5 ml-5">
                <Link
                  href={{
                    pathname: "/createDropsAssets",
                    query: {
                      contractAddress: contractAddress,
                      storefrontId: props.router.query.storefrontId,
                    },
                  }}
                >
                  <Button
                    className="buy-img"
                    // loading={loading2}
                    // onClick={load}
                    label="Create Drops NFT"
                  ></Button>
                </Link>
              </div>
            </div>
            <div
              className="border-bottom-das"
              style={{ width: "87%", right: "-43px", position: "absolute" }}
            ></div>
            <div
              className="grid cursor-pointer mt-5"
              style={{ gap: "20px", marginLeft: "30px" }}
            >
              {myAssets?.length > 0 ? (
                myAssets.map((asset) => {
                  return (
                    <Link
                      style={{ color: "black" }}
                      key={asset.tokenID}
                      // href={{
                      //   pathname: "/singleSignatureSeriesNFT",
                      //   query: {
                      //     contractAddress: contractAddress,
                      //     data: JSON.stringify(asset),
                      //     storefrontId: props.router.query.storefrontId,
                      //   },
                      // }}
                      href={"#"}
                    >
                      <div
                        // className="col-12 lg:col-6 xl:col-3 py-4 px-6"
                        className="col-12 lg:col-6 xl:col-3   mt-5"
                        style={{
                          width: "240px",
                          border: "1px solid",
                          padding: "8px 10px",
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
                            alt={asset.name}
                            src={`https://ipfs.io/ipfs/${asset.image.slice(7)}`}
                            loading="lazy"
                          />
                        </div>
                        <div className="mt-2">
                          <b>{asset.name}</b>
                        </div>
                        <div className="mt-1">
                          <p>{asset.price} MATIC</p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div
                  className="text-2xl pb-10 font-bold"
                  style={{ marginTop: "50px" }}
                >
                  You haven&apos;t created any Drops NFts Under this Contract.
                </div>
              )}
            </div>
          </div>

          <Toast ref={toast} />
        </div>
      </div>
    </LayoutDashbord>
  );
}

export default withRouter(GetAllDropsNft);
