import React, { useState, useEffect } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import LayoutDashbord from "../Components/LayoutDashbord";
import { withRouter } from "next/router";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
function Overview(props) {
  const [contractData, setContarctData] = useState("");
  useEffect(() => {
    getcontractById();
  }, []);

  const getcontractById = () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts/${props.router.query.storefrontId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        setContarctData(response?.data?.length);
        console.log("length", response?.data?.length);
      })
      .catch((error) => {
        console.log("error while get contract by id", error);
      });
  };
  return (
    <LayoutDashbord
      title="Overview"
      description="This is use to show information of the overview launchpad"
    >
      {" "}
      <MarketplaceProfileDetails id={props?.router?.query?.storefrontId} />
      <div className="flex">
        <div>
          <Sidemenu />
        </div>
        <div className="flex gap-5 mt-5" style={{ margin: "0 auto" }}>
          <div
            style={{ background: "#70F4D2", width: "400px", height: "400px" }}
          >
            <div className="font-bold text-4xl ml-5 mt-5">
              {" "}
              No Of contracts deployed
            </div>
            <div className="font-bold text-4xl  mt-5 text-center">
              {contractData}
            </div>
          </div>
          <div
            style={{ background: "#A099F4", width: "400px", height: "400px" }}
          >
            <div className="font-bold text-4xl ml-5 mt-5">
              No of NFTs listed
            </div>
            <div className="font-bold text-4xl  mt-5 text-center">
              {contractData}
            </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(Overview);
