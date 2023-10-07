import React, { useEffect, useState, useRef, useContext } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext } from "../layout/context/layoutcontext";
import { withRouter } from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
 function SingleFusionseriesNft(props) {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const [contractData, setContarctData] = useState(()=>JSON.parse(props.router.query.data))
  useEffect(() => {
    setContarctData(JSON.parse(props.router.query.data))
  }, [])
const data=JSON.parse(props.router.query.data);
console.log('data',data)
  const toast = useRef(null);
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While getting single signature series data",
      life: 10000,
    });
  };
  return (
    <LayoutDashbord>
      <div>
        <MarketplaceProfileDetails storefrontId={props.router.query.storefrontId}/>
        <Toast ref={toast} />

        <div
         className="flex gap-5"
        >
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className=" text-3xl mt-5 font-bold">
              FusionSeries &gt; FusionSeries {contractData.tokenID} &gt; Asset {contractData.tokenID}
            </div>
            <div className="border-bottom-das" style={{ width: "134%" }}></div>
            <div>
              <div className="flex gap-5 mt-5">
                <div>
                  <img
                    className="dash-img-size"
                    style={{ width: "400px", height: "350px" }}
                    src="garden.png"
                  ></img>
                </div>
                <div>
                <div className="flex mt-5 gap-5">
                    <div className="font-bold text-xl">Asset Name: </div>
                    {/* <div className="text-xl"> {contractData.creator}</div> */}
                  </div>
                  <div className="flex mt-5 gap-5">
                    <div className=" text-xl">Owned by: </div>
                    <div className="text-xl"> {contractData.creator}</div>
                  </div>

                  <div className="flex mt-5 gap-5">
                    <div className=" text-xl">Description:</div>
                    {/* <div className="text-xl">{contractData.amount}</div> */}
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(SingleFusionseriesNft)