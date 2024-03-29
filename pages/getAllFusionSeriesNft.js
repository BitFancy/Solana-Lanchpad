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
import Homecomp from "../Components/HomeCompo";
import { getAllFusionSeriesNfts } from "./api/fusionseriesAssets";
function GetAllFusionSeriesNft(props) {
  const [assetsData, setAsseetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const [contractAddress, setContractAddress] = useState(
    () => props?.router?.query?.contractAddress
  );
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setContractAddress(
      props?.router?.query?.contractAddress ??
        searchParams.get("contractAddress")
    );
    if (
      props?.router?.query?.contractAddress ??
      searchParams.get("contractAddress")
    ) {
      getallfusionSeriesAssets();
    }
  }, []);
  const getallfusionSeriesAssets = async () => {
    try {
      const endPoint = props?.router?.query?.redirectURL?.slice(
        0,
        props?.router?.query?.redirectURL?.indexOf("/graphql")
      );
      const { fusionSeriesAssetCreateds } = await getAllFusionSeriesNfts({
        endPoint: endPoint,
      });
      setAsseetsData(fusionSeriesAssetCreateds);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let tranasactionHashArray =
        fusionSeriesAssetCreateds?.map((asset) => asset.transactionHash) ?? [];
      const innerContractAddress = [];
      if (tranasactionHashArray.length > 0) {
        setLoading(true);
        await Promise?.all(
          tranasactionHashArray?.map(async (hash) => {
            const gqlcontractAddress = await provider.getTransaction(hash);
            if (gqlcontractAddress.to == contractAddress) {
              innerContractAddress.push(
                fusionSeriesAssetCreateds?.find(
                  (asset) => asset.transactionHash === hash
                )
              );
            }
            setAsseetsData(innerContractAddress);
          })
        ).then(() => {
          console.log("innerContractAddress", innerContractAddress);
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching assets", error);
      setLoading(false);
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
        <MarketplaceProfileDetails id={props.router.query.storefrontId} />
        <div className="flex">
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
                    query: {
                      contractAddress: contractAddress,
                      storefrontId: props.router.query.storefrontId,
                    },
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
            <div className="border-bottom-das" style={{ width: "224%" }}></div>
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
                        query: {
                          contractAddress: contractAddress,
                          data: JSON.stringify(asset),
                          storefrontId: props.router.query.storefrontId,
                        },
                      }}
                    >
                      <Homecomp uri={asset ? asset.metadataUri : ""} />
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
