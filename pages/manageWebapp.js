import Layout from "../Components/Layout";
import React, { useEffect, useState } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Loader from "../Components/LoadingSpinner";
import Link from "next/link";
import { Button } from "primereact/button";

const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function ManageWebapp() {
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
      });
  };
  return (
    <Layout>
      <div>
        <MarketplaceProfileDetails />

        <div className="flex gap-5 buy-back-image-webapp-manage">
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className="font-bold text-3xl mt-5"> Manage your Webapp</div>
            <div className="mt-5">Contract address</div>
            <div>NFT ID</div>
            <div className="mt-5 font-bold text-3xl">Trending NFTs</div>
            <div className="flex gap-5 mt-5">
              <div>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src="garden.png"
                ></img>
              </div>
              <div>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src="garden.png"
                ></img>
              </div>
              <div>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src="garden.png"
                ></img>
              </div>
            </div>
            <div className="mt-5 font-bold text-3xl">Top Highlights</div>
            <div className="flex gap-5 mt-5">
              <div>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src="garden.png"
                ></img>
              </div>
              <div>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src="garden.png"
                ></img>
              </div>
              <div>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src="garden.png"
                ></img>
              </div>
            </div>
            <div className="flex mt-5 gap-5 card">
              <div>
                <div className="font-bold text-2xl">
                  Want to create your own martketplace ?
                </div>
                <div className="mt-5">
                  <Button label="Create Now"></Button>
                </div>
              </div>
              <div className="flex gap-5">
                <div>
                  <img
                    style={{ width: "200px", height: "200px" }}
                    src="garden.png"
                  ></img>
                </div>
                <div>
                  <img
                    style={{ width: "200px", height: "200px" }}
                    src="garden.png"
                  ></img>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
                <Button rounded style={{width:'30%'}} label="Upadte"></Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
