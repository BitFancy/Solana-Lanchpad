import React, { useEffect, useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import Link from "next/link";
import axios from "axios";
import Loader from "../Components/LoadingSpinner";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext } from "../layout/context/layoutcontext";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function SubscriptionDashboard() {
  const { layoutConfig } = useContext(LayoutContext);

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [defulatImage, setDefulatImage] = useState(
    "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png"
  );
  const [loadingmanage, setLoadingmanage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const toast = useRef(null);
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While get storefront data",
      life: 10000,
    });
  };
  useEffect(() => {
    getSubscriptionData();
  }, []);

  const loadnewPlan = () => {
    setLoading1(true);

    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  };

  const loadProfile = () => {
    setLoading3(true);

    setTimeout(() => {
      setLoading3(false);
    }, 2000);
  };
  const loadsetupManage = () => {
    setLoadingmanage(true);

    setTimeout(() => {
      setLoadingmanage(false);
    }, 2000);
  };
 
  const loadsetup = () => {
    setLoading4(true);

    setTimeout(() => {
      setLoading4(false);
    }, 2000);
  };
  const getSubscriptionData = () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/storefront`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        setLoading(true);

        if (response?.data?.length > 0) {
          setSubscriptionData(response.data);
        }
        setLoading(false);
      })

      .catch(() => {
        showError();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const replaceImage = (error) => {
    error.target.src = defulatImage;
  };
  return (
    <LayoutDashbord>
    <div>
      <Toast ref={toast} />

      <div  className={`${layoutConfig.colorScheme === 'light' ? 'buy-back-image-subs-dashboard' : 'dark'}`}>
        <hr></hr>

        <div style={{ width: "85%", margin: "0 auto" }}>
          <div className="flex justify-content-between">
            <div className="font-bold text-3xl p-5 text-center">
              You are Currently Observing the Subscription Details
            </div>
            <div className="p-5">
              <Link href="/buySubscription">
                <Button
                  onClick={loadnewPlan}
                  loading={loading1}
                  label="Buy Anather Plan"
                  className="buy-img"
                ></Button>
              </Link>
            </div>
            <div className="p-5">
              <Link href="/addStorefront">
                <Button
                  onClick={loadsetupManage}
                  loading={loadingmanage}
                  label="Launch"
                  className="buy-img"
                ></Button>
              </Link>
            </div>

            {/* <div className="p-5">
              <Link href="/profile">
                <Button
                  onClick={loadProfile}
                  loading={loading3}
                  label="Profile"
                  className="buy-img"
                ></Button>
              </Link>
            </div> */}
          </div>

          <hr></hr>
          {subscriptionData?.length > 0 ? (
            subscriptionData.map((subscription) => {
              return (
                <div key={1}>
                  {
                    <div className="flex justify-content-between mt-5 align-items-center subscription-back-part ">
                      <div className="flex gap-5">
                        <div>
                          <img
                            className="dash-img-size"
                            style={{ width: "100px", height: "100px" }}
                            src={subscription.image}
                            onError={replaceImage}
                          ></img>
                        </div>
                        <div>
                          <div className=" font-bold mt-3">Name : {subscription?.string}</div>
                          <div className="mt-2">Id: {subscription?.id}</div>
                          <div className="mt-2">owner: {subscription.owner}</div>
                          <div className="mt-2">Currency: {subscription.currency}</div>
                        </div>
                      </div>
                      <Link href="/step1">
                        <div>
                          <Button
                            loading={loading4}
                            onClick={loadsetup}
                            label="Setup"
                            className="buy-img buy-back-color"

                          ></Button>
                        </div>
                      </Link>
                    </div>
                  }

                
                </div>
              );
            })
          ) : loading ? (
            <Loader />
          ) : (
            <div className="text-2xl pb-10 font-bold text-center">
              You haven&apos;t created any Subscription.
            </div>
          )}
        </div>
      </div>
    </div>
    </LayoutDashbord>
  );

}
