import React, { useEffect, useState, useRef, useContext } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Loader from "../Components/LoadingSpinner";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { LayoutContext } from "../layout/context/layoutcontext";
import LayoutDashbord from "../Components/LayoutDashbord";
import { useProvider } from "wagmi";
import request, { gql } from "graphql-request";
import { ethers } from "ethers";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
// const graphqlAPI='http://18.119.142.140:8000/subgraphs/name/sig/graphql'
const graphqlAPI =
  "https://api.thegraph.com/subgraphs/name/myriadflow/storefront-v1";
export default function GetAllSignatureseriesContract() {
  const provider = useProvider();
  const [data, setData] = useState([]);
  const [storefrontId, setStorefrontId] = useState("");
  const [storefrontData, setStorefrontData] = useState("");
  const [contractData, setContarctData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { layoutConfig } = useContext(LayoutContext);
  const toast = useRef(null);
  useEffect(() => {
    getAllContarctData();
    getStorefrontData();
    getStorefrontById();
    fetchUserAssests();
    getAllSignatureseriesNfts();
  }, []);

  const getStorefrontData = () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/storefront`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response?.data?.length > 0) {
          setStorefrontData(response.data);

          setStorefrontId(response.data[response.data.length - 1].id);
        }
      })
      .catch(() => {
        console.log("error while get storefront data", error);
      });
  };
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
      .catch((error) => {
        console.log("error while get contract data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getStorefrontById = () => {
    const token = localStorage.getItem("platform_token");
    setLoading(true);
    axios
      .get(
        `${BASE_URL_LAUNCH}api/v1.0/storefront/get_storefront_by_id?id=${storefrontId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        if (response?.data?.length > 0) {
          setContarctData(response.data);
        }
        console.log("storefront id ", response);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error while get storefront id data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchUserAssests = async () => {
    const query = gql`
      query Query($where: AssetCreated_filter) {
        assetCreateds(first: 100) {
          id
          tokenID
          creator
          blockNumber
          blockTimestamp
          metaDataURI
          transactionHash
        }
      }
    `;
    const result = await request(graphqlAPI, query);
    setLoading(true);
    setData(result.assetCreateds);
    setLoading(false);
  };

  const getAllSignatureseriesNfts = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = ethers.providers;
    console.log("ethers", ethers, ethers.providers);
    const txHash =
      "0x272e444722efd544c2357560b12dd7bc42aa160a07ec4fa6dc1ca6bfaaad3299";
    const tx = await provider.formatter;

    console.log("contract address", tx);
  };

  return (
    <LayoutDashbord
      title="Signatureseries Contarct"
      description="Used to Show All Signatureseries Contarct Details"
    >
      <div>
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
            <div className="font-bold mt-5 ml-5  text-3xl text-black">
              SignatureSeries
            </div>
            <hr></hr>
            <div
              className="grid "
              style={{ gap: "20px", cursor: "pointer", marginLeft: "30px" }}
            >
              {/* <Button onClick={addsubgraphApi} className="buy-img" label="subgrapg"></Button> */}
              {contractData?.length > 0 ? (
                contractData.map((contract) => {
                  return (
                    <Link key={1} href="/getAllSegnatureSeriesNft">
                      <div className="grid   mt-5">
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
    </LayoutDashbord>
  );
}
