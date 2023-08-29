import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import { withRouter } from "next/router";
import axios from "axios";
import AppTopbar from "../layout/AppTopbar";
import Link from "next/link";
import { Toast } from "primereact/toast";
import Layout2 from "../Components/Layout2";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const Instagen = (props) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [saleprePrice, setSalePrePrice] = useState("");
  const [countdownTime, setcontDownTime] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [royltybps, setRoyltybps] = useState("");
  const [instagenResponse, setinstagenResponse] = useState();
  const [errors, setErros] = useState({
    contractNameError: "",
    contractSymbolError: "",
    salePriceError: "",
    PreSalePriceError: "",
    countDownTimeError: "",
    maxSupplyError: "",
    royltybpsError: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Your Instagen contract has been  successfully deployed",
      life: 10000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While deploying Instagen contract",
      life: 10000,
    });
  };
  const instaGenContarctData = () => {
    const token = localStorage.getItem("platform_token");
    const validation = onClickButton();
    if(!validation){
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
          {
            contractName: "InstaGen",
            constructorParams: {
              param1: contractName,
              param2: contractSymbol,
              param3: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
              param4: "0xEFf4209584cc2cE0409a5FA06175002537b055DC",
              param5: salePrice,
              param6: saleprePrice,
              param7: countdownTime,
              param8: maxSupply,
              param9: royltybps,
              param10: "www.abc.com",
            },
            network: "maticmum",
            storefrontId: ""
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
          setinstagenResponse(response.data.contractAddress);
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

  const handleInputSalePrePrice = (e) => {
    setSalePrePrice(e.target.value);
  };
  const handleInputCountDownTime = (e) => {
    setcontDownTime(e.target.value);
  };
  const handleInputMaxSupply = (e) => {
    setMaxSupply(e.target.value);
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
    } else if (!saleprePrice) {
      setErros({
        PreSalePriceError: "Please Enter Sale Pre Price",
      });
      return false;
    } else if (!countdownTime) {
      setErros({
        countDownTimeError: "Please Enter CountDown Time",
      });
      return false;
    } else if (!maxSupply) {
      setErros({ maxSupplyError: "Please Enter Max Supply " });
      return false;
    } else if (!royltybps) {
      setErros({ royltybpsError: "Please EnterRoylty BPS " });
      return false;
    } else if (
      contractName &&
      contractSymbol &&
      salePrice &&
      saleprePrice &&
      countdownTime && maxSupply &&
      royltybps
    ) {
      setSubmitClicked(true);
      setLoading(true);
      return true;
    }else{
      false
    }
  };

  return (
    <Layout2
      title="Deploy InstaGen"
      description="This is use to show information of the deploy InstaGen contract"
    >
      <div className="buy-back-image-instagen">
        <div>
          <div
            className="p-5 font-bold text-align-center text-center"
            style={{ borderBottom: "2px solid" }}
          >
            Deploy InstaGen
          </div>

          <div className="flex justify-content-center gap-5">
            <div className="card buy-img mt-5" style={{ width: "50%" }}>
              <div>Enter InstaGen Name</div>
              <div className="mt-3">
                <InputText
                  id="contractName"
                  className="p-2  input-back w-full text-white"
                  onChange={handleInputName}
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!contractName ? errors.contractNameError : ""}
                </p>
              </div>

              <div className="mt-5">Enter InstaGen Symbol</div>

              <div className="  mt-3">
                <InputText
                  value={contractSymbol}
                  className="p-2 input-back w-full text-white"
                  onChange={handleInputSymbol}
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!contractSymbol ? errors.contractSymbolError : ""}
                </p>
              </div>

              <div className="mt-5">Enter SalePrice</div>

              <div className="  mt-3">
                <InputText
                  value={salePrice}
                  onChange={handleInputSalePrice}
                  className="p-2 input-back w-full text-white"
                  type="number"
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!salePrice ? errors.salePriceError : ""}
                </p>
              </div>

              <div className="mt-5">Enter Pre SalePrice</div>

              <div className=" mt-3">
                <InputText
                  value={saleprePrice}
                  onChange={handleInputSalePrePrice}
                  className="p-2 input-back w-full text-white"
                  type="number"
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!saleprePrice ? errors.PreSalePriceError : ""}
                </p>
              </div>

              <div className="mt-5">Enter Countdown Time</div>

              <div className="  mt-3">
                <InputText
                  value={countdownTime}
                  onChange={handleInputCountDownTime}
                  className="p-2 input-back w-full text-white"
                  type="number"
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!countdownTime ? errors.countDownTimeError : ""}
                </p>
              </div>

              <div className="mt-5">Enter Max. Supply</div>

              <div className=" mt-3">
                <InputText
                  className="p-2 input-back w-full text-white"
                  value={maxSupply}
                  onChange={handleInputMaxSupply}
                  type="number"
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!maxSupply ? errors.maxSupplyError : ""}
                </p>
              </div>

              <div className="mt-5">Enter Royalty BPS</div>

              <div className="mt-3">
                <InputText
                  className="p-2 input-back w-full text-white"
                  value={royltybps}
                  onChange={handleInputRoyelty}
                  type="number"
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!royltybps ? errors.royltybpsError : ""}
                </p>
              </div>

              <div className="flex mt-5 justify-content-between">
                <div>
                  <Button
                    label="Deploy Instagen"
                    onClick={instaGenContarctData}
                    severity="Primary"
                    className=" mt-7 w-full"
                    style={{ width: "30%" }}
                    rounded
                    loading={loading}
                  />
                </div>
                {instagenResponse && (
                  <div>
                    <Link href="/eturnalsol">
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

              <Toast ref={toast} />
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default withRouter(Instagen);
