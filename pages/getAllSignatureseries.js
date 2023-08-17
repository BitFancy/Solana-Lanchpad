import Layout from "../Components/Layout";
import React, { useEffect, useState } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Loader from "../Components/LoadingSpinner";
import Link from "next/link";

const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function GetAllSignatureseries() {
  const [contractData, setContarctData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      .catch((error) => {
        console.log("Error in Fetching contracts..!", error);
      }).finally(()=>{
        setLoading(false);
      })
  };
  return (
    <Layout>
      <div>
        <MarketplaceProfileDetails />
        <div className="font-bold mt-5 text-3xl text-black text-center">
          SignatureSeries
        </div>
        <div className="flex justify-content-between buy-back-image mt-5">
          <div>
            <Sidemenu />
          </div>
          <div
            className="grid"
            style={{ gap: "20px", cursor: "pointer", marginLeft: "30px" }}
          >
            {contractData?.length > 0 ? (
              contractData.map((contract) => {
                return (
                  <Link key={1} href='/getAllSegnatureSeriesNft'>
                  <div  className="grid   mt-5">
                    {contract.contractName === "SignatureSeries" && (
                      <div
                        className="card  gap-5"
                        style={{
                          marginBottom: "0px",
                          width: "100%",
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
                        <div>
                          Contract Name :{" "}
                          <span style={{ color: "blue" }}>
                            <>{contract.contractName}</>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  </Link>
                );
              })
            ) : loading ? (
              <Loader />
            ) : (
              <div className="text-2xl pb-10 font-bold text-center">
                You haven&apos;t created any SignatureSeries.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
