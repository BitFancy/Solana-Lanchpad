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
import { getAllSignetureseriesNfts } from "./api/signetureseriesAssets";
function GetAllPhygitalNfts(props) {
  // const [assetsData, setAsseetsData] = useState([]);
  const [myAssets, setMyAssets] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const router = useRouter();
  const contractAddress = router.query.contractAddress;
  const collectionName = router.query.collectionName;

  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };

  useEffect(() => {
    getdata();
  }, [router]);
  console.log(router);
  async function getdata() {
    const storefrontName = localStorage.getItem("selectedStorefront");
    const headers = {
      "content-type": "application/json",
    };
    const requestBody = {
      query: `
        query phygitalAssetCreateds {
          phygitalAssetCreateds(orderBy: tokenID) {
         metaDataURI
         id
         creator
          }
        }
      `,
    };
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    };
    const response = await fetch(
      `https://mumbai.testgraph.myriadflow.com/subgraphs/name/${storefrontName}/${contractAddress}`,
      options
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((jsn) => {
        console.log(jsn?.data?.phygitalAssetCreateds);
        if (!!jsn?.data?.phygitalAssetCreateds) {
          fetchURIData(jsn?.data?.phygitalAssetCreateds);
        }
      });
  }

  const fetchURIData = async (data) => {
    try {
      const responses = await Promise?.all(
        data?.map(async (item) => {
          let metaDataURI = item.metaDataURI;
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

  if (myAssets === undefined) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <LayoutDashbord
      title="Phygital NFts"
      description="Used to Show All Phygital NFTs Details"
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
                Phygital Collection &gt; {collectionName}
              </div>

              <div className="mt-5 ml-5">
                <Link
                  href={{
                    pathname: "/createPhygitalNFTAsset",
                    query: {
                      contractAddress: contractAddress,
                      storefrontId: props.router.query.storefrontId,
                      collectionName: props.router.query.collectionName,
                    },
                  }}
                >
                  <Button
                    className="buy-img"
                    loading={loading2}
                    onClick={load}
                    label="Create Phygital NFT"
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
                myAssets.map((asset) => (
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
                          src={`https://nftstorage.link/ipfs/${asset.image.slice(
                            7
                          )}`}
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
                ))
              ) : (
                <div
                  className="text-2xl pb-10 font-bold"
                  style={{ marginTop: "50px" }}
                >
                  You haven&apos;t created any Phygital NFts Under this
                  Contract.
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

export default withRouter(GetAllPhygitalNfts);
