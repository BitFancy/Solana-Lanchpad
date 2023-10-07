import React, { useEffect, useState, useRef } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import Loader from "../Components/LoadingSpinner";
import { withRouter } from "next/router";
import { ethers } from "ethers";
import request, { gql } from "graphql-request";
const graphqlAPI = 'https://mumbai.testgraph.myriadflow.com/subgraphs/name/v1/hgsggsa'
function GetAllFusionSeriesNft(props) {
  const [assetsData, setAsseetsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const [contractAddress, setContractAddress] = useState(()=>props?.router?.query?.contractAddress)

 
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
     setContractAddress(props?.router?.query?.contractAddress ?? searchParams.get('contractAddress'))
     if(props?.router?.query?.contractAddress ?? searchParams.get('contractAddress')){
      getallfusionSeriesAssets()
     }
  }, [])

  const getallfusionSeriesAssets = async () => {
    try {
      setLoading(true)
        const query = gql`
        query Query($where:FusionSeriesAssetCreated_filter) {
          fusionSeriesAssetCreateds(first:100){
            id
            transactionHash
            blockNumber
            tokenID
            amount
            creator
            
             }
              }
              `;
        const result = await request(graphqlAPI, query);
        setAsseetsData(result.fusionSeriesAssetCreateds);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let tranasactionHashArray = fusionSeriesAssetCreateds?.map(
        (asset) => asset.transactionHash
      ) ?? [];
      const innerContractAddress = [];
      console.log("tranasactionHashArray",tranasactionHashArray);
      if(tranasactionHashArray.length>0){
      await Promise?.all(
        tranasactionHashArray?.map(async (hash) => {
          const gqlcontractAddress = await provider.getTransaction(hash);
          if (gqlcontractAddress.to == contractAddress) {
            innerContractAddress.push(
              fusionSeriesAssetCreateds.find((asset) => asset.transactionHash === hash)
            );
          }
          setAsseetsData(innerContractAddress);
        })
      ).then(() => {
        console.log("innerContractAddress", innerContractAddress);
      });
    }
    } catch (error) {
      console.log("Error while fetching assets",error)
      setLoading(false)
    }
  };
  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };

  return (
    <LayoutDashbord
      title="FusionSeries NFts"
      description="Used to Show All FusionSeries NFTs Details"
    >
      <div>
        <MarketplaceProfileDetails id={props.router.query.storefrontId}/>
        <div
         className="flex"
        >
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className="flex ml-5 justify-content-around">
              <div className="font-bold mt-5 text-3xl text-black ">
                FusionSeries &gt; FusionSeries 1
              </div>

              <div className="mt-5 ml-5">
                <Link
                  href={{
                    pathname: "/createFusionSeriesAssets",
                    query: { contractAddress: contractAddress,storefrontId:props.router.query.storefrontId },
                  }}
                >
                  <Button
                    className="buy-img"
                    loading={loading2}
                    onClick={load}
                    label="Create FusionSeries NFT"
                  ></Button>
                </Link>
              </div>
            </div>
            <div className="border-bottom-das" style={{width:'224%'}}></div>
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
                        pathname: "/singleFusionSeriesNFT",
                        query: { contractAddress: contractAddress ,data:JSON.stringify(asset),storefrontId:props.router.query.storefrontId },
                      }}
                    >
                      <div
                        className="col-12 lg:col-6 xl:col-3"
                        style={{ width: "285px" }}
                      >
                        <div
                          className="p-3 gap-5 back-contract mt-5"
                          style={{
                            marginBottom: "0px",
                            width: "100%",
                            height: "350px",
                            borderRadius: "20px",
                          }}
                        >
                          <div className="text-center">
                            <img
                              className="dash-img-size"
                              style={{
                                width: "200px",
                                height: "200px",
                                background: "#CFCDCD",
                              }}
                              src="garden.png"
                            ></img>
                          </div>

                          <div className="mt-5 " style={{ color: "black" }}>
                            Token Id :{" "}
                            <span style={{ color: "blue" }}>
                              <>{asset.tokenID}</>
                            </span>
                          </div>
                        
                         
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : loading ? (
                <Loader />
              ) : (
                <div className="text-2xl pb-10 font-bold text-center mt-5">
                  You haven&apos;t created any FusionSeries NFts.
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

export default withRouter(GetAllFusionSeriesNft);
