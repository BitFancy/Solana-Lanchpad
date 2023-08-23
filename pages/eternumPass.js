import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import { withRouter } from "next/router";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import AppTopbar from "../layout/AppTopbar";
import { Toast } from "primereact/toast";
import Link from "next/link";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const EternumPass = () => {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [platformFeeBasePrice, setplatformFeeBasePrice] = useState("");
  const [subspricePerMonth, setSubspricePerMonth] = useState("");
  const [royltybps, setRoyltybps] = useState("");
  const [selecteOperatorSubscription, setOperatorSubscription] = useState(null);
  const [errors, setErros] = useState({
    contractNameError: "",
    contractSymbolError: "",
    salePriceError: "",
    platformFeeBasePriceError: "",
    subspricePerMonthError: "",
    royltybpsError: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);

  const subscriptions = [
    { name: "YES", value: "YES" },
    { name: "NO", value: "No" },
  ];
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Your Eternumpass contract has been  successfully deployed",
      life: 10000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While deploying Eternumpass contract",
      life: 10000,
    });
  };
  const [eturnumpassResponse, setEturnumpassResponse] = useState();
  
  
  const eturnumpassContarctData = () => {
    const token = localStorage.getItem("platform_token");
    const valid = onClickButton();
    if (valid) {
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
          {
            contractName: "EternumPass",
            constructorParams: {
              param1: contractName,
              param2: contractSymbol,
              param3: "www.xyz.com",
              param4: salePrice,
              param5: platformFeeBasePrice,
              param6: subspricePerMonth,
              param7: royltybps,
              param9: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
              param10: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
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
          setEturnumpassResponse(response.data.contractAddress);
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
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };
  const handleInputSymbol = (e) => {
    setcontractSymbol(e.target.value);
  };
  const handleInputSalePrice = (e) => {
    setSalePrice(e.target.value);
  };

  const handleInputPlatformFee = (e) => {
    setplatformFeeBasePrice(e.target.value);
  };
  const handleInputSubscriptionPrice = (e) => {
    setSubspricePerMonth(e.target.value);
  };

  const handleInputRoyelty = (e) => {
    setRoyltybps(e.target.value);
  };

  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };

  const onClickButton = () => {
    if (!contractName) {
      setErros({ contractNameError: "Please Enter Contarct Name" });
      return false;
    } else if (!contractSymbol) {
      setErros({ contractSymbolError: "Please Enter Symbol description" });
      return false;
    } else if (!salePrice) {
      setErros({ salePriceError: "Please Enter Sale Price" });
      return false;
    } else if (!platformFeeBasePrice) {
      setErros({
        platformFeeBasePriceError: "Please Enter Platform Fee Price",
      });
      return false;
    } else if (!subspricePerMonth) {
      setErros({
        subspricePerMonthError: "Please Enter Subscription Per Months Price",
      });
      return false;
    } else if (!royltybps) {
      setErros({ royltybpsError: "Please Enter Roylty BPS" });
      return false;
    } else if (
      contractName &&
      contractSymbol &&
      salePrice &&
      platformFeeBasePrice &&
      subspricePerMonth &&
      royltybps
    ) {
      setSubmitClicked(true);
      setLoading(true);
      return true;
    }
  };

  return (
    <div
      title="Deploy InstaGen"
      description="This is use to show information of the deploy InstaGen contract"
      className="buy-back-image"
    >
      <AppTopbar />
      <Toast ref={toast} />

      <div style={{ marginTop: "85px" }}>
        <div
          className="p-5 font-bold text-align-center text-center"
          style={{ borderBottom: "2px solid" }}
        >
          Deploy EternumPass
        </div>

        <div className="flex justify-content-center gap-5 mt-5">
          <div className="card buy-img" style={{ width: "50%" }}>
            <div>Enter EternumPass Name</div>
            <div className="mt-3">
              <InputText
                className="p-2 mt-3 input-back w-full text-white"
                onChange={handleInputName}
                value={contractName}
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!contractName ? errors.contractNameError : ""}
              </p>
            </div>

            <div className="mt-5">Enter EternumPass Symbol</div>

            <div className="  mt-3">
              <InputText
                className="p-2 mt-3 input-back w-full text-white"
                value={contractSymbol}
                onChange={handleInputSymbol}
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!contractSymbol ? errors.contractSymbolError : ""}
              </p>
            </div>

            <div className="mt-5">Enter Public SalePrice</div>

            <div className="  mt-3">
              <InputText
                className="p-2 mt-3 input-back w-full text-white"
                value={salePrice}
                onChange={handleInputSalePrice}
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!salePrice ? errors.salePriceError : ""}
              </p>
            </div>

            <div className="mt-5">Enter Platform Fees Base Price</div>

            <div className=" mt-3">
              <InputText
                value={platformFeeBasePrice}
                onChange={handleInputPlatformFee}
                className="p-2 mt-3 input-back w-full text-white"
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!platformFeeBasePrice ? errors.platformFeeBasePriceError : ""}
              </p>
            </div>
            <div className="mt-5">Enter Subscription Price Per month</div>

            <div className=" mt-3">
              <InputText
                value={subspricePerMonth}
                onChange={handleInputSubscriptionPrice}
                className="p-2 mt-3 input-back w-full text-white"
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!subspricePerMonth ? errors.subspricePerMonthError : ""}
              </p>
            </div>

            <div className="mt-5">Enter Royalty BPS</div>

            <div className=" mt-3">
              <InputText
                value={royltybps}
                onChange={handleInputRoyelty}
                className="p-2 mt-3 input-back w-full text-white"
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!royltybps ? errors.royltybpsError : ""}
              </p>
            </div>

            <div className="mt-5">Enter Operator Suscription</div>
            <div className="mt-3">
              <Dropdown
                value={selecteOperatorSubscription}
                onChange={(e) => setOperatorSubscription(e.value)}
                options={subscriptions}
                optionLabel="name"
                placeholder="Select a Operator Suscription "
                className="w-full"
              />
            </div>

            <div className="flex mt-5 justify-content-between">
              <div>
                <Button
                  label="Deploy EternumPass Contract"
                  onClick={eturnumpassContarctData}
                  severity="Primary"
                  className=" mt-7 w-full"
                  style={{ width: "30%" }}
                  rounded
                  type="submit"
                  loading={loading}
                />
              </div>
              {eturnumpassResponse && (
                <div>
                  <Link href="/webappForm">
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
    </div>
  );
};

export default withRouter(EternumPass);
