import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useContext, useRef, useState } from "react";
import { NFTStorage } from "nft.storage";
import AppTopbar from "../layout/AppTopbar";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import { LayoutContext } from "../layout/context/layoutcontext";
import Router,{ useRouter, withRouter } from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });
function WebappForm(props) {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [stfName, setStfName] = useState();
  const [stfdescription, setstfdescription] = useState();
  const [stfheadline, setstfheadline] = useState();
  const [tagline, settagline] = useState();
  const [tagdescription, settagdescription] = useState();
  const [email, setEmail] = useState();
  const [twitter, settwitter] = useState();
  const [discord, setdiscord] = useState();
  const [instagram, setinstagram] = useState();
  const router=useRouter();
  const [errors, setErros] = useState({
    stfNameError: "",
    stfdescriptionError: "",
    stfheadlineError: "",
    taglineError: "",
    tagdescriptionError: "",
    emailError: "",
    twitterError: "",
    discordError: "",
    instagramError: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [uploadImageProfile, setuploadImageProfile] = useState("");
  const [uploadImageCover, setuploadImageCover] = useState("");
  const [uploadImageRelavent, setuploadImageRelavent] = useState("");
  const { layoutConfig } = useContext(LayoutContext);
 
  const addMarketplaceDetails = async () => {
    // Router.push({pathname:"/successNoteContract",query:{redirectURL:'http://3.144.253.205:8000/subgraphs/name/alka/iidd/graphql'}})

    const token = localStorage.getItem("platform_token");
    const valid = onClickButton();
    if (valid) {
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/storefront/deploy`,
          {
            name: stfName,
            id: props.router.query.storefrontId,
            network: "mumbai",
            protocol: "ethereum",
            tag: "v1",
            headline: stfheadline,
            description: stfdescription,
            profileImage: uploadImageProfile,
            coverImage: uploadImageCover,
            personalTagline: tagline,
            personalDescription: tagdescription,
            relevantImage: uploadImageRelavent,
            mailId: email,
            twitter: twitter,
            discord: discord,
            instagram: instagram,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (response) => {
          const str = response.data.payload.graphUrl
          const finalString =str.slice(0,str.indexOf("graphql"))+"graphql"
          showSuccess();
          setTimeout(() => {
            setLoading(false);
            router.push({pathname: "/successNoteContract",query: { storefrontId: props?.router?.query?.storefrontId,query:{redirectURL: finalString }}})
          }, 2000);
        })
        .catch((error) => {
          console.log('error while deploying storefront',error)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const load2 = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
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
      detail: "Marketplace Details added successfully",
      life: 1000,
    });
  };


  const onClickButton = () => {
    if (!stfName) {
      setErros({ stfNameError: "Please Enter Storefront Name" });
      return false;
    } else if (!stfdescription) {
      setErros({ stfdescriptionError: "Please Enter Storefront Description" });
      return false;
    } else if (!stfheadline) {
      setErros({ stfheadlineError: "Please Enter Storefront Headline" });
      return false;
    } else if (!tagline) {
      setErros({ taglineError: "Please Enter Tagline" });
      return false;
    } else if (!tagdescription) {
      setErros({ tagdescriptionError: "Please Enter Tagline Description" });
      return false;
    } else if (!email) {
      setErros({ emailError: "Please Enter Correct Email" });
      return false;
    } else if (!twitter) {
      setErros({ twitterError: "Please Enter Tweeter Id" });
      return false;
    } else if (!discord) {
      setErros({ discordError: "Please Enter Discord Id" });
      return false;
    } else if (!instagram) {
      setErros({ instagramError: "Please Enter Instagram Id" });
      return false;
    } else if (
      stfName &&
      stfdescription &&
      stfheadline &&
       tagline &&
      tagdescription &&
      email &&
      twitter &&
      discord &&
      instagram
    ) {
      setSubmitClicked(true);
      setLoading(true);
      return true;
    }
  };

  const showErroruploadBlob = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While Uploading Blob Image",
      life: 10000,
    });
  };
  const showErroruploadImage = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While Uploading  Image",
      life: 10000,
    });
  };
  async function uploadBlobGetHash(file) {
    try {
      const blobDataImage = new Blob([file]);
      const metaHash = await client.storeBlob(blobDataImage);
      return metaHash;
    } catch (error) {
      showErroruploadBlob();
    }
  }

  const getMetaHashURI = (metaHash) => `ipfs://${metaHash}`;

  async function onChangeThumbnailProfile(e) {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setuploadImageProfile(metaHashURI);
    } catch (error) {
      showErroruploadImage();
    } finally {
      setLoading(false);
    }
  }

  async function onChangeThumbnailCover(e) {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setuploadImageCover(metaHashURI);
    } catch (error) {
      showErroruploadImage();
    } finally {
      setLoading(false);
    }
  }

  async function onChangeThumbnailRelavent(e) {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setuploadImageRelavent(metaHashURI);
    } catch (error) {
      showErroruploadImage();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <AppTopbar />
      <div  className={`${layoutConfig.colorScheme === 'light' ? 'buy-back-image-webapp-form' : 'dark'}`}>
        <div className="font-bold text-3xl p-5 text-center">
          Make Your Marketplace Shine
        </div>
        <Toast ref={toast} />

        <hr></hr>
        <div className="flex">
          <div
            className=" p-5 mt-5 back-color  gap-5"
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
                className="p-2  input-back w-full"
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
                className="p-2  input-back w-full"
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
                className="p-2 input-back w-full"
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!stfheadline ? errors.stfheadlineError : ""}
              </p>
            </div>
            <div className="flex justify-content-between">
              <div className="mt-5">Upload Profile Image:</div>
              <div className="mt-5">Upload Cover Image:</div>
            </div>
            <div className="flex justify-content-between">
              <div
                className="mt-3"
                style={{ padding: "20px", border: "1px solid" }}
              >
                <FileUpload
                  type="file"
                  onSelect={(event) => {
                    onChangeThumbnailProfile(event);
                  }}
                  uploadHandler={(e) =>
                    console.log("File upload handler", e.files)
                  }
                  value={uploadImageProfile}
                  accept="image/*"
                  maxFileSize={1000000}
                />
              </div>

              <div
                className="mt-3"
                style={{ padding: "20px", border: "1px solid" }}
              >
                <FileUpload
                  type="file"
                  onSelect={(event) => {
                    onChangeThumbnailCover(event);
                  }}
                  uploadHandler={(e) =>
                    console.log("File upload handler", e.files)
                  }
                  value={uploadImageCover}
                  accept="image/*"
                  maxFileSize={1000000}
                />
              </div>
            </div>

            


           


           
            <div className="mt-5 text-center text-3xl font-bold">
              Personal information
            </div>

            <div className="mt-5">Enter Tagline:</div>

            <div className="  mt-2">
              <InputText
                value={tagline}
                onChange={handleInputtagline}
                className="p-2 input-back w-full"
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
                className="p-2 input-back w-full"
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
                className="p-2 input-back w-full"
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
                className="p-2 input-back w-full"
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
                className="p-2 input-back w-full"
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
                className="p-2 input-back w-full"
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!instagram ? errors.instagramError : ""}
              </p>
            </div>

            <div className="flex mt-5 justify-content-center gap-5">
              <div></div>
              <div className="mt-5 ">
                <Button
                  loading={loading}
                  onClick={addMarketplaceDetails}
                  label="Submit"
                  className="buy-img"
                ></Button>
              </div>
              {/* <div className="mt-5 ">
                <Link href="/successNoteContract">
                  <Button
                    className="buy-img"
                    loading={loading2}
                    onClick={load2}
                    label="Continue"
                  ></Button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default  withRouter(WebappForm)
