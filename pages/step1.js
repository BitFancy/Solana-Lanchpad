import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useEffect, useContext } from "react";
import { withRouter } from "next/router";
import axios from "axios";
import { Toast } from "primereact/toast";
import Link from "next/link";
import Layout2 from "../Components/Layout2";
import { LayoutContext } from "../layout/context/layoutcontext";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const Step1 = () => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [tradhubResponse, settradhubResponse] = useState();
  const [storefrontData, setStorefrontData] = useState("");
  const [storefrontId, setStorefrontId] = useState("");
  const { layoutConfig } = useContext(LayoutContext);

  const [errors, setErros] = useState({
    platformFeeErrors: "",
    contractNameEror: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "Your Tradhub Contract has been sucessfully Deployed",
      life: 10000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While deploying Tradhub Contract",
      life: 2000,
    });
  };
  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };


  const getStorefrontData= () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/storefront`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response?.data?.length > 0) {
       setStorefrontData(response.data)
       setStorefrontId(response.data[response.data.length-1].id)
        }
      })
      .catch(() => {
        showError()
      })
  };

  useEffect(() => {
    getStorefrontData();
  }, [])
  
  const tradHubContarctData = () => {
    const token = localStorage.getItem("platform_token");
    const valid = onClickButton();

    if (valid) {
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
          {
            contractName: "TradeHub",
            constructorParams: {
              param1: platformFee,
              param2: contractName,
              param3: "0xEFf4209584cc2cE0409a5FA06175002537b055DC",
            },
            network: "maticmum",
            storefrontId: storefrontId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (response) => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          settradhubResponse(response.data.contractAddress);
          showSuccess();
        })

        .catch(() => {
          showError();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleInputFee = (e) => {
    setPlatformfee(e.target.value);
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };

  const onClickButton = () => {
    if (!platformFee) {
      setErros({ platformFeeErrors: "Please Enter Platform Fees" });
      return false;
    } else if (!contractName) {
      setErros({ contractNameEror: "Please Enter Contarct Name" });
      return false;
    } else if (platformFee && contractName) {
      setSubmitClicked(true);
      setLoading(true);
      return true;
    }
  };

  return (
    <Layout2  title="Tradhub Setup"
    description="First Deploy Tradhub">
   
      <Toast ref={toast} />

      <div  className={`${layoutConfig.colorScheme === 'light' ? 'buy-back-image' : 'dark'}`}>
        <div>
        <div
          className="font-bold p-3 mb-5 text-black ml-5 p-heading"
          style={{ borderBottom: "1px solid" }}
        >
          Step1: Setup TradeHub
        </div>
        <div className=" buy-img back-color p-5" style={{ width: "60%", margin: "0 auto" }}>
          <div className="p-heading">Enter TradeHub Fees</div>
          <div className="mt-2">
            <InputText
              type="number"
              className="p-2 mt-2 input-back w-full text-white"
              value={platformFee}
              onChange={handleInputFee}
            />

            <p style={{ textAlign: "left", color: "red" }}>
              {!platformFee ? errors.platformFeeErrors : ""}
            </p>
          </div>

          <div className="mt-5 p-heading">Enter TradeHub Name</div>
          <div className="mt-2">
            <InputText
              value={contractName}
              className="p-2 mt-2 input-back w-full text-white"
              onChange={handleInputName}
            />

            <p style={{ textAlign: "left", color: "red" }}>
              {!contractName ? errors.contractNameEror : ""}
            </p>
          </div>
          <div className="flex mt-5 justify-content-between">
            <div>
              <Button
                label="Deploy Tradhub"
                onClick={tradHubContarctData}
                severity="Primary"
                className=" mt-7 w-full buy-img"
                style={{ width: "30%" }}
                rounded
                loading={loading}
              />
            </div>
            {tradhubResponse && (
              <div>
                <Link href="/launchSignatureseries">
                  <Button
                    label="Continue"
                    severity="Primary"
                    className=" mt-7 w-full buy-img"
                    style={{ width: "30%" }}
                    rounded
                    loading={loading2}
                    onClick={load}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
        </div>
      
      </div>
    
    </Layout2>
  );
};
export default withRouter(Step1);
