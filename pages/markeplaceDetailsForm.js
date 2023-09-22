import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { NFTStorage } from "nft.storage";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import Sidemenu from "./sidemenu";
import { LayoutContext } from "../layout/context/layoutcontext";
import LayoutDashbord from "../Components/LayoutDashbord";
import axios from "axios";
import { withRouter } from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });
 function MarkeplaceDetailsForm(props) {

  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [stfName, setStfName] = useState();
  const [stfdescription, setstfdescription] = useState();
  const [stfheadline, setstfheadline] = useState();
  const [tagline, settagline] = useState();
  const [tagdescription, settagdescription] = useState();
  const [email, setEmail] = useState();
  const [twitter, settwitter] = useState();
  const [discord, setdiscord] = useState();
  const [instagram, setinstagram] = useState();
  const { layoutConfig } = useContext(LayoutContext);
  const [webappData, setWebappData] = useState([]);
  const [errors, setErros] = useState({
    stfNameError: "",
    stfdescriptionError: "",
    stfheadlineError:"",
    taglineError:"",
    tagdescriptionError:"",
    emailError:"",
    twitterError:"",
    discordError:"",
    instagramError:"",
  });

  
  const [submitClicked, setSubmitClicked] = useState(false);
  const [uploadImageProfile, setuploadImageProfile] = useState("");
  const [uploadImageCover, setuploadImageCover] = useState("");
  const [uploadImageRelavent, setuploadImageRelavent] = useState("");

  const [uploadImage, setuploadImage] = useState("");
  console.log('sft id in market de',props)
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
  const updateMarketplaceDetails = async (e) => {
    const token = localStorage.getItem("platform_token");
    const username=localStorage.getItem('userName');
    let resultName = username.concat("/", stfName);
    var product={
      name: resultName,
      storefrontId: props?.router?.query?.storefrontId,
      network: "mumbai",
      protocol: "ethereum",
      tag: "v1",
      storefrontName: stfName,
      headline: stfheadline,
      description: stfdescription,
      profileImage:uploadImageProfile,
      coverImage: uploadImageCover,
      personalTagline: tagline,
      personalDescription: tagdescription,
      relevantImage: uploadImageRelavent,
      mailId: email,
      twitter: twitter,
      discord: discord,
      instagram: instagram
    }
    const config = {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
   const responseData= axios.patch( `${BASE_URL_LAUNCH}api/v1.0/storefront`, product, { config })
      .then(response => {
        console.log('data', response)
      });
      console.log('data', responseData)
  };
 

  const getWebappData= () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/storefront/myStorefronts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response?.data?.length > 0) {
          setWebappData(response.data)

      //  setStorefrontId(response.data[response.data.length-1].id)
        }
      })
      .catch(() => {
      })
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
    } 
    else if (!email) {
      setErros({ emailError: "Please Enter Correct Email" });
      return false;
    } 
    else if (!twitter) {
      setErros({ twitterError: "Please Enter Tweeter Id" });
      return false;
    } 
    else if (!discord) {
      setErros({ discordError: "Please Enter Discord Id" });
      return false;
    } 
    else if (!instagram) {
      setErros({ instagramError: "Please Enter Instagram Id" });
      return false;
    } 

    else if (stfName && stfdescription && stfheadline  && tagline && tagdescription && email && twitter && discord && instagram) {
      setSubmitClicked(true);
      setLoading(true);
      return true;
    }
  };

  useEffect(() => {
    getWebappData();
    updateMarketplaceDetails();
  }, []);
 
  return (
    <LayoutDashbord title="Web App " description="Used to Show Details of the Web App">
      <MarketplaceProfileDetails id={props?.router?.query?.storefrontId}/>
      <div>
        <div  className={`${layoutConfig.colorScheme === 'light' ? 'buy-back-image-webapp-form' : 'dark'}`}>
         
          <Toast ref={toast} />

          <hr></hr>
          <div className="flex">
            <div>
              <Sidemenu />
            </div>

            <div
              className=" p-5 mt-5  back-color  gap-5"
              style={{ width: "80%", margin: "0 auto" }}
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
                    // onClick={addMarketplaceDetails}
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
    </LayoutDashbord>
  );
}
export default withRouter(MarkeplaceDetailsForm)
