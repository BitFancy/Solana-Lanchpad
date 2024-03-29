import React, { useEffect, useState } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import LayoutDashbord from "../Components/LayoutDashbord";
import SingleAssets from "../Components/SingleAssets";
import { withRouter } from "next/router";
 function SingleEturnalsolNft(props) {
  const [contractData, setContarctData] = useState("");
  useEffect(() => {
    setContarctData(JSON.parse(props?.router?.query?.data));
  }, []);
 
  return (
    <LayoutDashbord>
      <div>
        <MarketplaceProfileDetails
          storefrontId={props.router.query.storefrontId}
        />
        <div className="flex gap-5">
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className=" text-3xl mt-5 font-bold">
              EternalSoul &gt; EternalSoul {contractData?.tokenID} &gt; Asset{" "}
              {contractData?.tokenID}
            </div>
            <div className="border-bottom-das" style={{ width: "207%" }}></div>
            <div>
              <SingleAssets
                uri={contractData ? contractData.metaDataURI : ""}
              />
            </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(SingleEturnalsolNft)