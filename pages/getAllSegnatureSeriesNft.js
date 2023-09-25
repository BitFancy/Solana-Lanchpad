import React, { useEffect, useState, useRef, useContext } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext } from "../layout/context/layoutcontext";
import Loader from "../Components/LoadingSpinner";
import {  withRouter } from "next/router";
import { ethers } from "ethers";
function GetAllSignatureSeriesSeriesNft(props) {
  const [assetsData, setAsseetsData] = useState([]);
  const { layoutConfig } = useContext(LayoutContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const [contractAddress, setContractAddress] = useState(()=>props?.router?.query?.contractAddress)
  
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
     setContractAddress(props?.router?.query?.contractAddress ?? searchParams.get('contractAddress'))
     if(props?.router?.query?.contractAddress ?? searchParams.get('contractAddress')){
      getSignetureSeriesAssets()
     }
  }, [])
  
  const getSignetureSeriesAssets = async () => {
    try {
      setLoading(true)
      const {
        data: { assetCreateds },
      } = await axios.get("/api/assetsCreated")
      console.log("assetCreateds>>>", assetCreateds);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let tranasactionHashArray = assetCreateds?.map(
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
              assetCreateds.find((asset) => asset.transactionHash === hash)
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
    }finally{
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
          className={`${
            layoutConfig.colorScheme === "light" ? "buy-back-image" : "dark"
          } flex `}
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
                    pathname: "/CreateSignatureSeriesAssets",
                    query: { contractAddress: contractAddress },
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
              className="grid cursor-pointer"
              style={{ gap: "20px",  marginLeft: "30px" }}
            >
              {assetsData?.length > 0 ? (
                assetsData.map((asset) => {
                  return (
                    <Link key={1} 
                    href={{
                      pathname: "/singleSignatureSeriesNFT",
                      query: { contractAddress: contractAddress },
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
                          <div className="mt-2 " style={{ color: "black" }}>
                            Price:{" "}
                            <span style={{ color: "blue" }}>
                              {/* <>{asset.contractName}</> */}
                            </span>
                          </div>
                          <div className="mt-2 " style={{ color: "black" }}>
                            Last Sale:{" "}
                            <span style={{ color: "blue" }}>
                              {/* <>{asset.contractName}</> */}
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
