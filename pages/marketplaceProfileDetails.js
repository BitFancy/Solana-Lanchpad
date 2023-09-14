import axios from "axios";
import Link from "next/link";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function MarketplaceProfileDetails() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);

  const [defulatImage, setDefulatImage] = useState(
    "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png"
  );
  useEffect(() => {
    getStorefrontData();
  }, []);
  const replaceImage = (error) => {
    error.target.src = defulatImage;
  };
  
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
          setSubscriptionData(response.data);
        }
      })
      .catch((error) => {
        console.log('error while getting storefront details',error)
      })
      .finally(() => {
        setLoading2(false);
      });
  };
  const load2 = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  return (
    <div>
      <div className="text-center overview-donut-top-back">
        <div key={1} className="text-center">
          <div className="flex ml-5 justify-content-between">
            <div className="flex" style={{marginTop:'45px'}}>
            <div>
              <img
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src={subscriptionData[0]?.image}
                onError={replaceImage}
              ></img>
            </div>
            <div className="ml-3">
              <div className="flex text-white gap-2">
                <div className="font-bold">Name :</div>
                <div>{subscriptionData[0]?.string}</div>
              </div>
              <div className="flex text-white gap-2 mt-2">
                <div>Headline :</div>
                <div>{subscriptionData[0]?.headline}</div>
              </div>
              <div className="flex text-white gap-2 mt-2">
                <div>Blockchain :</div>
                <div>{subscriptionData[0]?.blockchain}</div>
              </div>
            </div>
            </div>
            <div className="flex gap-5" style={{marginTop:'85px'}}>
            <div>
            <Link href="/addStorefront">
              <Button
                className="w-full"
                loading={loading2}
                onClick={load2}
                rounded
                style={{ background: "white", color: "black" }}
                label="Launch"
              ></Button>
            </Link>
          </div>
          <div>
            <Button
              rounded
              style={{ border: "1px solid white" }}
              label="Upgrade"
            ></Button>
          </div>
            </div>
          </div>
        </div>
     
         
          <Toast ref={toast} />
        
      </div>
    </div>
  );
}
