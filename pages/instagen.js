import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import { withRouter } from "next/router";
import axios from "axios";
import AppTopbar from "../layout/AppTopbar";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { Field, Form } from "react-final-form";
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
  const [baseURI, setBaseURI] = useState("");
  const [instagenResponse, setinstagenResponse] = useState();
  const [formData, setFormData] = useState({});

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
      detail: "Something Went Wrong Please Try After Some Time",
      life: 10000,
    });
  };
  const instaGenContarctData = () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

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
        console.log("response InstaGen data", response);
        setinstagenResponse(response.data.contractAddress);
        showSuccess();
      })
      .catch((error) => {
        showError();
      })
      .finally(() => {
        setLoading2(false);
        setLoading(false);
      });
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

  const validate = (data) => {
    let errors = {};

    if (!data.contractName) {
      errors.contractName = "Please Fill Insatgen Name.";
      setLoading(false);
    }

    if (!data.contractSymbol) {
      errors.contractSymbol = "Please Add Instagen Symbol";
      setLoading(false);
    }

    if (!data.salePrice) {
      errors.salePrice = "Please Add SalePrice";
      setLoading(false);
    }
    if (!data.saleprePrice) {
      errors.saleprePrice = "Please Add Sale Pre Price";
      setLoading(false);
    }
    if (!data.countdownTime) {
      errors.countdownTime = "Please Add Count Down Time";
      setLoading(false);
    }
    if (!data.maxSupply) {
      errors.maxSupply = "Please Add Max Supply";
      setLoading(false);
    }
    if (!data.royltybps) {
      errors.royltybps = "Please Add Roylty BPS";
      setLoading(false);
    }

    return errors;
  };
  const onSubmit = (data, form) => {
    setFormData(data);
  };
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };
  return (
    <div
      title="Deploy InstaGen"
      description="This is use to show information of the deploy InstaGen contract"
      className="buy-back-image-instagen"
    >
      <AppTopbar />
      <div style={{ marginTop: "65px" }}>
        <div
          className="p-5 font-bold text-align-center text-center"
          style={{ borderBottom: "2px solid" }}
        >
          Deploy InstaGen
        </div>

        <div className="flex justify-content-center gap-5">
          <div className="card mt-5" style={{ width: "50%" }}>
            <div className="flex justify-content-between mt-5">
              {instagenResponse && (
                <div>
                  <Link href="/eturnalsol">
                    <Button
                      label="Continue"
                      severity="Primary"
                      onClick={load}
                      rounded
                      loading={loading2}
                    />
                  </Link>
                </div>
              )}
            </div>

            <Form
              onSubmit={onSubmit}
              initialValues={{
                contractName: "",
                contractSymbol: "",
                salePrice: "",
                saleprePrice: "",
                countdownTime: "",
                maxSupply: "",
                royltybps: "",
              }}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="p-fluid">
                  <Field
                    name="contractName"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div>Enter InstaGen Name</div>
                        <div className="mt-3">
                          <InputText
                            id="contractName"
                            onChange={handleInputName}
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="contractName"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          ></label>
                        </div>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="contractSymbol"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Enter InstaGen Symbol</div>

                        <div className=" p-input-icon-right mt-3">
                          <InputText
                            value={contractSymbol}
                            onChange={handleInputSymbol}
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="contractSymbol"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          ></label>
                        </div>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="salePrice"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Enter SalePrice</div>

                        <div className=" p-input-icon-right mt-3">
                          <InputText
                            value={salePrice}
                            onChange={handleInputSalePrice}
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="salePrice"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          ></label>
                        </div>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="saleprePrice"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Enter Pre SalePrice</div>

                        <div className=" p-input-icon-right mt-3">
                          <InputText
                            value={saleprePrice}
                            onChange={handleInputSalePrePrice}
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="salePrice"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          ></label>
                        </div>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="countdownTime"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Enter Countdown Time</div>

                        <div className=" p-input-icon-right mt-3">
                          <InputText
                            value={countdownTime}
                            onChange={handleInputCountDownTime}
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="countdownTime"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          ></label>
                        </div>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="maxSupply"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Enter Max. Supply</div>

                        <div className=" p-input-icon-right mt-3">
                          <InputText
                            value={maxSupply}
                            onChange={handleInputMaxSupply}
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="maxSupply"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          ></label>
                        </div>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="royltybps"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Enter Royalty BPS</div>

                        <div className=" p-input-icon-right mt-3">
                          <InputText
                            value={royltybps}
                            onChange={handleInputRoyelty}
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="royltybps"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          ></label>
                        </div>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <div className="flex mt-5 justify-content-between">
                    <div>
                      <Button
                        label="Deploy Instagen Contract"
                        onClick={instaGenContarctData}
                        severity="Primary"
                        className=" mt-7 w-full"
                        style={{ width: "30%" }}
                        rounded
                        type="submit"
                        loading={loading}
                      />
                    </div>
                    {instagenResponse && (
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
                </form>
              )}
            />
            <Toast ref={toast} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Instagen);
