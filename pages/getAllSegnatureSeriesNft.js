import React, { useEffect, useState, useRef, useContext } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext } from "../layout/context/layoutcontext";
import Loader from "../Components/LoadingSpinner";
import {  withRouter } from "next/router";
import { ethers } from "ethers";
import Homecomp from "../Components/HomeCompo";
import request, { gql } from "graphql-request";
function GetAllSignatureSeriesSeriesNft(props) {
  console.log('props',props.router.query.redirectURL)
  const [assetsData, setAsseetsData] = useState([]);
  const { layoutConfig } = useContext(LayoutContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const [graphqlURL, setGraphqlURL] = useState("")
  const [contractAddress, setContractAddress] = useState(()=>props?.router?.query?.contractAddress)
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
     setContractAddress(props?.router?.query?.contractAddress ?? searchParams.get('contractAddress'))
     if(props?.router?.query?.contractAddress ?? searchParams.get('contractAddress')){
      getSignetureSeriesAssets()
     }
  }, [])
  

  useEffect(() => {
    setGraphqlURL(props.router.query.redirectURL);
  }, [props.router.query.redirectURL]);

  const getSignetureSeriesAssets = async () => {
    try {
      setLoading(true)


      setLoading(true)
      const query = gql`
      query Query($where:signatureSeriesAssetCreated_filter) {
        signatureSeriesAssetCreateds(first:100){
          id
          transactionHash
          blockNumber
          tokenID
          amount
          creator
          
           }
            }
            `;
      const result = await request(graphqlURL, query);
      // const {
      //   data: { signatureSeriesAssetCreateds },
      // } = await axios.get("/api/assetsCreated")
      setAsseetsData(result.fusionSeriesAssetCreateds);

      console.log("assetCreateds>>>", signatureSeriesAssetCreateds);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let tranasactionHashArray = signatureSeriesAssetCreateds?.map(
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
              signatureSeriesAssetCreateds.find((asset) => asset.transactionHash === hash)
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

 
      
console.log("contractAddress>>>>",contractAddress);
  return (
    <LayoutDashbord
      title="Signatureseries NFts"
      description="Used to Show All Signatureseries NFTs Details"
    >
      <div>
        <MarketplaceProfileDetails  id={props.router.query.storefrontId}/>
        <div
         className="flex"
        >
          <div>
            <Sidemenu />
          </div>

          <div>
            <div className="flex ml-5 justify-content-around gap-5">
              <div className="font-bold mt-5 text-3xl text-black ">
                SignatureSeries &gt; SignatureSeries 1
              </div>

              <div className="mt-5 ml-5">
                <Link
                  href={{
                    pathname: "/createSignatureSeriesAssets",
                    query: { contractAddress: contractAddress,storefrontId:props.router.query.storefrontId },
                  }}
                >
                  <Button
                    className="buy-img"
                    loading={loading2}
                    onClick={load}
                    label="Create SignatureSeries NFT"
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
              style={{ gap: "20px",  marginLeft: "30px" }}
            >
              {assetsData?.length > 0 ? (
                assetsData.map((asset) => {
                  return (
                    <Link key={asset.tokenID} 
                    href={{
                      pathname: "/singleSignatureSeriesNFT",
                      query: { contractAddress: contractAddress,data:JSON.stringify(asset)},
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
              ) : loading ? (
                <Loader />
              ) : (
                <div
                  className="text-2xl pb-10 font-bold"
                  style={{ marginTop: "50px" }}
                >
                  You haven&apos;t created any SignatureSeries NFts Under this
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

export default withRouter(GetAllSignatureSeriesSeriesNft);
