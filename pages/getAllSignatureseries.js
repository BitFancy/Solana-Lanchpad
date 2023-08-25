import Layout from "../Components/Layout";
import React, { useEffect, useState ,useRef} from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Loader from "../Components/LoadingSpinner";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function GetAllSignatureseries() {
  const [contractData, setContarctData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While getting data of the signature series contract",
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
      })
  };
  const addsubgraphApi = async () => {
    setLoading(true);
    const token = localStorage.getItem("platform_token");
    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/subgraph`,
        {
          "name":"inc1ner8r/tron",
          "folder":"onemore",
          "nodeUrl":"http://13.59.249.164:8020",
          "ipfsUrl":"http://13.59.249.164:5001",
          "contractName":"signature",
          "contractAddress":"0x900B489C55aEbDe24864315f627d85A92a7f0d6f",
          "network":"mumbai",
          "protocol":"ethereum",
          "tag":"v1",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        console.log("subgraph response")
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setstorefrontResponase(response);
      })

      .catch(() => {
        showError();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Layout title="Signatureseries Contarct" description="Used to Show All Signatureseries Contarct Details">
      <div>
        <MarketplaceProfileDetails />
        <Toast ref={toast} />

       
        <div className="flex  buy-back-image">
          <div>
            <Sidemenu />
          </div>
          <div>
          <div className="font-bold mt-5  text-3xl text-black text-center">
          SignatureSeries
        </div>
        <div
            className="grid"
            style={{ gap: "20px", cursor: "pointer", marginLeft: "30px",marginBottom:'300px' }}
          >
            <Button onClick={addsubgraphApi} className="buy-img" label="subgrapg"></Button>
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
                You haven&apos;t created any SignatureSeries Contract.
              </div>
            )}
          </div>
          </div>
         
        </div>
      </div>
    </Layout>
  );
}
