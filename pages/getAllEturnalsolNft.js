import React, { useEffect, useState, useRef } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import Loader from "../Components/LoadingSpinner";
import { ethers } from "ethers";
import { withRouter } from "next/router";
import Homecomp from "../Components/HomeCompo";
import { getAllEternulsolNfts } from "./api/eternulsolAssets";
function GetAllEternalSoulNft(props) {
  const [assetsData, setAsseetsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  useEffect(() => {
    getEturnulsolAssets();
  }, []);
  const testCTA = props.router.query.contractAddress;
  const getEturnulsolAssets = async () => {
    const endPoint=props?.router?.query?.redirectURL?.slice(0,props?.router?.query?.redirectURL?.indexOf("/graphql"))
    const {assetIssueds} = await getAllEternulsolNfts({endPoint: endPoint})
    setAsseetsData(assetIssueds);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let tranasactionHashArray = assetIssueds?.map(
      (asset) => asset.transactionHash
    );
    const innerContractAddress = [];
    setLoading(true);
    await Promise.all(
      tranasactionHashArray?.map(async (hash) => {
        const contractAddress = await provider.getTransaction(hash);
        if (contractAddress.to == testCTA) {
          innerContractAddress.push(
            assetIssueds.find((asset) => asset.transactionHash === hash)
          );
        }
         
        setAsseetsData(innerContractAddress);
      })
    ).then(() => {
      console.log("innerContractAddress", innerContractAddress);
    });
  };
  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  const contractAddress = props.router.query.contractAddress;

  return (
    <LayoutDashbord
      title="EternalSoul NFts"
      description="Used to Show All EternalSoul NFTs Details"
    >
      <div>
        <MarketplaceProfileDetails />
        <div className="flex">
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className="flex ml-5 justify-content-around">
              <div className="font-bold mt-5 text-3xl text-black ">
                EternalSoul &gt; EternalSoul 1
              </div>

              <div className="mt-5 ml-5">
                <Link
                  href={{
                    pathname: "/createEternulsolAssets",
                    query: { contractAddress: contractAddress },
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
                          storefrontId:props.router.query.storefrontId
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
              ) : loading ? (
                <Loader />
              ) : (
                <div className="text-2xl pb-10 font-bold text-center mt-5">
                  You haven&apos;t created any EternalSoul NFts.
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
