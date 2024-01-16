import { useEffect, useState, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
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
import { getAllEternulsolNfts } from "./api/eternulsolAssets";

// const client = new ApolloClient({
//   uri: "https://mumbai.testgraph.myriadflow.com/subgraphs/name/v1/u123/graphql",
//   uri: "https://flyby-router-demo.herokuapp.com/",
//   cache: new InMemoryCache(),
// });

function GetAllEternalSoulNft(props) {
  const [assetsData, setAsseetsData] = useState([]);
  const [loadingg, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
  const router = useRouter();

  const GET_LOCATIONS = gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `;

  // const GET_ASSET = gql`
  //   query assetIssueds {
  //     assetIssueds(orderBy: id) {
  //       id
  //       transactionHash
  //       blockNumber
  //       tokenID
  //       metaDataURI
  //     }
  //   }
  // `;

  const GET_ASSET = gql`
    query assetIssueds {
      assetIssueds(orderBy: id) {
        id
        transactionHash
        blockNumber
        tokenID
        metaDataURI
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_ASSET);
  // useEffect(() => {
  //   getGraphUrl();
  // }, []);

  // const APIURL =
  //   "https://mumbai.testgraph.myriadflow.com/subgraphs/name/v1/u123/graphql";
  // const client = createClient({
  //   url: APIURL,
  //   exchanges: [cacheExchange, fetchExchange],
  // });

  console.log(data);
  console.log(error);
  console.log(loading);

  const fetchthis = async () => {
    // client
    //   .query({
    //     query: gql(tokensQuery),
    //   })
    //   .then((data) => console.log("Subgraph data: ", data))
    //   .catch((err) => {
    //     console.log("Error fetching data: ", err);
    //   });
  };

  // const GET_ASSETS = gql`
  //   query assetIssueds {
  //     assetIssueds(orderBy: id) {
  //       id
  //       transactionHash
  //       blockNumber
  //       tokenID
  //       metaDataURI
  //     }
  //   }
  // `;

  // const GET_LOCATIONS = gql`
  //   query GetLocations {
  //     locations {
  //       id
  //       name
  //       description
  //       photo
  //     }
  //   }
  // `;
  // const { loading, error, data } = useQuery(GET_ASSETS);
  // const { loading, error, data } = useQuery(GET_ASSETS);

  // console.log(data);
  // useEffect(() => {
  //   getGraphUrl();
  // }, [router]);

  const contractAddress = router.query.contractAddress;
  const collectionName = router.query.collectionName;
  const storefrontId = router.query.storefrontId;

  const getGraphUrl = async () => {
    const token = localStorage.getItem("platform_token");

    axios
      .get(
        `${BASE_URL_LAUNCH}api/v1.0/storefront/get_storefront_by_id?id=${storefrontId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        console.log(response.data.payload.subgraphUrl);
        getAllEternulsolNfts();
        // getAllEternulsolNfts(response.data.payload.subgraphUrl);
      })
      .catch((error) => {
        console.log("error while storefront data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllEternulsolNfts = async (subgraphUrl) => {
    const token = localStorage.getItem("platform_token");

    // console.log(props);
    // const endPoint = subgraphUrl;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    // const AssetIssuedQuery = `{
    //     assetIssueds(orderBy: id) {
    //       id
    //       transactionHash
    //       blockNumber
    //       tokenID
    //       metaDataURI
    //       }
    //     }
    //   `;

    const AssetIssuedQuery = `{
      assetIssueds(orderBy: id) {
        id
        transactionHash
        blockNumber
        tokenID
        metaDataURI
        }
      }
    `;
    const graphqlQuery = {
      operationName: "assetIssueds",
      query: `query assetIssueds ${AssetIssuedQuery}`,
      variables: {},
    };

    try {
      const data = await axios({
        url: "https://mumbai.testgraph.myriadflow.com/subgraphs/name/v1/u123/graphql",
        method: "post",
        data: graphqlQuery,
        headers: headers,
      });
      console.log("Response NFTs", data);
      return data?.data;
    } catch (err) {
      console.log("error", err);
    }
  };

  // const getEturnulsolAssets = async () => {
  //   const endPoint = props?.router?.query?.redirectURL?.slice(
  //     0,
  //     props?.router?.query?.redirectURL?.indexOf("/graphql")
  //   );
  //   const assetIssueds = await getAllEternulsolNfts({ endPoint: endPoint });
  //   console.log(assetIssueds);
  //   setAsseetsData(assetIssueds);
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   let tranasactionHashArray = assetIssueds?.map(
  //     (asset) => asset.transactionHash
  //   );
  //   const innerContractAddress = [];
  //   setLoading(true);
  //   await Promise.all(
  //     tranasactionHashArray?.map(async (hash) => {
  //       const contractAddress = await provider.getTransaction(hash);
  //       if (contractAddress.to == testCTA) {
  //         innerContractAddress.push(
  //           assetIssueds.find((asset) => asset.transactionHash === hash)
  //         );
  //       }

  //       setAsseetsData(innerContractAddress);
  //     })
  //   ).then(() => {
  //     console.log("innerContractAddress", innerContractAddress);
  //   });
  // };
  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  // const contractAddress = props.router.query.contractAddress;

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
            <div className="flex ml-5 justify-content-around">
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
                    onClick={load}
                    label="Create EternalSoul NFT"
                  ></Button>
                </Link>
              </div>
            </div>
            <div className="border-bottom-das" style={{ width: "230%" }}></div>
            <div
              className="grid cursor-pointer"
              style={{ gap: "20px", marginLeft: "30px" }}
            >
              {assetsData?.length > 0 ? (
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
              )}
            </div>
          </div>
          <Toast ref={toast} />
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(GetAllEternalSoulNft);
