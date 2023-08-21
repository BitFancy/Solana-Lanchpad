import Layout from "../Components/Layout";
import React, { useEffect, useState } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function SingleSignatureseriesNft() {
  const [contractData, setContarctData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useRef(null);
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While getting single signature series data",
      life: 10000,
    });
  };
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
      .catch(() => {
        showError();
      });
  };
  const load = () => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  return (
    <Layout>
      <MarketplaceProfileDetails />
      <Toast ref={toast} />
      <div className="text-center"></div>
      <hr></hr>
      <div
        className="flex gap-5  buy-back-image"
        style={{ marginTop: "-30px" }}
      >
        <div>
          <Sidemenu />
        </div>
<div className="font-bold text-3xl mt-5">
SignatureSeries   Asset 1 (Token ID)
<hr></hr>
        <div className="flex gap-5 mt-5">
          <div>
            <img
              className="dash-img-size"
              style={{ width: "400px", height: "400px" }}
              src="garden.png"
            ></img>
          </div>
          <div>
            <div className="font-bold text-2xl">Assets Name</div>
            <div className="mt-5 text-2xl">wallet address:</div>
            <div className="mt-5 text-2xl">Description:</div>
            <div className="mt-5 text-2xl">Price:</div>
            <div className="mt-3">
              <InputText type="number" className="w-full"/>
            </div>
            <div className="flex mt-3 gap-5" style={{justifyContent:'end'}}>
              <div className="font-bold text-2xl">Rental Availability</div>
              <div>
                <img
                  style={{ width: "95px", height: "65px" }}
                  src="/Toggle.png"
                ></img>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
}
