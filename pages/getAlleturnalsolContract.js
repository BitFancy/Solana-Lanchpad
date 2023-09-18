import React, { useContext, useEffect, useRef, useState } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Loader from "../Components/LoadingSpinner";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext } from "../layout/context/layoutcontext";
import Link from "next/link";
import { withRouter } from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
 function GetAllEturnalsolContract() {
  const [contractData, setContarctData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { layoutConfig } = useContext(LayoutContext);
  const toast = useRef(null);
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While getting data of the EternalSoul contract",
      life: 10000,
    });
  };
  useEffect(() => {
    getAllContarctData();
  }, []);
  const getAllContarctData = () => {
    const token = localStorage.getItem("platform_token");
    setLoading(true);
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response?.data?.length > 0) {
          setContarctData(response.data);
        }
        setLoading(false);
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <LayoutDashbord
      title="EternalSoul Contarct"
      description="Used to Show All EternalSoul Contarct Details"
    >
      <MarketplaceProfileDetails />
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
          <div className="font-bold mt-5 text-3xl text-black ml-5">
            EternalSoul
          </div>
          <div className="border-bottom-das"></div>

          <div
            className="grid"
            style={{ gap: "20px", cursor: "pointer", marginLeft: "30px" }}
          >
            {contractData?.length > 0 ? (
               contractData
               .filter((cd) => cd.contractName === "EternalSoul")
               .map((contract) => {
                return (
                  <Link
                    style={{ color: "black" }}
                    key={1}
                    href={{
                      pathname: "/getAllEturnalsolNft",
                      query: { contractAddress: contract.contractAddress },
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
              <div className="text-2xl pb-10 font-bold text-center">
                You haven&apos;t created any EternalSoul Contract.
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(GetAllEturnalsolContract)