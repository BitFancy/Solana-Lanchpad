import React, { useEffect, useState, useRef, useContext } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext } from "../layout/context/layoutcontext";
import Loader from "../Components/LoadingSpinner";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function GetAllEternalSoulNft() {
  const [contractData, setContarctData] = useState([]);
  const { layoutConfig } = useContext(LayoutContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While getting data of the signature series NFT Data",
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
        setLoading2(false);
      });
  };
  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  return (
    <LayoutDashbord title="EternalSoul NFts" description="Used to Show All EternalSoul NFTs Details">
      <div>
        <MarketplaceProfileDetails />
        <div
          className={`${
            layoutConfig.colorScheme === "light" ? "buy-back-image" : "dark"
          } flex `}
          
        >
          <div>
            <Sidemenu />
          </div>
          <div>
          <div className="flex ml-5 justify-content-around" >
            <div className="font-bold mt-5 text-3xl text-black ">
            EternalSoul &gt;  EternalSoul 1
            </div>

            <div className="mt-5 ml-5">
              <Link href="/signatureSeriesAssets">
                <Button
                  className="buy-img"
                  loading={loading2}
                  onClick={load}
                  label="Create EternalSoul NFT"
                ></Button>
              </Link>
            </div>
           
          </div>
          <div className="border-bottom-das"></div>
          <div
              className="grid "
              style={{ gap: "20px", cursor: "pointer", marginLeft: "30px" }}
            >
              {contractData?.length > 0 ? (
                contractData.map((contract) => {
                  return (
                    <Link key={1} href="/singleEturnalsolNFT">
                      <div className="grid   mt-5">
                        {contract.contractName === "SignatureSeries" && (
                          <div
                            className="p-3 gap-5"
                            style={{
                              marginBottom: "0px",
                              width: "100%",
                              height: "350px",
                              background:'white',
                              borderRadius:'20px'
                            }}
                          >
                            <div className="text-center" >
                              <img
                                className="dash-img-size"
                                style={{ width: "200px", height: "200px",background:'#CFCDCD' }}
                                src="garden.png"
                              ></img>
                            </div>
                            <div className="mt-5 " style={{color:'black'}}>
                              Assets Description :{" "}
                              <span style={{ color: "blue" }}>
                                <>{contract.contractName}</>
                              </span>
                            </div>
                            <div className="mt-2 " style={{color:'black'}}>
                            Price:{" "}
                              <span style={{ color: "blue" }}>
                                <>{contract.contractName}</>
                              </span>
                            </div>
                            <div className="mt-2 " style={{color:'black'}}>
                            Last Sale:{" "}
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
                  You haven&apos;t created any EternalSoul NFts.
                </div>
              )}
            </div>
          </div>
         
         
          
         
          <Toast ref={toast} />
        </div>
      </div>
    </LayoutDashbord>
  );
}
