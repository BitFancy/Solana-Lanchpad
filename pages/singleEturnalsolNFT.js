import React, { useEffect, useState, useRef, useContext } from "react";
import Sidemenu from "./sidemenu";
import axios from "axios";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext } from "../layout/context/layoutcontext";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function SingleEturnalsolNft() {
  const [contractData, setContarctData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const toast = useRef(null);
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While getting single Eturnalsol NFts data",
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
      });
  };
 
  return (
    <LayoutDashbord>
      <div>
        <MarketplaceProfileDetails />
        <Toast ref={toast} />

        <div
          className={`${
            layoutConfig.colorScheme === "light" ? "buy-back-image" : "dark"
          } flex gap-5`}
        >
          <div>
            <Sidemenu />
          </div>
          <div>
            <div className=" text-3xl mt-5 font-bold">
              EternalSoul &gt; EternalSoul 1 &gt; Asset 1 (Token ID)
            </div>
            <div className="border-bottom-das" style={{ width: "171%" }}></div>
            <div>
              <div className="flex gap-5 mt-5">
                <div>
                  <img
                    className="dash-img-size"
                    style={{ width: "400px", height: "350px" }}
                    src="garden.png"
                  ></img>
                </div>
                <div>
                  <div className="flex">
                    <div className="font-bold text-2xl">Assets Name : </div>
                    <div className="text-2xl">demo</div>
                  </div>
                  <div className="flex mt-5">
                    <div className=" text-xl">wallet address:</div>
                    <div className="text-xl">000000000000000000000</div>
                  </div>

                  <div className="flex mt-5">
                    <div className=" text-xl">Description:</div>
                    <div className="text-xl">dd</div>
                  </div>
                  <div className="flex mt-5">
                    <div className=" text-xl">Price:</div>
                    <div className="text-xl">00</div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
