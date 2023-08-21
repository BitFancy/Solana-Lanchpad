import Layout from "../Components/Layout";
import React, { useEffect, useState } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Loader from "../Components/LoadingSpinner";
import { Toast } from "primereact/toast";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function GetAllFusionseries() {
  const [contractData, setContarctData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error while get Fusion Series Data",
      life: 10000,
    });
  };
  useEffect(() => {
    getAllContarctData();
  }, []);

  const getAllContarctData = () => {
    const token = localStorage.getItem("authToken");
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
      }).finally(()=>{
        setLoading(false);
      })
  };
  return (
    <Layout>
      <MarketplaceProfileDetails/>
        <div className="font-bold mt-5 text-3xl text-black text-center">
          FusionSeries
        </div>
        <Toast ref={toast} />

        <hr></hr>
        <div className="flex justify-content-between buy-back-image">
        <div >
          <Sidemenu />
        </div>
          <div className="grid ml-5" style={{ gap: "20px",cursor:'pointer' }}>
          {contractData?.length > 0 ? (
            contractData.map((contract) => {
              return (
                <div key={1} className="grid   mt-5">
                  {contract.contractName === "FusionSeries" && (
                    <div
                      className="card col-12 lg:col-6 xl:col-3 gap-5"
                      style={{ marginBottom: "0px", width: "100%",height:'300px' }}
                    >
                      <div className="text-center">
                        <img
                          className="dash-img-size"
                          style={{ width: "200px", height: "200px" }}
                          src="garden.png"
                        ></img>
                      </div>
                      <div>
                        Contract Name :{" "}
                        <span style={{ color: "blue" }}>
                          <>{contract.contractName}</>
                        </span>
                      </div>
                    
                    </div>
                  )}
                </div>
              );
            })
            ) : loading ? (
              <Loader />
            ) : (
              <div className="text-2xl pb-10 font-bold text-center">
                You haven&apos;t created any FusionSeries.
              </div>
            )}
          </div>
        </div>

    </Layout>
  );
}
