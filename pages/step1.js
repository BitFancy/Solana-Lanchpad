import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import { withRouter } from "next/router";
import axios from "axios";
import AppTopbar from "../layout/AppTopbar";
import { Toast } from "primereact/toast";
import Link from "next/link";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const Step1 = () => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [tradhubResponse, settradhubResponse] = useState();
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
      detail: "Something Went Wrong Please try after some time",
      life: 10000,
    });
  };
  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };

  const tradHubContarctData = () => {
    // const token = localStorage.getItem("authToken");
    const token = localStorage.getItem("platform_token");

    onClickButton();
    setLoading(true);
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
        setLoading2(false);
      });
  };
  const handleInputFee = (e) => {
    setPlatformfee(e.target.value);
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };

  const onClickButton = () => {
    if (platformFee && contractName) {
      setSubmitClicked(true);
    } else {
      if (!platformFee) {
        setErros({ platformFeeErrors: "Please Enter Platform Fees" });
      }
      if (!contractName) {
        setErros({ contractNameEror: "Please Enter Contarct Name" });
      }
    }
  };

  return (
    <div
      className="buy-back-image"
      title="Step 1"
      description="Step one of the launchpad"
    >
      <AppTopbar />
      <Toast ref={toast} />
      <div style={{ marginTop: "100px" }}>
        <div
          className="font-bold p-3 mb-5 text-center"
          style={{ borderBottom: "2px solid" }}
        >
          Setup TradeHub
        </div>
        <div className="card" style={{ width: "60%", margin: "0 auto" }}>
          <div>Enter TradeHub Fee</div>
          <div className="mt-3">
            <InputText
              type="number"
              className="p-2 mt-3 input-back w-full text-white"
              value={platformFee}
              onChange={handleInputFee}
            />

            <p style={{ textAlign: "left", color: "red" }}>
              {!platformFee ? errors.platformFeeErrors : ""}
            </p>
          </div>

          <div className="mt-5">Enter TradeHub Name</div>
          <div className="mt-3">
            <InputText
              value={contractName}
              className="p-2 mt-3 input-back w-full text-white"
              onChange={handleInputName}
            />

            <p style={{ textAlign: "left", color: "red" }}>
              {!contractName ? errors.contractNameEror : ""}
            </p>
          </div>
          <div className="flex mt-5 justify-content-between">
          <div>
            <Button
              label="Deploy Tradhub Contract"
              onClick={tradHubContarctData}
              severity="Primary"
              className=" mt-7 w-full"
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
                  className=" mt-7 w-full"
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
  );
};
export default withRouter(Step1);
