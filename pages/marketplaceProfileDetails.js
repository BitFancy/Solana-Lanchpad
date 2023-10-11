import Link from "next/link";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "next/router";
import axios from "axios";
 function MarketplaceProfileDetails(props) {
  const [data, setData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  useEffect(() => {
    getstorefrontdatabyId();

  }, []);
  const getstorefrontdatabyId =async () => {
  const token = localStorage.getItem("platform_token");
  const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
  try {
  const {data}= await axios.get(`${BASE_URL_LAUNCH}api/v1.0/storefront/get_storefront_by_id?id=${props.router.query.storefrontId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    setData(data.payload)
  } catch (error) {
      console.log("error",error);
  }
  };
  const load2 = () => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  return (
    <div>
      <div className="text-center backstore1">
        <div key={1} className="text-center">
          <div className="flex ml-5 justify-content-between">
            <div className="flex" style={{marginTop:'45px'}}>
            <div>
              <img
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src={data?.Image?data?.Image:'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png'}
              ></img>
            </div>
            <div className="ml-3">
              <div className="flex text-white gap-2">
                <div className="font-bold">Name :</div>
                <div>{data?.name}</div>
              </div>
              <div className="flex text-white gap-2 mt-2">
                <div>Headline :</div>
                <div>{data?.headline}</div>
              </div>
              <div className="flex text-white gap-2 mt-2">
                <div>Blockchain :</div>
                <div>{data?.blockchain}</div>
              </div>
            </div>
            </div>
            <div className="flex gap-5" style={{marginTop:'85px'}}>
            <div>
            <Link 
              href={{
                pathname: "/launchSignatureseries",
                query: { storefrontId: props?.router?.query?.storefrontId },
              }}
            >
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
          <Link 
              href={{
                pathname: "/buySubscription",
                query: { storefrontId: props?.router?.query?.storefrontId },
              }}
            >
            <Button
              rounded
              style={{ border: "1px solid white" }}
              label="Upgrade"
            ></Button>
            </Link>
          </div>
            </div>
          </div>
        </div>
     
         
          <Toast ref={toast} />
        
      </div>
    </div>
  );
}
export default withRouter(MarketplaceProfileDetails)
