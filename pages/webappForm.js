import Link from 'next/link'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useRef, useState } from 'react'
import { Field, Form } from 'react-final-form'
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
import { NFTStorage } from "nft.storage";
import { classNames } from 'primereact/utils'
import AppTopbar from '../layout/AppTopbar'

const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });

export default function WebappForm() {
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [stfName, setStfName] = useState();
    const [stfdescription, setstfdescription] = useState();
    const [stfheadline, setstfheadline] = useState();
    const [assetsName, setassetsName] = useState();
    const [assetsDeascription, setassetsDeascription] = useState();
    const [tagline, settagline] = useState();
    const [tagdescription, settagdescription] = useState();
    const [email, setEmail] = useState();
    const [twitter, settwitter] = useState();
    const [discord, setdiscord] = useState();
    const [instagram, setinstagram] = useState();
    const [formData, setFormData] = useState({});
  
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
      }
    }
  
    const addMarketplaceDetails = async () => {
      const token = localStorage.getItem("authToken");
      setLoading(true);
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/storefront`,
          {
            name: contarctName,
            owner: "asd3rfsdaf2334r23",
            cost: 99,
            currency: "USD",
            createdBy: "Admin",
            updatedBy: "Admin",
            image: uploadImage,
            headline: stfheadline,
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
          showSuccess();
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((error) => {
          showError();
        })
        .finally(() => {
          setLoading(false);
        });
    };
    const handleInputContractName = (e) => {
      setStfName(e.target.value);
    };
  
    const handleInputDescription = (e) => {
      setstfdescription(e.target.value);
    };
    const handleInputstfHeadline = (e) => {
      setstfheadline(e.target.value);
    };
  
    const handleInputassetsName = (e) => {
      setassetsName(e.target.value);
    };
  
    const handleInputassetsDescription = (e) => {
      setassetsDeascription(e.target.value);
    };
  
    const handleInputtagline = (e) => {
      settagline(e.target.value);
    };
    const handleInputtagdescription = (e) => {
      settagdescription(e.target.value);
    };
  
    const handleInputEmail = (e) => {
      setEmail(e.target.value);
    };
  
    const handleInputtweeter = (e) => {
      settwitter(e.target.value);
    };
    const handleInputdiscord = (e) => {
      setdiscord(e.target.value);
    };
    const handleInputinstagram = (e) => {
      setinstagram(e.target.value);
    };
  
    const showSuccess = () => {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Marketplace Deials added successfully",
        life: 1000,
      });
    };
    const showError = () => {
      toast.current.show({
        severity: "error",
        summary: "Error ",
        detail: "Storefront Name Must be Unique",
        life: 1000,
      });
    };
  
    const validate = (data) => {
      let errors = {};
  
      if (!data.stfName) {
        errors.stfName = "Please Enter Storefront Name.";
        setLoading(false);
      }
  
      if (!data.stfdescription) {
        errors.stfdescription = "Please Enter Storefront Description";
        setLoading(false);
      }
  
      if (!data.stfheadline) {
        errors.stfheadline = "Please Enter Headline";
        setLoading(false);
      }
      if (!data.assetsName) {
        errors.assetsName = "Please Enter Assets Name";
        setLoading(false);
      }
      if (!data.assetsDeascription) {
        errors.assetsDeascription = "Please Enter Assets Description";
        setLoading(false);
      }
      if (!data.tagline) {
        errors.tagline = "Please Enter Tagline";
        setLoading(false);
      }
      if (!data.tagdescription) {
        errors.tagdescription = "Please Enter Tag Description";
        setLoading(false);
      }
      if (!data.email) {
        errors.email = "Please Fill the correct Mail Id";
        setLoading(false);
      }
      if (!data.twitter) {
        errors.twitter = "Please Enter the Tweeter Id";
        setLoading(false);
      }
      if (!data.discord) {
        errors.discord = "Please Enter the Discord Id";
        setLoading(false);
      }
      if (!data.instagram) {
        errors.instagram = "Please Enter the Instagram Id";
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
    <div>
          <AppTopbar/>
    <div  className='buy-back-image-webapp-form'>
      
        <div
          className=" p-5 mt-5  card  gap-5 "
          style={{ width: "80%", margin: "0 auto" }}
        >
             <div className="font-bold text-3xl p-5 text-center">
          Make Your Marketplace Shine
        </div>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              stfName: "",
              stfdescription: "",
              stfheadline: "",
              assetsName: "",
              assetsDeascription: "",
              tagline: "",
              tagdescription: "",
              email: "",
              twitter: "",
              discord: "",
              instagram: "",
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <div className="mt-5 text-center font-bold text-3xl">
                  Storefront Details
                </div>
                <Field
                  name="stfName"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Enter Storefront Name:</div>
                      <div className="mt-3">
                        <InputText
                          id="stfName"
                          onChange={handleInputContractName}
                          value={stfName}
                          {...input}
                          autoFocus
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="stfName"
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
                  name="stfdescription"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5 text-left">Enter description:</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={stfdescription}
                          onChange={handleInputDescription}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="stfdescription"
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
                  name="stfheadline"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Enter Headline:</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={stfheadline}
                          onChange={handleInputstfHeadline}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="stfheadline"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        ></label>
                      </div>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <div className="mt-5 text-center font-bold text-3xl">
                  Asset Details
                </div>
                <Field
                  name="assetsName"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Enter Asset name:</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={assetsName}
                          onChange={handleInputassetsName}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="assetsName"
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
                  name="assetsDeascription"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Enter Asset Description:</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={assetsDeascription}
                          onChange={handleInputassetsDescription}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="assetsDeascription"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        ></label>
                      </div>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <div className="mt-5 text-center text-3xl font-bold">
                  Personal information
                </div>

                <Field
                  name="tagline"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Enter Tagline:</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={tagline}
                          onChange={handleInputtagline}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="tagline"
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
                  name="tagdescription"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Enter Tag Description:</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={tagdescription}
                          onChange={handleInputtagdescription}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="tagdescription"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        ></label>
                      </div>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <div className="mt-5 text-center text-3xl font-bold">
                  Contact Details
                </div>
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Enter Mail id</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={email}
                          onChange={handleInputEmail}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="email"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        ></label>
                      </div>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <div className="mt-5 font-bold text-center text-3xl">
                  Social links
                </div>
                <Field
                  name="twitter"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Twitter :</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={twitter}
                          onChange={handleInputtweeter}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="twitter"
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
                  name="discord"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Discord :</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={discord}
                          onChange={handleInputdiscord}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="discord"
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
                  name="instagram"
                  render={({ input, meta }) => (
                    <div className="field">
                      <div className="mt-5">Instagram :</div>

                      <div className=" p-input-icon-right mt-3">
                        <InputText
                          value={instagram}
                          onChange={handleInputinstagram}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="instagram"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        ></label>
                      </div>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <div className="flex mt-5 justify-content-center gap-5">
                  <div></div>
                  <div className="mt-5 ">
                      <Button
                        type="submit"
                        loading={loading}
                        label="Submit"
                      ></Button>
                  </div>
                  <div className="mt-5 ">
                    <Link href="/successNoteContract">
                      <Button
                        loading={loading}
                        label="Continue"
                      ></Button>
                    </Link>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
    </div>
    </div>
  )
}
