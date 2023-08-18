import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import { useRouter, withRouter } from "next/router";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import AppTopbar from "../layout/AppTopbar";
import { Toast } from "primereact/toast";
import Link from "next/link";
import { Field, Form } from "react-final-form";
import { classNames } from "primereact/utils";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const EternumPass = () => {
  const router = useRouter();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [formData, setFormData] = useState({});
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [platformFeeBasePrice, setplatformFeeBasePrice] = useState("");
  const [subspricePerMonth, setSubspricePerMonth] = useState("");
  const [royltybps, setRoyltybps] = useState("");
  const [selecteOperatorSubscription, setOperatorSubscription] = useState(null);
  const subscriptions = [
    { name: "YES", value: "YES" },
    { name: "NO", value: "No" },
  ];
  const showSuccess=()=> {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Your Eternumpass contract has been  successfully deployed",
      life: 10000,
    });
  }
  const showError=()=> {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Something Went Wrong Please Try After Some Time",
      life: 10000,
    });
  }
  const [eturnumpassResponse, setEturnumpassResponse] = useState();
  const eturnumpassContarctData = () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
        {  contractName: "EternumPass",
        constructorParams: {
          param1: contractName,
          param2: contractSymbol,
          param3: "www.xyz.com",
          param4: salePrice,
          param5: platformFeeBasePrice,
          param6: subspricePerMonth,
          param7: royltybps,
          param8: true,
          param9: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
          param10: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
        }, network: "maticmum" },
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
        console.log("response EternumPass data", response);
        setEturnumpassResponse(response.data.contractAddress);
       showSuccess()
      })

      .catch((error) => {
        showError()
      }).finally(() => {
        setLoading(false);
        setLoading2(false);
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
  const validate = (data) => {
    let errors = {};

    if (!data.contractName) {
      errors.contractName = "Please Fill Eturnumpass Name.";
      setLoading(false);
    }

    if (!data.contractSymbol) {
      errors.contractSymbol = "Please Add Eturnumpass Symbol";
      setLoading(false);
    }

    if (!data.salePrice) {
      errors.salePrice = "Please Add SalePrice";
      setLoading(false);
    }
   
    if (!data.platformFeeBasePrice) {
      errors.platformFeeBasePrice = "Please Add Platform Fees Base price";
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
      className="back-img-eternumpass"
    >
      <AppTopbar/>
      <Toast ref={toast}/>

      <div style={{ marginTop: "85px" }}>
        <div className="p-5 font-bold text-align-center text-center" style={{ borderBottom: "2px solid" }}>Deploy EternumPass</div>
       
        <div className="flex justify-content-center gap-5 mt-5">
           <div className="card" style={{ width: "50%" }}>
          
                        <Form
              onSubmit={onSubmit}
              initialValues={{
                contractName: "",
                contractSymbol: "",
                salePrice: "",
                platformFeeBasePrice: "",
                royltybps: "",
              }}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="p-fluid">
                  <Field
                    name="contractName"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div>Enter EternumPass Name</div>
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
                        <div className="mt-5">Enter EternumPass Symbol</div>

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
                    name="platformFeeBasePrice"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Enter Platform Fees Base Price</div>

                        <div className=" p-input-icon-right mt-3">
                          <InputText
                            value={platformFeeBasePrice}
                            onChange={handleInputPlatformFee}
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="platformFeeBasePrice"
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
                   <Field
                    name="contractName"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div>Enter Operator Suscription</div>
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
                      </div>
                    )}
                  />
                  <div className="flex mt-5 justify-content-between">
                    <div>
                      <Button
                        label="Deploy Instagen Contract"
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
          </div> 

        </div>
      </div>
    </div>
  );
};

export default withRouter(EternumPass);
