import React, { useContext, useRef, useState } from "react";
import LayoutDashbord from "../Components/LayoutDashbord";
import { InputText } from "primereact/inputtext";
import { LayoutContext } from "../layout/context/layoutcontext";
import { Button } from "primereact/button";
import axios from "axios";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

export default function AddProfileDetails() {
    const { layoutConfig } = useContext(LayoutContext);
    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [email, setEmail] = useState();
    const [location, setLocation] = useState();
    const [profilePictureUrl, setprofilePictureUrl] = useState();
    const [coverPictureUrl, setcoverPictureUrl] = useState();
    const [instagram_id, setinstagram_id] = useState();
    const [twitter_id, settwitter_id] = useState();
    const [discord_id, setdiscord_id] = useState();
    const [submitClicked, setSubmitClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

   const router=useRouter();
   const toast = useRef(null);

    const [errors, setErros] = useState({
      nameErrro: "",
      bioError: "",
      emailError: "",
      locationError: "",
      profilePictureUrlError: "",
      coverPictureUrlError: "",
      instagram_idError: "",
      twitter_idError:'',
      discord_idError: "",
      
    });
    const showError = () => {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error While creating profile",
        life: 10000,
      });
    };
    const addProfile = async () => {
      const token = localStorage.getItem("platform_token");
      const valid = onClickButton();
      if (valid) {
        
  
        axios
          .post(
            `${BASE_URL_LAUNCH}api/v1.0/profile`,
            {
              name:name,
              bio:bio,
              email:email,
              location:location,
              profilePictureUrl:profilePictureUrl,
              coverPictureUrl:coverPictureUrl,
              instagram_id:instagram_id,
              twitter_id:twitter_id,
              discord_id:discord_id
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
            setVisible(true);
          }, 2000);
          router.push('/profile')
          })
          .catch((error) => {
            console.log('error while profile create',error)
            showError();

          }).finally(() => {
            setLoading(false);
          });
      }
    };
    const handleInputName = (e) => {
      setName(e.target.value);
    };
    const handleInputbio = (e) => {
      setBio(e.target.value);
    }; 
    const handleInputemail = (e) => {
      setEmail(e.target.value);
    };
     const handleInputlocation = (e) => {
      setLocation(e.target.value);
    }; 
    const handleInputprofile = (e) => {
      setprofilePictureUrl(e.target.value);
    }; 
    const handleInputcover = (e) => {
      setcoverPictureUrl(e.target.value);
    }; 
    const handleInputinsta = (e) => {
      setinstagram_id(e.target.value);
    }; 
    const handleInputtweeter = (e) => {
      settwitter_id(e.target.value);
    };
    const handleInputtdiscord = (e) => {
      setdiscord_id(e.target.value);
    };

    const onClickButton = () => {
      if (!name) {
        setErros({ nameErrro: "Please Enter  Name" });
        return false;
      } else if (!bio) {
        setErros({ bioError: "Please Enter Bio" });
        return false;
      } else if (!email) {
        setErros({ emailError: "Please Enter Email" });
        return false;

      }else if (!location) {
        setErros({ locationError: "Please Enter Location" });
        return false;
      }
      else if (!location) {
        setErros({ locationError: "Please Enter Location" });
        return false;
      }
      else if (!instagram_id) {
        setErros({ instagram_idError: "Please Enter Instagram Id" });
        return false;
      }
      else if (!twitter_id) {
        setErros({ twitter_idError: "Please Enter Tweeter Id" });
        return false;
      }
      else if (!discord_id) {
        setErros({ discord_idError: "Please Enter Discord Id" });
        return false;
      }
       else if (name && bio && email && location && instagram_id && twitter_id && discord_id) {
        setSubmitClicked(true);
        setLoading(true);
        return true;
      }
    };
  return (
    <LayoutDashbord>
      <div className="cover-img-back"></div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "-95px", left: "35px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 200 200"
            fill="none"
          >
                      <Toast ref={toast} />

            <circle cx="100" cy="100" r="99.5" fill="#D9D9D9" stroke="black" />
          </svg>
          <Dialog
        visible={visible}
        style={{ width: "30vw", height: "18vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="text-center">
        <div className="font-bold">Congrats!</div>
        <div className="m-0">
          Your Profile is created Successfully
        </div>
        </div>
       
      </Dialog>
        </div>
      </div>
      <div >
      <div  className={`${layoutConfig.colorScheme === 'light' ? 'back-color' : 'back-color-black' }  p-5`} style={{width:'70%',margin:'0 auto',marginTop:'60px'}} >
        <div className="font-bold text-2xl">Add profile details</div>
        <div className="mt-5">Enter name</div>

        <div>
          <InputText 
           onChange={handleInputName}
           value={name}
            className="p-2 mt-3 input-back w-full "
          />
            <p className="text-red-600 text-left mt-2">
                  {!name ? errors.nameErrro : ""}
                </p>
        </div>
        <div className="mt-5">Enter Bio</div>

        <div>
          <InputText
           onChange={handleInputbio}
           value={bio}
            className="p-2 mt-3 input-back w-full"
          />
            <p className="text-red-600 text-left mt-2">
                  {!bio ? errors.bioError : ""}
                </p>
        </div>
        <div className="mt-5">Enter Email ID</div>

        <div>
          <InputText
           onChange={handleInputemail}
           value={email}
            className="p-2 mt-3 input-back w-full"
          />
            <p className="text-red-600 text-left mt-2">
                  {!email ? errors.emailError : ""}
                </p>
        </div>
        <div className="mt-5">Enter Location</div>

        <div>
          <InputText
           onChange={handleInputlocation}
           value={location}
            className="p-2 mt-3 input-back w-full"
          />
            <p className="text-red-600 text-left mt-2">
                  {!location ? errors.locationError : ""}
                </p>
        </div>
        <div className="mt-5">Enter Twitter link</div>

        <div>
          <InputText
           onChange={handleInputtweeter}
           value={twitter_id}
            className="p-2 mt-3 input-back w-full"
          />
            <p className="text-red-600 text-left mt-2">
                  {!twitter_id ? errors.twitter_idError : ""}
                </p>
        </div>
        <div className="mt-5">Enter Instagram link</div>

        <div>
          <InputText
           onChange={handleInputinsta}
           value={instagram_id}
            className="p-2 mt-3 input-back w-full "
          />
            <p className="text-red-600 text-left mt-2">
                  {!instagram_id ? errors.instagram_idError : ""}
                </p>
        </div>
        <div className="mt-5">Enter Discord ID</div>

        <div>
          <InputText
           onChange={handleInputtdiscord}
           value={discord_id}
            className="p-2 mt-3 input-back w-full"
          />
            <p className="text-red-600 text-left mt-2">
                  {!discord_id ? errors.discord_idError : ""}
                </p>
        </div>
        <div className="mt-5">
            <Button onClick={addProfile} label="Create profile"  loading={loading} rounded></Button>
        </div>
      </div>
     
      </div>
  
    </LayoutDashbord>
  );
}
