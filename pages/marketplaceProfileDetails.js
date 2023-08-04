import axios from "axios";
import React, { useEffect, useState } from "react";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function MarketplaceProfileDetails() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [defulatImage, setDefulatImage] = useState(
    "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png"
  );
  useEffect(() => {
    getSubscriptionData();
  }, []);
  const replaceImage = (error) => {
    error.target.src = defulatImage;
  };
  const getSubscriptionData = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/subscription`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response?.data?.length > 0) {
          setSubscriptionData(response.data);
        }
      })
      .catch((error) => {
        console.log("Error in Fetching subscription..!", error);
      });
  };
  return (
    <div>
      <div className="text-center mt-10 overview-donut-top-back">
        <div key={1} className="text-center mt-10">
          <div className="flex ml-5">
            <div>
              <img
                style={{ width: "50px", height: "50px" }}
                src={subscriptionData[0]?.image}
                onError={replaceImage}
              ></img>
            </div>
            <div className="ml-3">
              <div className="text-white text-2xl font-bold">
                My First Marketplace
              </div>
              <div className="text-white">Id:{12}</div>
              <div className="text-white">Plane:{}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
