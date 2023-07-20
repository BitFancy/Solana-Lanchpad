import Layout from "../Components/Layout";
import React, { useEffect, useState } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";

const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function GetAllInstagen() {
  const [contractData, setContarctData] = useState([]);
  useEffect(() => {
    getAllContarctData();
  }, []);

  const getAllContarctData = () => {
    const token = localStorage.getItem("authToken");
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
      })
      .catch((error) => {
        console.log("Error in Fetching contracts..!", error);
      });
  };
  return (
    <Layout>
      <div  style={{ marginTop: "100px" }}>
      <div className="font-bold text-3xl text-black text-center">
          InstaGen Details
        </div>
        <div className="flex gap-5">
        <div>
          <Sidemenu />
        </div>
        <div className="grid ml-5" style={{ gap: "20px" ,cursor:'pointer'}}>
            {contractData.map((contract) => {
              return (
                <div key={1} className="grid   mt-5">
                  {contract.contractName === "InstaGen" && (
                    <div
                      className="card col-12 lg:col-6 xl:col-3 gap-5"
                      style={{ marginBottom: "0px", width: "100%" }}
                    >
                      <div className="text-center">
                        <img
                          className="dash-img-size"
                          style={{ width: "200px", height: "200px" }}
                          src="garden.png"
                        ></img>
                      </div>
                      <div>
                        Contarct Name :{" "}
                        <span style={{ color: "blue" }}>
                          <>{contract.contractName}</>
                        </span>
                      </div>
                      <div>
                        Contarct Address:{" "}
                        <span style={{ color: "blue" }}>
                        <>{contract.contractAddress}</>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </Layout>
  );
}
