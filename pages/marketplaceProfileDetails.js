import axios from "axios";
import Link from "next/link";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function MarketplaceProfileDetails() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While Get storefront Details",
      life: 10000,
    });
  };
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
      .catch(() => {
       showError();
      }).finally(()=>{
        setLoading2(false);
        
      })
  };
  const load2 = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
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
        <div className="flex justify-content-end gap-5">
  <div>
    <Link href='/addSubscription'>
   <Button  loading={loading2} onClick={load2}  rounded style={{background:'white',color:'black'}} label="Launch"></Button>
   </Link>
  </div>
  <div>
    <Button rounded style={{border:'1px solid white'}} label="Upgrade"></Button>
  </div>
</div>
      </div>
    </div>
  );
}
