import React, { useEffect, useState, useRef, useContext } from "react";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Loader from "../Components/LoadingSpinner";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { LayoutContext } from "../layout/context/layoutcontext";
import LayoutDashbord from "../Components/LayoutDashbord";
import { withRouter } from "next/router";
import { getcontractById } from "../utils/util";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
function GetAllSignatureseriesContract(props) {
  const [contractData, setContarctData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { layoutConfig } = useContext(LayoutContext);
  const toast = useRef(null);
   console.log('id in getall sig con',props.router.query.storefrontId)
   useEffect(() => {
    getallcontractbyId();
    getallsigseriesContract();
  }, []);
  const getallcontractbyId =async () => {
    const payload = await getcontractById(props.router.query.storefrontId)
    setContarctData(payload)
   console.log("Data",payload);
  };
  const getallsigseriesContract=()=>{
    const token = localStorage.getItem("platform_token");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts/${props.router.query.storefrontId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        setLoading(true);
        if (response?.data?.length > 0) {
          setContarctData(
            response.data.filter((sf) => sf.contractName === "SignatureSeries")
          );
        }
        setLoading(false);
      })

      .catch((error) => {
        console.log('error while get contract by id',error)
      })
      .finally(() => {
        setLoading(false);
      });
  }
   
 
  return (
    <LayoutDashbord
      title="Signatureseries Contarct"
      description="Used to Show All Signatureseries Contarct Details"
    >
      <div>
        <MarketplaceProfileDetails id={props.router.query.storefrontId}/>
        <Toast ref={toast} />

        <div
          className={`${
            layoutConfig.colorScheme === "light" ? "buy-back-image" : "dark"
          } flex`}
        >
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className="font-bold mt-5 ml-5  text-3xl text-black">
              SignatureSeries
            </div>
            <div className="border-bottom-das" style={{width:'136%'}}></div>

            <div
              className="grid cursor-pointer"
              style={{ gap: "20px", marginLeft: "30px" }}
            >
              {contractData?.length > 0 ? (
                contractData
                  .filter((cd) => cd.contractName === "SignatureSeries")
                  .map((contract) => {
                    return (
                      <Link
                        style={{ color: "black" }}
                        key={1}
                        href={{
                          pathname: "/getAllSegnatureSeriesNft",
                          query: { contractAddress: contract.contractAddress,storefrontId:props.router.query.storefrontId },
                        }}
                      >
                        <div
                          className="col-12 lg:col-6 xl:col-3   mt-5"
                          style={{ width: "285px" }}
                        >
                          <div
                            className="back-contract gap-5 p-5"
                            style={{
                              marginBottom: "0px",
                              height: "300px",
                            }}
                          >
                            <div className="text-center">
                              <img
                                className="dash-img-size"
                                style={{ width: "200px", height: "200px" }}
                                src="garden.png"
                              ></img>
                            </div>
                            <div className="mt-5">
                              Contract Name :{" "}
                              <span style={{ color: "blue" }}>
                                <>{contract.contractName}</>
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
                  You haven&apos;t created any SignatureSeries Contract Under this storefront.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}

export default withRouter(GetAllSignatureseriesContract);
