import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { NFTStorage } from "nft.storage";
import Router from "next/router";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import AppTopbar from "../layout/AppTopbar";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Field, Form } from "react-final-form";
import { classNames } from "primereact/utils";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });

export default function AddSubscription() {
  const [selecteBlockchaine, setselectedBlockchaine] = useState(null);
  const blockchain = [
    { name: "Polygon", value: "Polygon" },
    { name: "Ethereum", value: "Ethereum" },
  ];
  const { address } = useAccount();

  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [formData, setFormData] = useState({});

  const [contractName, setContarctName] = useState("");
  const [description, setdescription] = useState();
  const [headline, setHeadline] = useState();
  const [storefrontResponase, setstorefrontResponase] = useState();
  const [errors, setErrors] = useState(true)

  const [uploadImage, setuploadImage] = useState("");
  async function uploadBlobGetHash(file) {
    try {
      const blobDataImage = new Blob([file]);
      const metaHash = await client.storeBlob(blobDataImage);
      return metaHash;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const getMetaHashURI = (metaHash) => `ipfs://${metaHash}`;

  async function onChangeThumbnail(e) {
    const file = e.files[0];
    console.log("Uploaded file...", file);
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setuploadImage(metaHashURI);
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setLoading2(false);
      setLoading(false);
    }
  }

  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  const getSubscriptionData = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${BASE_URL_LAUNCH}api/v1.0/storefront`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log("Error in Fetching subscription..!", error);
    }
  };

  const addSubscription = async () => {
    const storefronts = await getSubscriptionData();
validate();
    const { contractName, headline, description } = formData;
    if (storefronts.find((sf) => sf.string?.toLowerCase() === contractName?.toLowerCase())) {
      alert(`Storefront '${contractName}' already exist`);

      return;
    }
    const token = localStorage.getItem("authToken");
    setLoading(true);
    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/storefront`,
        {
          name: contractName,
          owner: address,
          createdBy: "Admin",
          updatedBy: "Admin",
          image: uploadImage,
          headline: headline,
          description: description,
          blockchain: selecteBlockchaine,
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
        setstorefrontResponase(response);
        showSticky();
       
      })

      .catch((error) => {
        showError();
      }).finally(()=>{
        setLoading(false);
        setLoading2(false);
      })
  };
  const handleInputContractName = (e) => {
    setContarctName(e.target.value);
  };
  const handleInputDescription = (e) => {
    setdescription(e.target.value);
  };
  const handleInputHeadline = (e) => {
    setHeadline(e.target.value);
  };

  const showSticky = () => {
    toast.current.show({
      severity: "success",
      detail:
        "You have assumed the role of administrator.The deployment of Flow access master has been completed successfully.",
      sticky: true,
    });
  };
 
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error ",
      detail: "Some Thing Went Wrong Please try After Some Time",
      sticky: true,
    });
  };
  const validate = (data) => {
    let errors = {};
    if (!data?.contractName) {
      errors.contractName = "Please Fill Storefront Name.";
      setLoading(false);
    }
    if (!data && data?.contractName?.length === 0) {
      errors.contractName = "Name is not Empty.";
      setLoading(false);
    }

    console.log("errors",errors);
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
    <div>
      <AppTopbar />
      <div className="buy-back-image" style={{ marginTop: "68px" }}>
        <div className="font-bold text-3xl p-5 text-white text-center">
          Add StoreFront Details
        </div>
        <Toast ref={toast} />
        <hr></hr>

        <div
          className=" p-5 mt-5 font-bold card flex gap-5"
          style={{ width: "80%", margin: "0 auto" }}
        >
          <div>
            <div style={{ padding: "20px", border: "1px solid" }}>
              <FileUpload
                type="file"
                onSelect={(event) => {
                  onChangeThumbnail(event);
                }}
                uploadHandler={(e) =>
                  console.log("File upload handler", e.files)
                }
                value={uploadImage}
                accept="image/*"
                maxFileSize={1000000}
              />
            </div>
          </div>
          <div className="w-full">
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="p-fluid">
                  <Field
                    name="contractName"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div>StoreFront Name(must be unique)</div>
                        <div className="mt-3">
                          <InputText
                            id="contractName"
                            onChange={handleInputContractName}
                            value={contractName}
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
                    name="selecteBlockchaine"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Blockchain</div>

                        <div className=" p-input-icon-right mt-3">
                          <Dropdown
                            value={selecteBlockchaine}
                            onChange={(e) => setselectedBlockchaine(e.value)}
                            options={blockchain}
                            optionLabel="name"
                            placeholder="Select Blockchain "
                            className="w-full input-back"
                          />
                        </div>
                      </div>
                    )}
                  />
                  <Field
                    name="headline"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Headline</div>

                        <div className=" p-input-icon-right mt-3">
                          <InputText
                            value={headline}
                            onChange={handleInputHeadline}
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="headline"
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
                    name="description"
                    render={({ input, meta }) => (
                      <div className="field">
                        <div className="mt-5">Description</div>

                        <div className=" p-input-icon-right mt-3">
                          <InputText
                            value={description}
                            onChange={handleInputDescription}
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="description"
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
                        label="Add Storefront"
                        onClick={addSubscription}
                        severity="Primary"
                        className=" mt-7 w-full"
                        style={{ width: "30%" }}
                        rounded
                        type="submit"
                        loading={loading}
                      />
                    </div>
                    {storefrontResponase && (
                      <div>
                        <Link href="/step1">
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
}
