import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { NFTStorage } from "nft.storage";
import { useContext, useEffect, useRef, useState } from "react";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Sidemenu from "./sidemenu";
import { LayoutContext } from "../layout/context/layoutcontext";
import LayoutDashbord from "../Components/LayoutDashbord";
import axios from "axios";
import { withRouter } from "next/router";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });
function MarkeplaceDetailsForm(props) {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [stfName, setStfName] = useState();
  const [sftregion, setsftRegion] = useState();
  const [sfttype, setStType] = useState();
  const [sftcategory, setStfCategory] = useState();
  const [stftag, setStfTag] = useState();
  const [stfdescription, setstfdescription] = useState();
  const [stfheadline, setstfheadline] = useState();
  const [tagline, settagline] = useState();
  const [tagdescription, settagdescription] = useState();
  const [email, setEmail] = useState();
  const [twitter, settwitter] = useState();
  const [discord, setdiscord] = useState();
  const [instagram, setinstagram] = useState();
  const { layoutConfig } = useContext(LayoutContext);
  const [visible, setVisible] = useState(false);

  const [webappData, setWebappData] = useState("");
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
    stfcategoryError: "",
    stftagError: "",
    stftypeError: "",
    stfregionError: "",
  });

  const [submitClicked, setSubmitClicked] = useState(false);
  const [uploadImageProfile, setuploadImageProfile] = useState("");
  const [uploadImageCover, setuploadImageCover] = useState("");
  const [uploadImageRelavent, setuploadImageRelavent] = useState("");

  const [uploadImage, setuploadImage] = useState("");
  async function uploadBlobGetHash(file) {
    try {
      const blobDataImage = new Blob([file]);
      const metaHash = await client.storeBlob(blobDataImage);
      return metaHash;
    } catch (error) {}
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

  async function onChangeThumbnail(e) {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setuploadImage(metaHashURI);
    } catch (error) {}
  }

  const handleInputContractName = (e) => {
    setStfName(e.target.value);
    setWebappData(e.target.value);
  };

  const handleInputDescription = (e) => {
    setstfdescription(e.target.value);
    setWebappData(e.target.value);
  };
  const handleInputstfHeadline = (e) => {
    setstfheadline(e.target.value);
    setWebappData(e.target.value);
  };
  const handleInputstfregion = (e) => {
    setsftRegion(e.target.value);
    setWebappData(e.target.value);
  };
  const handleInputstftype = (e) => {
    setStType(e.target.value);
    setWebappData(e.target.value);
  };
  const handleInputstftag = (e) => {
    setStfTag(e.target.value);
    setWebappData(e.target.value);
  };
  const handleInputstfcategory = (e) => {
    setStfCategory(e.target.value);
    setWebappData(e.target.value);
  };

  const handleInputtagline = (e) => {
    settagline(e.target.value);
    setWebappData(e.target.value);
  };
  const handleInputtagdescription = (e) => {
    settagdescription(e.target.value);
    setWebappData(e.target.value);
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
    setWebappData(e.target.value);
  };

  const handleInputtweeter = (e) => {
    settwitter(e.target.value);
    setWebappData(e.target.value);
  };
  const handleInputdiscord = (e) => {
    setdiscord(e.target.value);
    setWebappData(e.target.value);
  };
  const handleInputinstagram = (e) => {
    setinstagram(e.target.value);
    setWebappData(e.target.value);
  };

  useEffect(() => {
    getallsigseriesContract();
  }, []);

  const getallsigseriesContract = () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(
        `${BASE_URL_LAUNCH}api/v1.0/storefront/get_storefront_by_id?id=${props.router.query.storefrontId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        console.log("response", response.data.payload);
        setWebappData(response.data.payload);
      })

      .catch((error) => {
        console.log("error while get storefront by id", error);
      });
  };

  const updateMarketplaceDetails = async () => {
    const token = localStorage.getItem("platform_token");

    axios
      .put(
        `${BASE_URL_LAUNCH}api/v1.0/storefront`,
        {
          name: stfName,
          id: props?.router?.query?.storefrontId,
          updatedBy: "",
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
          region: sftregion,
          type: sfttype,
          category: sftcategory,
          tags: stftag,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        setLoading(false);
        setVisible(true);
      })

      .catch((error) => {
        console.log("error while updating storefront details", error);
      });
  };

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
  return (
    <LayoutDashbord
      title="Web App "
      description="Used to Show Details of the Web App"
    >
      <MarketplaceProfileDetails id={props?.router?.query?.storefrontId} />
      <div>
        <div>
          <Toast ref={toast} />

          <hr></hr>
          <div className="flex">
            <div>
              <Sidemenu />
            </div>
            <Dialog
              visible={visible}
              style={{ width: "25vw", height: "15vw" }}
              onHide={() => setVisible(false)}
            >
              <div className="text-center">
                <div className="mt-3 text-xl">
                  Your Webapp is successfully Updated
                </div>
              </div>
            </Dialog>
            <div
              className={`${
                layoutConfig.colorScheme === "light"
                  ? "back-color"
                  : "back-color-black"
              }  p-5 mt-5 gap-5`}
              style={{ width: "65%", margin: "0 auto" }}
            >
              <div className="font-bold text-3xl p-5 text-centerp-heading text-center">
                Make Your Marketplace Shine
              </div>
              <div className="mt-5 text-center font-bold text-3xl">
                Storefront Details
              </div>

              <div className="mt-5">Enter Storefront Name:</div>
              <div className="mt-2">
                <InputText
                  id="stfName"
                  onChange={handleInputContractName}
                  value={webappData.name ? webappData.name : stfName}
                  className="p-2  input-back w-full"
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!stfName ? errors.stfNameError : ""}
                </p>
              </div>

              <div className="mt-5 text-left">Enter description:</div>

              <div className="  mt-2">
                <InputText
                  value={
                    webappData.description
                      ? webappData.description
                      : stfdescription
                  }
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
                  value={
                    webappData.headline ? webappData.headline : stfheadline
                  }
                  onChange={handleInputstfHeadline}
                  className="p-2 input-back w-full"
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!stfheadline ? errors.stfheadlineError : ""}
                </p>
              </div>

              <div className="flex mt-5 justify-content-between">
                <div>Region</div>
                <div>Type</div>
              </div>
              <div className="flex justify-content-between">
                <div className="  mt-2" style={{ width: "45%" }}>
                  <InputText
                    value={webappData.region ? webappData.region : sftregion}
                    onChange={handleInputstfregion}
                    className="p-2 input-back w-full"
                  />
                  <p style={{ textAlign: "left", color: "red" }}>
                    {!sftregion ? errors.stfregionError : ""}
                  </p>
                </div>
                <div className="  mt-2" style={{ width: "45%" }}>
                  <InputText
                    value={webappData.type ? webappData.type : sfttype}
                    onChange={handleInputstftype}
                    className="p-2 input-back w-full"
                  />
                  <p style={{ textAlign: "left", color: "red" }}>
                    {!sfttype ? errors.stftypeError : ""}
                  </p>
                </div>
              </div>
              <div className="flex mt-5 justify-content-between">
                <div>Category</div>
                <div>tag</div>
              </div>
              <div className="flex justify-content-between ">
                <div className="  mt-2" style={{ width: "45%" }}>
                  <InputText
                    value={
                      webappData.category ? webappData.category : sftcategory
                    }
                    onChange={handleInputstfcategory}
                    className="p-2 input-back w-full"
                  />
                  <p style={{ textAlign: "left", color: "red" }}>
                    {!sftcategory ? errors.stfcategoryError : ""}
                  </p>
                </div>
                <div className="  mt-2" style={{ width: "45%" }}>
                  <InputText
                    value={webappData.tags ? webappData.tags : stftag}
                    onChange={handleInputstftag}
                    className="p-2 input-back w-full"
                  />
                  <p style={{ textAlign: "left", color: "red" }}>
                    {!stftag ? errors.stftagError : ""}
                  </p>
                </div>
              </div>

              <div className="flex justify-content-between mt-5">
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
                    value={
                      webappData.profileImage
                        ? webappData.profileImage
                        : uploadImageProfile
                    }
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
                    value={
                      webappData.coverImage
                        ? webappData.coverImage
                        : uploadImageCover
                    }
                    accept="image/*"
                    maxFileSize={1000000}
                  />
                </div>
              </div>
              <div className="mt-5">Upload Relevent Image</div>
              <div
                className="mt-2"
                style={{ padding: "20px", border: "1px solid" }}
              >
                <FileUpload
                  type="file"
                  onSelect={(event) => {
                    onChangeThumbnailRelavent(event);
                  }}
                  uploadHandler={(e) =>
                    console.log("File upload handler", e.files)
                  }
                  value={
                    webappData.relevantImage
                      ? webappData.relevantImage
                      : uploadImageRelavent
                  }
                  accept="image/*"
                  maxFileSize={1000000}
                />
              </div>

              <div className="mt-5 text-center text-3xl font-bold">
                Personal information
              </div>

              <div className="mt-5">Enter Tagline:</div>

              <div className="  mt-2">
                <InputText
                  value={
                    webappData.personalTagline
                      ? webappData.personalTagline
                      : tagline
                  }
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
                  value={
                    webappData.personalDescription
                      ? webappData.personalDescription
                      : tagdescription
                  }
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
                  value={webappData.mailId ? webappData.mailId : email}
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
                  value={webappData.twitter ? webappData.twitter : twitter}
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
                  value={webappData.discord ? webappData.discord : discord}
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
                  value={webappData.instagram}
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
                    type="submit"
                    loading={loading}
                    onClick={updateMarketplaceDetails}
                    label="Submit"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(MarkeplaceDetailsForm);
