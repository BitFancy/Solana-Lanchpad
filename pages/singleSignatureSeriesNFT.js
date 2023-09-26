import React, {  useState, useRef, useContext, useEffect } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext } from "../layout/context/layoutcontext";
import { withRouter } from "next/router";
import axios from "axios";
import { ethers } from "ethers";
import Homecomp from "../Components/HomeCompo";
 function SingleSignatureseriesNft(props) {
  const { layoutConfig } = useContext(LayoutContext);
  const [tokenId, setTokenId] = useState(()=>props?.router?.query?.id)
  const [contractAddress, setContractAddress] = useState(()=>props?.router?.query?.contractAddress)

  const [assetsData, setAsseetsData] = useState([]);

console.log('props')
  const toast = useRef(null);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
     setTokenId(props?.router?.query?.id ?? searchParams.get('id'))
     if(props?.router?.query?.contractAddress ?? searchParams.get('id')){
      getSignetureSeriesAssets()
     }
     setContractAddress(props?.router?.query?.contractAddress ?? searchParams.get('contractAddress'))
     if(props?.router?.query?.contractAddress ?? searchParams.get('contractAddress')){
      getSignetureSeriesAssets()
     }
  }, [])
  
  const getSignetureSeriesAssets = async () => {
    try {
      const {
        data: { signatureSeriesAssetCreateds },
      } = await axios.get("/api/assetsCreated")
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
    }

  };

  return (
    <LayoutDashbord>
      <div>
        <MarketplaceProfileDetails />
        <Toast ref={toast} />

        <div
          className={`${
            layoutConfig.colorScheme === "light" ? "buy-back-image" : "dark"
          } flex gap-5`}
        >
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className=" text-3xl mt-5 font-bold">
              SignatureSeries &gt; SignatureSeries 1 &gt; Asset 1 (Token ID)
            </div>
            <div className="border-bottom-das" style={{ width: "171%" }}></div>
            <div
              className="grid cursor-pointer"
              style={{ gap: "20px", marginLeft: "30px" }}
            >
              {assetsData?.length > 0 && (
                assetsData?.filter((cd) => cd.id === tokenId).map((asset) => {
                    return (
                     <Homecomp key={1} uri={asset ? asset.metaDataURI : ""}/>
                    );
                  })
              )}
              </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(SingleSignatureseriesNft)