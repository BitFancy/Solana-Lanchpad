import React, { useEffect, useState ,useRef, useContext } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Loader from "../Components/LoadingSpinner";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext } from "../layout/context/layoutcontext";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function GetAllSignatureSeriesSeriesNft() {
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

      }).finally(()=>{
        setLoading(false);
        setLoading2(false);
      })
  };
  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  return (
    <LayoutDashbord>
      <MarketplaceProfileDetails/>
      <Toast ref={toast} />

      <div className="flex justify-content-around">
        <div className="font-bold mt-5 text-3xl text-black ">
          SignatureSeries
        </div>

        <div className="mt-5">
          <Link href='/signatureSeriesAssets'>
          <Button className="buy-img" loading={loading2} onClick={load} label="Create SignatureSeries NFT"></Button>
          </Link>
        </div>
        </div>
        <hr></hr>
        <div 
        className={`${layoutConfig.colorScheme === 'light' ? 'buy-back-image' : 'dark'} flex justify-content-between`}
         style={{marginTop:"-98px"}}>
        <div >
          <Sidemenu />
        </div>
          <div className="grid ml-5" style={{ gap: "20px",cursor:'pointer' }}>

          {/* {contractData?.length > 0 ? (
            contractData.map((contract) => {
              return (
                <Link key={1} href='/singleSignatureSeriesNFT'>
                <div  className="grid   mt-5">
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
                </Link>
              );
            })
            ) : loading ? (
              <Loader />
            ) : (
              <div className="text-2xl pb-10 font-bold text-center">
                You haven&apos;t created any FusionSeries.
              </div>
            )} */}
          </div>
        </div>

    </LayoutDashbord>
  );
}
