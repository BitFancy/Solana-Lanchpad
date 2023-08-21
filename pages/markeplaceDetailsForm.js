import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
// import React, {  useState } from 'react';
import { NFTStorage } from "nft.storage";
import Link from "next/link";
import { useRef, useState } from "react";
import Layout from "../Components/Layout";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Sidemenu from "./sidemenu";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });
export default function MarkeplaceDetailsForm() {
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

  const [errors, setErros] = useState({
    stfNameError: "",
    stfdescriptionError: "",
    stfheadlineError:"",
    assetsNameError:"",
    assetsDeascriptionError:"",
    taglineError:"",
    tagdescriptionError:"",
    emailError:"",
    twitterError:"",
    discordError:"",
    instagramError:"",
  });

  
  const [submitClicked, setSubmitClicked] = useState(false);
  const [uploadImage, setuploadImage] = useState("");
  async function uploadBlobGetHash(file) {
    try {
      const blobDataImage = new Blob([file]);
      const metaHash = await client.storeBlob(blobDataImage);
      return metaHash;
    } catch (error) {

    }
  }
  const getMetaHashURI = (metaHash) => `ipfs://${metaHash}`;

  async function onChangeThumbnail(e) {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setuploadImage(metaHashURI);
    } catch (error) {
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

 

  const onClickButton = () => {
    if (stfName && stfdescription && stfheadline && assetsName && assetsDeascription && tagline && tagdescription && email && twitter && discord && instagram) {
      setSubmitClicked(true);
    } else {
      if (!stfName) {
        setErros({ stfNameError: "Please Enter Storefront Name" });
      }
      if (!stfdescription) {
        setErros({ stfdescriptionError: "Please Enter Storefront Description" });
      }
      if (!stfheadline) {
        setErros({ stfheadlineError: "Please Enter Storefront Headline" });
      }
      if (!assetsName) {
        setErros({ assetsNameError: "Please Enter Assets Name" });
      }
      if (!assetsDeascription) {
        setErros({ assetsDeascriptionError: "Please Enter Assets Description" });
      }
      if (!tagline) {
        setErros({ taglineError: "Please Enter Tagline" });
      }
      if (!tagdescription) {
        setErros({ tagdescriptionError: "Please Enter Tagline Description" });
      }
      if (!email) {
        setErros({ emailError: "Please Enter Correct Email" });
      }
      if (!twitter) {
        setErros({ twitterError: "Please Enter Tweeter Id" });
      }
      if (!discord) {
        setErros({ discordError: "Please Enter Discord Id" });
      }
      if (!instagram) {
        setErros({ instagramError: "Please Enter Instagram Id" });
      }
      setSubmitClicked(false);

    }
  };
  return (
    <Layout>
      <MarketplaceProfileDetails />
      <div>
        <div className="buy-back-image-webapp-form">
          <div className="font-bold text-3xl p-5 text-center">
            Make Your Marketplace Shine
          </div>
          <Toast ref={toast} />

          <hr></hr>
          <div className="flex">
            <div>
              <Sidemenu />
            </div>

            <div
              className=" p-5 mt-5  card  gap-5"
              style={{ width: "80%", margin: "0 auto" }}
            >
              <div className="mt-5 text-center font-bold text-3xl">
                Storefront Details
              </div>

              <div className="mt-5">Enter Storefront Name:</div>
              <div className="mt-2">
                <InputText
                  id="stfName"
                  onChange={handleInputContractName}
                  value={stfName}
                  className="p-2  input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!stfName ? errors.stfNameError : ""}
            </p>
              </div>

              <div className="mt-5 text-left">Enter description:</div>

              <div className="  mt-2">
                <InputText
                  value={stfdescription}
                  onChange={handleInputDescription}
                  className="p-2  input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!stfdescription ? errors.stfdescriptionError : ""}
            </p>
              </div>

              <div className="mt-5">Enter Headline:</div>

              <div className="  mt-2">
                <InputText
                  value={stfheadline}
                  onChange={handleInputstfHeadline}
                  className="p-2 input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!stfheadline ? errors.stfheadlineError : ""}
            </p>
              </div>

              <div className="mt-5 text-center font-bold text-3xl">
                Asset Details
              </div>

              <div className="mt-5">Enter Asset name:</div>

              <div className=" mt-2">
                <InputText
                  value={assetsName}
                  onChange={handleInputassetsName}
                  className="p-2 input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!assetsName ? errors.assetsNameError : ""}
            </p>
              </div>

              <div className="mt-5">Enter Asset Description:</div>

              <div className="  mt-2">
                <InputText
                  value={assetsDeascription}
                  onChange={handleInputassetsDescription}
                  className="p-2  input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!assetsDeascription ? errors.assetsDeascriptionError : ""}
            </p>
              </div>

              <div className="mt-5 text-center text-3xl font-bold">
                Personal information
              </div>

              <div className="mt-5">Enter Tagline:</div>

              <div className="  mt-2">
                <InputText
                  value={tagline}
                  onChange={handleInputtagline}
                  className="p-2 input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!tagline ? errors.taglineError : ""}
            </p>
              </div>

              <div className="mt-5">Enter Tag Description:</div>

              <div className="mt-2">
                <InputText
                  value={tagdescription}
                  onChange={handleInputtagdescription}
                  className="p-2 input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!tagdescription ? errors.tagdescriptionError : ""}
            </p>
              </div>

              <div className="mt-5 text-center text-3xl font-bold">
                Contact Details
              </div>

              <div className="mt-5">Enter Mail id</div>

              <div className="mt-2">
                <InputText
                  value={email}
                  onChange={handleInputEmail}
                  className="p-2 input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!email ? errors.emailError : ""}
            </p>
              </div>

              <div className="mt-5 font-bold text-center text-3xl">
                Social links
              </div>

              <div className="mt-5">Twitter :</div>

              <div className="mt-2">
                <InputText
                  value={twitter}
                  onChange={handleInputtweeter}
                  className="p-2 input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!twitter ? errors.twitterError : ""}
            </p>
              </div>

              <div className="mt-5">Discord :</div>

              <div className="mt-2">
                <InputText
                  value={discord}
                  onChange={handleInputdiscord}
                  className="p-2 input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!discord ? errors.discordError : ""}
            </p>
              </div>

              <div className="mt-5">Instagram :</div>

              <div className="mt-2">
                <InputText
                  value={instagram}
                  onChange={handleInputinstagram}
                  className="p-2 input-back w-full text-white"
                />
                  <p style={{ textAlign: "left", color: "red" }}>
              {!instagram ? errors.instagramError : ""}
            </p>
              </div>

              <div className="flex mt-5 justify-content-center gap-5">
                <div></div>
                <div className="mt-5 ">
                  <Button
                    type="submit"
                    loading={loading}
                    onClick={onClickButton}
                    label="Submit"
                  ></Button>
                </div>
                <div className="mt-5 ">
                  <Link href="/successNoteContract">
                    <Button loading={loading} label="Continue"></Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
