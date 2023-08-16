import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import {  withRouter } from "next/router";
import axios from "axios";
import AppTopbar from "../layout/AppTopbar";
import { Toast } from "primereact/toast";
import Link from "next/link";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const Step1 = () => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [_platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [tradhubResponse, settradhubResponse] = useState();
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Message Content",
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
    const token = localStorage.getItem("authToken");
    setLoading(true);
    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
        {
          contractName: "TradeHub",
          constructorParams: {
            param1: contractName,
            param2: _platformFee,
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
        console.log("response data", response);
        settradhubResponse(response.data.contractAddress);
        showSuccess();
        // Router.push({
        //   pathname: "./fusionSeries",
        //   query: { contractAddress: response.data.contractAddress },
        // });
      })

      .catch((error) => {
        console.log("err", error);
        showError();
      });
  };
  const handleInputFee = (e) => {
    if (e.target.value <= 100) {
      setPlatformfee(e.target.value);
    }
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
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
          <div className="flex justify-content-between gap-5">
            <div style={{ width: "50%" }}>
              <div>Enter TradeHub Name</div>

              <InputText
                type="text"
                name="contractName"
                value={contractName}
                onChange={handleInputName}
                id="contractName"
                className="p-2 w-full mt-3 input-back"
                placeholder="Enter TradeHub Name"
              />
            </div>
            <div style={{ width: "50%" }}>
              <div>Enter TradeHub Fee</div>
              <InputText
                type="number"
                name="_platformFee"
                value={_platformFee}
                onChange={handleInputFee}
                className="p-2 w-full mt-3 input-back "
                placeholder="Enter TradeHub fee"
              />
            </div>
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
