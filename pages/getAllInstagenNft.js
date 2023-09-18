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
import { ethers } from "ethers";
import { withRouter } from "next/router";
 function GetAllInstagenNft(props) {
  const { layoutConfig } = useContext(LayoutContext);
  const [assetsData, setAsseetsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
 
  useEffect(() => {
    getSignetureSeriesAssets();
  }, []);

  const getSignetureSeriesAssets = async () => {
    console.log(
      "Signature series NFT page>>>>",
      props.router.query.contractAddress,
      localStorage.getItem("activeGraphQLURL")
    );
    const testCTA = props.router.query.contractAddress;
    const {
      data: { assetCreateds },
    } = await axios.get("/api/assetsCreated");
    console.log("Data>>>", assetCreateds);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let tranasactionHashArray = assetCreateds?.map(
      (asset) => asset.transactionHash
    );
    const innerContractAddress = [];
    await Promise.all(tranasactionHashArray?.map(async (hash) => {
        const contractAddress = await provider.getTransaction(hash);
        if (contractAddress.to == testCTA) {
          console.log(
            "Condition>>>",
            contractAddress.to == testCTA,
            contractAddress.to,
            testCTA
          );
          innerContractAddress.push(
            assetCreateds.find((asset) => asset.transactionHash === hash)
          );
        }
        setAsseetsData(innerContractAddress);
      })
    ).then(() => {
      console.log("innerContractAddress", innerContractAddress);
    });
  };
  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  const contractAddress = props.router.query.contractAddress;
  console.log("conttract address in instagen ift nft", contractAddress);
  return (
    <LayoutDashbord title="Instagen NFts" description="Used to Show All Instagen NFTs Details">
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
            Instagen &gt;  Instagen 1
            </div>

            <div className="mt-5 ml-5">
              <Link 
              href={{
                pathname: "/createInstagenAssets",
                query: { contractAddress: contractAddress },
              }}
              >
                <Button
                  className="buy-img"
                  loading={loading2}
                  onClick={load}
                  label="Create Instagen NFT"
                ></Button>
              </Link>
            </div>
           
          </div>
          <div className="border-bottom-das"></div>
          <div
              className="grid "
              style={{ gap: "20px", cursor: "pointer", marginLeft: "30px" }}
            >
              {assetsData?.length > 0 ? (
                assetsData.map((asset) => {
                  return (
                    <Link key={1} 
                    href={{
                      pathname: "/singleInstagenNFT",
                      query: { contractAddress: asset.contractAddress },
                    }}
                    
                    >
                     <div
                        className="col-12 lg:col-6 xl:col-3"
                        style={{ width: "285px" }}
                      >
                        <div
                          className="p-3 gap-5 back-contract mt-5"
                          style={{
                            marginBottom: "0px",
                            width: "100%",
                            height: "350px",
                            borderRadius: "20px",
                          }}
                        >
                          <div className="text-center">
                            <img
                              className="dash-img-size"
                              style={{
                                width: "200px",
                                height: "200px",
                                background: "#CFCDCD",
                              }}
                              src="garden.png"
                            ></img>
                          </div>

                          <div className="mt-5 " style={{ color: "black" }}>
                            Token Id :{" "}
                            <span style={{ color: "blue" }}>
                              <>{asset.tokenID}</>
                            </span>
                          </div>
                          <div className="mt-2 " style={{ color: "black" }}>
                            Price:{" "}
                            <span style={{ color: "blue" }}>
                              {/* <>{asset.contractName}</> */}
                            </span>
                          </div>
                          <div className="mt-2 " style={{ color: "black" }}>
                            Last Sale:{" "}
                            <span style={{ color: "blue" }}>
                              {/* <>{asset.contractName}</> */}
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
                  You haven&apos;t created any Instagen NFts.
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
export default withRouter(GetAllInstagenNft)