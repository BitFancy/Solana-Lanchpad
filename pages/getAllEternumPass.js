import Layout from "../Components/Layout";
import React, { useEffect, useState } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";

const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function GetAllEternumPass() {
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
      <div style={{ marginTop: "100px" }}>
      <div className="font-bold text-3xl text-black text-center">
          EternumPass Details
        </div>
        <div  className="flex gap-5">
        <div>
          <Sidemenu />
        </div>
        <div className="flex gap-5">
          {contractData.map((contract) => {
            return (
              <div   key={1} className="flex  mt-5">
                {contract.contractName === "EternumPass" && (
                  <div
                    className="card"
                    style={{ flex: "1", marginBottom: "0px" }}
                  >
                    <div className="text-center">
                      <img className="dash-img-size" src="garden.png"></img>
                    </div>
                    <div>
                      Contarct Name :{" "}
                      <span style={{ color: "blue" }}>
                        <>{contract.contractName}</>
                      </span>
                    </div>
                    <div>
                      Contarct Address: <span style={{ color: "blue" }}></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}:<>OOPs No Data Available !</>
        </div>
      </div>
      </div>
    </Layout>
  );
}
