import { useEffect, useState, useRef } from "react";
// import { useQuery, gql } from "@apollo/client";
import { request, gql } from "graphql-request";

// import { createClient, cacheExchange, fetchExchange } from "urql";
// import { createClient, cacheExchange, fetchExchange } from '@urql/core'
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import Loader from "../Components/LoadingSpinner";
import { ethers } from "ethers";
import { withRouter, useRouter } from "next/router";
import Homecomp from "../Components/HomeCompo";
import axios from "axios";
import { getAllEternalsolNfts } from "./api/eternulsolAssets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

// const client = new ApolloClient({
//   uri: "https://mumbai.testgraph.myriadflow.com/subgraphs/name/v1/u123/graphql",
//   uri: "https://flyby-router-demo.herokuapp.com/",
//   cache: new InMemoryCache(),
// });

function GetAllEternalSoulNft(props) {
  const [myAssets, setMyAssets] = useState();

  const [loadingg, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
  const router = useRouter();
  const contractAddress = router.query.contractAddress;
  const collectionName = router.query.collectionName;

  useEffect(() => {
    getdata();
  }, [router]);
  async function getdata() {
    const storefrontName = localStorage.getItem("selectedStorefront");
    const headers = {
      "content-type": "application/json",
    };
    const requestBody = {
      query: `
        query assetIssueds {
          assetIssueds(orderBy: tokenID) {
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
        console.log(jsn?.data?.assetIssueds);
        if (!!jsn?.data?.assetIssueds) {
          fetchURIData(jsn?.data?.assetIssueds);
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

  const truncateHex = (hexString, length) => {
    const prefix = hexString.slice(0, 4);
    const suffix = hexString.slice(-length);
    return `${prefix}...${suffix}`;
  };

  if (!myAssets) {
    return (
      <>
        <Loader />
      </>
    );
  }
  // console.log(myAssets);
  return (
    <LayoutDashbord
      title="EternalSoul NFts"
      description="Used to Show All EternalSoul NFTs Details"
    >
      <div>
        <MarketplaceProfileDetails id={props.router.query.storefrontId} />
        <div className="flex">
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className="flex px-4 justify-content-between">
              <div className="font-bold mt-5 text-3xl text-black ">
                {props.router.query.collectionName}
                {/* &gt; EternalSoul 1  */}
              </div>

              <div className="mt-5 ml-5">
                <Link
                  href={{
                    pathname: "/createEternulsolAssets",
                    query: {
                      contractAddress: contractAddress,
                      collectionName: collectionName,
                    },
                  }}
                >
                  <Button
                    className="buy-img"
                    loading={loading2}
                    // onClick={load}
                    label="Create EternalSoul NFT"
                  ></Button>
                </Link>
              </div>
            </div>
            <div className="border-bottom-das" style={{ width: "230%" }}></div>
            <div
              className="grid cursor-pointer"
              style={{ gap: "40px", marginLeft: "60px", marginTop: "40px" }}
            >
              {!!myAssets && myAssets?.length === 0 ? (
                <div className="text-2xl pb-10 font-bold text-center mt-5">
                  You haven&apos;t created any NFTs in{" "}
                  {props.router.query.collectionName}.
                </div>
              ) : (
                myAssets?.map((asset) => (
                  <div key={asset.id}>
                    <img
                      className="dash-img-size"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      alt={asset.tokenID}
                      src={`https://ipfs.io/ipfs/${asset.image.slice(7)}`}
                      loading="lazy"
                    />
                    <div>
                      <b>{asset.name}</b>
                    </div>

                    <div className="text-bold">{asset.description}</div>
                    <div className="text-bold">
                      Issued to:{" "}
                      <span>{truncateHex(asset.walletAddress, 6)}</span>
                    </div>
                  </div>
                ))
              )}

              {/* {assetsData?.length > 0 ? (
                assetsData.map((asset) => {
                  return (
                    <Link
                      key={1}
                      href={{
                        pathname: "/singleEturnalsolNFT",
                        query: {
                          contractAddress: contractAddress,
                          data: JSON.stringify(asset),
                          storefrontId: props.router.query.storefrontId,
                        },
                      }}
                    >
                      <div
                        className="col-12 lg:col-6 xl:col-3"
                        style={{ width: "285px" }}
                      >
                        <Homecomp uri={asset ? asset.metaDataURI : ""} />
                      </div>
                    </Link>
                  );
                })
              ) : loadingg ? (
                <Loader />
              ) : (
                <div className="text-2xl pb-10 font-bold text-center mt-5">
                  You haven&apos;t created any NFTs in{" "}
                  {props.router.query.collectionName}.
                </div>
              )} */}
            </div>
          </div>
          <Toast ref={toast} />
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(GetAllEternalSoulNft);
