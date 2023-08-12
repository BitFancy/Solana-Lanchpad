import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import Layout from "../Components/Layout";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
const Web3 = require("web3");
import { NFTStorage } from "nft.storage";
import { FaUserCircle, FaMapMarkerAlt, FaWallet, FaEnvelope } from "react-icons/fa";
import { IoLogoInstagram, IoLogoTwitter, IoLogoDiscord } from "react-icons/io5";
import { convertUtf8ToHex } from "@walletconnect/utils";
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
import axios from "axios";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';
import { Image } from 'primereact/image';
import Link from "next/link";
import Cookies from 'js-cookie';
import Loader from "../Components/LoadingSpinner";
import etherContract from "../utils/web3Modal";
import { removePrefix } from "../utils/ipfsUtil";
import AccessMaster from '../artifacts/contracts/accessmaster/AccessMaster.sol/AccessMaster.json';
const accessmasterAddress = process.env.NEXT_PUBLIC_ACCESS_MASTER_ADDRESS;

import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkceUtils';

const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenge(codeVerifier);


// twitter oauth Url constructor
const getTwitterOauthUrl = async () => {

  try {
    const response = await fetch("/api/oauth/twitter"); // Send a request to the server-side API route
    const data = await response.json();
    const { oauth_token } = data;
    // Redirect the user to the Twitter authorization URL
    window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`;
  } catch (error) {
    console.error('Failed to initiate Twitter OAuth:', error);
    // Handle error, show error message, etc.
  }
}

const getUserDataFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('twitterData');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

const client = new NFTStorage({ token: YOUR_API_KEY });
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;


function Profile() {

  useEffect(() => {
    const userData = getUserDataFromLocalStorage();
    settwitt(userData);
  }, []);

  useEffect(() => {
    const cookieUserData = Cookies.get('discordUserData');
    console.log(cookieUserData);
    if (cookieUserData) {
      const parsedUserData = JSON.parse(cookieUserData);
      setdiscordData(parsedUserData);
      console.log('User data', parsedUserData);
    }
  }, []);

  useEffect(() => {
    const cookieinstaUserData = Cookies.get('instaData');
    console.log(cookieinstaUserData);
    if (cookieinstaUserData) {
      const parsedData = JSON.parse(cookieinstaUserData);
      setinstaData(parsedData);
      console.log('insta User data', parsedData);
    }
  }, []);


  const profile = {
    name: "",
    location: "",
    bio: "",
    email: "",
    profilePictureUrl: "",
    walletAddress: "",
    coverPictureUrl:""
  };


  const walletAddr = useSelector(selectUser);
  var wallet = walletAddr ? walletAddr[0] : "";
  const [hasRole, setHasRole] = useState(true);
  const [visible, setVisible] = useState(false);
  const [profileData, setProfileData] = useState({ ...profile });
  const [updateProfile, setupdateProfile] = useState({ ...profile });
  const [profileDetails, setprofileDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setmodal] = useState(false);
  const router = useRouter();
  const [twitt, settwitt] = useState(null);
  const [discordData, setdiscordData] = useState(null);
  const [instaData, setinstaData] = useState(null);
  const [fb, setfb] = useState(null);

  async function uploadImage(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const blobDataImage = new Blob([e.target.files[0]]);
      const metaHash = await client.storeBlob(blobDataImage);
      setupdateProfile({
        ...updateProfile,
        profilePictureUrl: `ipfs://${metaHash}`,
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadcover(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const blobData = new Blob([e.target.files[0]]);
      const meta = await client.storeBlob(blobData);
      setupdateProfile({
        ...updateProfile,
        coverPictureUrl: `ipfs://${meta}`,
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  }

  const updateData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("platform_token");
    try {
      // if (
      //   !updateProfile.name.trim() ||
      //   !updateProfile.location.trim()
      // )
      //   alert("Do not leave any field empty!");
      // else {
        var signroledata = JSON.stringify({
          name: "Alka Rashinkar",
          country: "India",
          profilePictureUrl: "https://unsplash.it/500",
        });

        const config = {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: signroledata,
        };
        setLoading(true);
        await axios.patch(
          "https://testnet.gateway.myriadflow.com/api/v1.0/profile",
          { ...updateProfile },
          config
        );
        // alert("Updation successful!");
        setmodal(false);
        getProfile();
      // }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setupdateProfile({ profile });
      setLoading(false);
    }
  };

  const user = useSelector(selectUser);
  const getRole = async () => {
    const token = localStorage.getItem("platform_token");
    const role_id = localStorage.getItem("platform_roleid");

    const config1 = {
      url: `${BASE_URL}/api/v1.0/roleId/${role_id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let roledata;
    try {
      roledata = await axios(config1);
    } catch (e) {
      console.log(e);
    }

    let web3 = new Web3(Web3.givenProvider);
    let completemsg = roledata.data.payload.eula + roledata.data.payload.flowId;
    const hexMsg = convertUtf8ToHex(completemsg);
    const result = await web3.eth.personal.sign(hexMsg, wallet);

    var signroledata = JSON.stringify({
      flowId: roledata.data.payload.flowId,
      signature: result,
    });
    //This is used to create a role/generate the flowid and signature
    const config = {
      url: `${BASE_URL}/api/v1.0/claimrole`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: signroledata,
    };

    try {
      const response = await axios(config);
      const msg = await response?.data?.message;
      setHasRole(true);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  //use to generate the hex msg and
  const authorize = async () => {
    const mywallet = localStorage.getItem("platform_wallet")
    const { data } = await axios.get(
      `${BASE_URL}api/v1.0/auth/web3?walletAddress=${mywallet}`
    );

    let web3 = new Web3(Web3.givenProvider);
    let completemsg = data.payload.eula + data.payload.flowId;
    const hexMsg = convertUtf8ToHex(completemsg);
    const result = await web3.eth.personal.sign(hexMsg, mywallet);
    var signdata = JSON.stringify({
      flowId: data.payload.flowId,
      signature: result,
    });
    //this is use to genarate the token /perceto
    const config = {
      url: `${BASE_URL}api/v1.0/auth/web3`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: signdata,
    };
    try {
      const response = await axios(config);
      const token = await response?.data?.payload?.token;
      localStorage.setItem("platform_token", token);
      getProfile();
      // getRole();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem("platform_token");
    const config = {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    axios
      .get(`${BASE_URL}api/v1.0/profile`, config)
      .then((res) => {
        const {
          data: {
            payload: {
              name,
              location,
              bio,
              email,
              profilePictureUrl,
              walletAddress,
              coverPictureUrl
            },
          },
        } = res;

        console.log(res.data);

        setProfileData({
          ...profileData,
          name,
          location,
          bio,
          email,
          profilePictureUrl,
          walletAddress,
          coverPictureUrl
        });
        setupdateProfile({
          ...profileData,
          name,
          location,
          bio,
          email,
          profilePictureUrl,
          walletAddress,
          coverPictureUrl
        });
        console.log(updateProfile);
        localStorage.setItem("profiledetails", JSON.stringify(res.data.payload));
        setprofileDetails(res.data.payload);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  //----------------------------insta auth -----------------------------------------//

  const handleInstagramAuth = () => {
    const redirectUri = process.env.NEXT_PUBLIC_MYRIADFLOW_INSTAGRAM_REDIRECT_URL;

    const clientId = process.env.NEXT_PUBLIC_MYRIADFLOW_INSTAGRAM_CLIENT_ID;
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media,instagram_graph_user_profile&response_type=code`;

    window.location.href = authUrl;
  };


  // -------------------       discord auth        ------------------------------------------//

  const CLIENT_ID = process.env.NEXT_PUBLIC_MYRIADFLOW_DISCORD_CLIENT_ID;
  const REDIRECT_URL = process.env.NEXT_PUBLIC_MYRIADFLOW_DISCORD_REDIRECT_URI;

  const handleLogin = () => {
    window.location.href = `https://discord.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=identify&redirect_uri=${REDIRECT_URL}`; // Adjust the scope as needed
  };

  const onUpdateProfile = (e) => {
    const { name, value } = e.target;
    setupdateProfile({ ...updateProfile, [name]: value });
  };

  useEffect(() => {
    const asyncFn = async () => {
      const token = localStorage.getItem("platform_token");
      // connectweb();
      if (token) {
        const profiledt = localStorage.getItem("profiledetails");
        const parsed = JSON.parse(profiledt);
        setprofileDetails(parsed);
// console.log(profiledt);
        
      } else {
        authorize();
      }
      // authorize();
      // const accessmaterContarct = await etherContract(accessmasterAddress, AccessMaster.abi)
      // setHasRole(
      //     await accessmaterContarct.hasRole(await accessmaterContarct.FLOW_CREATOR_ROLE(), wallet)
      // );
    };
    asyncFn();
  }, []);


  const {
    name,
    location,
    bio,
    email,
    profilePictureUrl,
    walletAddress,
    coverPictureUrl
  } = profileData;


  return (
    <Layout
      title="Launchpad Profile Page"
      description="Use to show metamask Profile details of the users"
    >
      {loading && <Loader />}




      {visible ? (
        <>

          <Dialog header="Connect to your social media accounts" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <div className="flex flex-wrap justify-content-center gap-2">

              <div className="card flex justify-content-center">
                <Card title="Instagram Account"
                  footer={
                    <div className="flex flex-wrap justify-content-start gap-2">
                      {
                        instaData ? (
                          <>
                            <Button label="Connected" icon="pi pi-check" />
                          </>
                        ) : (
                          <>
                            <Button onClick={handleInstagramAuth} label="Connect" icon="pi pi-check" />
                          </>
                        )
                      }
                      <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
                    </div>
                  }
                  header={<img alt="Card" src="insta.png" />}

                  className="md:w-20rem">
                </Card>
              </div>

              <div className="card flex justify-content-center">
                <Card title="Discord Account"
                  footer={
                    <div className="flex flex-wrap justify-content-start gap-2">
                      {
                        discordData ? (
                          <>
                            <Button label="Connected" icon="pi pi-check" />
                          </>
                        ) : (
                          <>
                            <Button onClick={handleLogin} label="Connect" icon="pi pi-check" />
                          </>
                        )
                      }
                      <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
                    </div>
                  }
                  header={<img alt="Card" src="Discord.jpg" />}

                  className="md:w-20rem">
                </Card>
              </div>

              <div className="card flex justify-content-center">
                <Card title="Facebook Account"
                  footer={
                    <div className="flex flex-wrap justify-content-start gap-2">
                      {
                        fb ? (
                          <>
                            <Button label="Connected" icon="pi pi-check" />
                          </>
                        ) : (
                          <>
                            <Button label="Connect" icon="pi pi-check" />
                          </>
                        )
                      }
                      <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
                    </div>
                  }
                  header={<img alt="Card" src="Facebook.jpg" />}

                  className="md:w-20rem">
                </Card>
              </div>

              <div className="card flex justify-content-center">
                <Card title="Twitter Account"
                  footer={
                    <div className="flex flex-wrap justify-content-start gap-2">
                      {
                        twitt ? (
                          <>
                            <Button label="Connected" icon="pi pi-check" />
                          </>
                        ) : (
                          <>
                            <Button onClick={getTwitterOauthUrl} label="Connect" icon="pi pi-check" />
                          </>
                        )
                      }
                      <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
                    </div>
                  }
                  header={<img alt="Card" src="twitter.png" />}

                  className="md:w-20rem">
                </Card>
              </div>

              <div className="card flex justify-content-center">
                <Card title="Telegram Account"
                  footer={
                    <div className="flex flex-wrap justify-content-start gap-2">
                      <Button label="Connect" icon="pi pi-check" />
                      <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
                    </div>
                  }
                  header={<img alt="Card" src="telegram.webp" />}
                  className="md:w-20rem">
                </Card>
              </div>
            </div>
          </Dialog>

        </>
      ) : null}





      <div className="mt-8">

      {profileDetails?.coverPictureUrl ? (
        <div
          className="" style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${removePrefix(profileDetails?.coverPictureUrl)})`, 
            width: '100%',
            height: "250px",
            objectFit: 'cover',
            backgroundColor: 'gray',
          }}>
        </div>
      ):(
        <div
          className="" style={{
            backgroundImage: `url("")`, width: '100%',
            height: "250px",
            objectFit: 'cover',
            backgroundColor: 'gray',
          }}>
        </div>
      )}

        {profileDetails?.profilePictureUrl ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            marginTop: '-100px',
            marginLeft: '50px',
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              // border: '1px solid black',
              backgroundColor: 'gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Avatar image={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${removePrefix(
                profileDetails?.profilePictureUrl
              )}`} size="xlarge" shape="circle" style={{ borderRadius: '50%', width: '200px', height: '200px' }} />
              {/* <Image src={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${removePrefix(
                profilePictureUrl
              )}`} alt="Image" width="200" style={{borderRadius:'50%', width: '200px', height: '200px' }}/> */}
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            marginTop: '-100px',
            marginLeft: '50px',
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '1px solid black',
              backgroundColor: 'gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FaUserCircle
                style={{
                  fontSize: '24px',
                  // color: 'gray',
                  width: '200px',
                  height: '200px',
                }}
              />
            </div>
          </div>

        )}



        <div style={{
          display: 'flex',
          justifyContent: 'flex-end', marginTop: '-70px',
          marginRight: '20px',
        }}>
          <Button label="Edit Profile" onClick={() => setmodal(true)} rounded />
        </div>

        <Dialog header="Edit Profile (Edit the fields you want to change)" visible={modal} onHide={() => setmodal(false)}
          style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
          <form onSubmit={updateData}>
            <div className="md-form mb-3">
              <input
                type="text"
                id="form1Example13"
                className="form-control form-control-lg px-2 py-2 pl-2 bg-black w-full text-gray-500 dark:text-white"
                value={updateProfile.name}
                name="name"
                onChange={(e) => onUpdateProfile(e)}
                placeholder="Name"
              />
            </div>

            <div className="md-form mb-3">
              <input
                type="text"
                id="form1Example15"
                className="form-control form-control-lg px-2 py-2 pl-2 bg-black w-full text-gray-500 dark:text-white"
                value={updateProfile.location}
                name="location"
                onChange={(e) => onUpdateProfile(e)}
                placeholder="Location"
              />
            </div>

            <div className="md-form mb-3">
              <input
                type="text"
                id="form1Example16"
                className="form-control form-control-lg px-2 py-2 pl-2 bg-black w-full text-gray-500 dark:text-white"
                value={updateProfile.bio}
                name="bio"
                onChange={(e) => onUpdateProfile(e)}
                placeholder="Bio"
              />
            </div>

            <div className="md-form mb-3">
              <input
                type="text"
                id="form1Example17"
                className="form-control form-control-lg px-2 py-2 pl-2 bg-black w-full text-gray-500 dark:text-white"
                value={updateProfile.email}
                name="email"
                onChange={(e) => onUpdateProfile(e)}
                placeholder="Email"
              />
            </div>

            <div>Upload profile image</div>
            <div className="col-md-8 col-lg-7 col-xl-6 text-center justify-center align-center flex-col">
              {updateProfile?.profilePictureUrl && (
                <img
                  alt="alt"
                  src={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY
                    }/${removePrefix(
                      updateProfile?.profilePictureUrl
                    )}`}
                  className="img-fluid w-6/12 grow"
                  width="200"
                  height="200"
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="btn btn-primary btn-md mb-5 mt-5"
                name="profilePic"
                onChange={(e) => uploadImage(e)}
              />
            </div>

            <div>Upload cover image</div>
            <div className="col-md-8 col-lg-7 col-xl-6 text-center justify-center align-center flex-col">
              {updateProfile?.coverPictureUrl && (
                <img
                  alt="alt"
                  src={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY
                    }/${removePrefix(
                      updateProfile?.coverPictureUrl
                    )}`}
                  className="img-fluid w-6/12 grow"
                  width="200"
                  height="200"
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="btn btn-primary btn-md  mb-5 mt-5"
                name="coverPic"
                onChange={(e) => uploadcover(e)}
              />
            </div>

            <div className="flex gap-6">
              <div>
                {" "}
                <button
                  type="submit"
                  className="cursor-pointer bg-blue-800 text-black-500 dark:text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </Dialog>

        <div style={{
          margin: '2px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
        }}>

          <div style={{
            marginTop: '50px', // Use '24px' in md viewports and '10px' in lg viewports
            marginLeft: '60px',
          }}>
            <div>
              <p className="text-2xl font-bold">{profileDetails?profileDetails.name : null}</p>
            </div>
            <div>
              <p className="mt-12 text-xl">{profileDetails?profileDetails.bio:null}</p>

              <div className="flex lg:flex-row md:flex-row flex-col mt-4">
                <div className="flex">
                  <FaMapMarkerAlt style={{ color: 'grey', marginTop: 6 }} />
                  <p className="text-xl ml-2" style={{ color: 'grey' }}>{profileDetails?profileDetails.location:null}</p>
                </div>
                <div className="flex md:ml-12" style={{ marginLeft: 20 }}>
                  <FaWallet style={{ color: '', marginTop: 6 }} />
                  <p className="text-xl ml-2" style={{ color: '' }}>{profileDetails?profileDetails.walletAddress:null}</p>
                </div>
              </div>

              <div className="flex lg:flex-row md:flex-row flex-col mt-6">
                <div className="flex">
                  <FaEnvelope style={{ color: '', marginTop: 6 }} />
                  <p className="text-xl ml-2" style={{ color: '' }}>{profileDetails?profileDetails.email:null}</p>
                </div>
                <div className="flex lg:ml-12 md:ml-12 text-xl" style={{ marginLeft: 20 }}>
                  <IoLogoInstagram style={{ color: '', marginTop: 6, marginRight: 8 }} />
                  <IoLogoTwitter style={{ color: '', marginTop: 6, marginRight: 8 }} />
                  <IoLogoDiscord style={{ color: '', marginTop: 6 }} />
                </div>
                <div className="flex flex-wrap gap-4 -mt-2" style={{ marginLeft: 20 }}>
                  <div>
                    <Button label="Connect to social media" onClick={() => setVisible(true)} rounded />
                  </div>
                </div>
              </div>

              {twitt ? (
                <>
                  {/* <p className="flex p-5 justify-content-around">Twitter account connected</p> */}
                  <div className="p-card mt-8 p-mb-3 p-shadow-3"

                    style={{
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      width: '72%'
                    }}

                  >
                    <div className="p-card-body">
                      <div className="flex justify-content-around">
                        <div>
                          <img style={{ height: "150px", borderRadius: '50%' }} src={twitt.profile_image_url_https}></img>
                        </div>
                        <div className="flex text-xl mt-2">
                          <div className="ml-5 dark:text-white font-bold">
                            <Link href={`https://twitter.com/${twitt.screen_name}`} target="_blank" className="text-2xl">
                              Twitter profile
                            </Link>
                            <p className="mt-4 text-secondary">
                              <span className="text-gray-900">User ID :</span> {twitt.screen_name}
                            </p>
                            <p className="mt-4 text-secondary">
                              <span className="text-gray-900">Screen Name :</span> {twitt.name}
                            </p>
                            {/* <p>Joined on: {new Date(parseInt(twitt.createdAt)).toDateString()}</p> */}
                            <p className="mt-4 text-secondary">
                              <span className="text-gray-900">Joined on :</span> {new Date(twitt.created_at).toLocaleString('default', { month: 'long' })} {new Date(twitt.created_at).getFullYear()}
                            </p>
                            <p className="mt-4 text-secondary">
                              <span className="text-gray-900">Bio :</span> {twitt.description}
                            </p>
                            <p className="mt-4 text-secondary">
                              <span className="text-gray-900">Followers :</span> {twitt.followers_count}
                            </p>
                            <p className="mt-4 text-secondary">
                              <span className="text-gray-900">Following :</span> {twitt.friends_count}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}


              {discordData ? (
                <>
                  <div className="p-card mt-8 p-mb-3 p-shadow-3"

                    style={{
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}

                  >
                    <div className="p-card-body">
                      <div className="flex justify-content-around">
                        <div>
                          <img style={{ height: "150px", borderRadius: '50%' }} src={`https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.png`}></img>
                        </div>
                        <div className="flex text-xl mt-2 ml-5 dark:text-white font-bold">
                          <div className="">
                            <Link href={`https://discord.com/users/${discordData.id}`} target="_blank" className="text-2xl">
                              Discord Profile
                            </Link>
                            {/* <p className="mt-5">User ID : {discordData.username} </p> */}
                            <p className="mt-4 text-secondary">
                              <span className="text-gray-900">User ID :</span> {discordData.username}
                            </p>
                            <p className="mt-4 text-secondary">
                              <span className="text-gray-900">Screen Name :</span> {discordData.global_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}


              {instaData ? (
                <>
                  {/* <p className="flex p-5 justify-content-around">Insta account connected</p> */}
                  <div className="p-card mt-8 p-mb-3 p-shadow-3"

                    style={{
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}

                  >
                    <div className="p-card-body">
                      <div className="flex justify-content-around">
                        <div>
                          {/* <img style={{ height: "150px", borderRadius: '50%' }} src={`https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.png`}></img> */}
                        </div>
                        <div className="flex text-xl mt-2">
                          <div className="ml-5 font-bold dark:text-white">
                            <Link href={`https://www.instagram.com/${instaData.username}/`} target="_blank" className="text-2xl">
                              Instagram profile
                            </Link>
                            <p className="mt-4 text-secondary">
                              <span className="text-gray-900">User ID :</span> {instaData.username}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

            </div>
            <div>
            </div>
          </div>

        </div>


        <div className="flex p-5 justify-content-around mt-5">
          {/* <p>Joined on: {new Date(parseInt(fb.reloadUserInfo.createdAt)).toDateString()}</p> */}
        </div>
      </div>
    </Layout >
  );
}
export default Profile;