import React, { useState } from "react";
import Layout from "../Components/Layout";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useRef } from "react";
import { Messages } from "primereact/messages";
import { FileUpload } from "primereact/fileupload";
import { NFTStorage } from "nft.storage";
import Router from "next/router";
import { Dropdown } from "primereact/dropdown";

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

  const msgs = useRef(null);
  const [loading, setLoading] = useState(false);
  const [contarctName, setContarctName] = useState();
  const [description, setdescription] = useState();
  const [headline, setHeadline] = useState();


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

  const addSubscription = async () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/subscription`,
        {
          name: contarctName,
          owner: "asd3rfsdaf2334r23",
          cost: 99,
          currency: "USD",
          createdBy: "Admin",
          updatedBy: "Admin",
          image: uploadImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail:
              "You are now the Admin, Flow Access Master has been Successfully Deployed",
            closable: true,
          },
        ]);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    Router.push("/subscriptionDashboard")
    .catch((error) => {
      console.log("err", error);
    });
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

  return (
    <Layout>
      <div className="buy-back-image" style={{ marginTop: "100px" }}>
        <div className="font-bold text-3xl p-5 text-white text-center">
          Add StoreFront Details
        </div>
        <hr></hr>
        <div
          className=" p-5 mt-5 font-bold card flex gap-5" 
          style={{ width: "80%", margin: "0 auto" }}
        >
         
        

            <div style={{padding:'20px',border:'1px solid'}}>
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
          <div className="mt-5 w-full" >
            <div>StoreFront Name(Name must be unique):</div>
            <div className="mt-2">
            <InputText
              value={contarctName}
              onChange={handleInputContractName}
              placeholder="Please Enter Your Experience"
              className="w-full input-back mt-2 text-white"
              maxLength={12}
              minLength={7} 
            />
            </div>
            
             <div className="mt-5 text-left">
                Blockchain:
              </div>
              <div className="mt-2">
              <Dropdown
                  value={selecteBlockchaine}
                  onChange={(e) => setselectedBlockchaine(e.value)}
                  options={blockchain}
                  optionLabel="name"
                  placeholder="Select Blockchain "
                  className="w-full input-back"
                />
              </div>
             
              <div className="mt-3 text-left">Headline:</div>
              <div className="mt-2">
                <InputText
                  value={headline}
                  onChange={handleInputHeadline}
                  className="p-2 w-full input-back text-white"
                  placeholder="Please Enter Headline of the Storefront"
                  type="text"
                />
              </div>
              
            
            <div className="mt-5">Description:</div>

            <textarea
              value={description}
              onChange={handleInputDescription}
              placeholder="Please Enter Storefront Description"
              className="w-full input-back mt-2 text-white"
              maxLength={100}
              minLength={10}
            />

            <div className="mt-5 ">
              <Button
                onClick={addSubscription}
                loading={loading}
                label="Continue"
              ></Button>
            </div>
            <Messages ref={msgs} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
