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

const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const YOUR_API_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });

export default function AddSubscription() {
  const msgs = useRef(null);
    const [loading, setLoading] = useState(false);
    const [contarctName, setContarctName] = useState();
    const [planName ,setPlanName] = useState();
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
      console.log("Uploaded file...",file);
      const thumbnail = new File([file], file.name, {
        type: file.type,
      });
      try {
        const metaHash = await uploadBlobGetHash(thumbnail);
        const metaHashURI = getMetaHashURI(metaHash);
       setuploadImage(metaHashURI)
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
     


  const addSubscription=async ()=>{
    const token = localStorage.getItem("authToken");
    setLoading(true);       
     axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/subscription`, { name:contarctName,
        owner:"asd3rfsdaf2334r23",
        plan:planName,
        cost:99,
        currency:"USD",
        createdBy:"Admin",
        updatedBy:"Admin",
        image:uploadImage

      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
         
        },
      )
      .then(async (response) => {
       
        msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail: "Your Basic plan subscription has been successfully created",
            closable: true,
          },
        ]);
        setTimeout(() => {
          setLoading(false);
        }, 2000);

      })
      Router.push('/getAllSubscription')

      .catch((error) => {
        console.log("err", error);
      });
  
    }
    const handleInputContractName = (e) => {
        setContarctName(e.target.value);
      
    };
    const handleInputPlanName = (e) => {
      setPlanName(e.target.value);
    };
  return (
    <Layout>
      <div className="buy-back-image" style={{ marginTop: "100px" }}>
        <div className="font-bold text-3xl p-5">Add subscription Details</div>
        <hr></hr>
        <div className="flex gap-5 p-5">
          <div className="select-file-image">
            <div>
              <FileUpload type="file" onSelect={(event)=>{onChangeThumbnail(event)}} uploadHandler={(e)=>console.log("File upload handler",e.files)} value={uploadImage}   accept="image/*" maxFileSize={1000000} />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className="font-bold">Contarct Name:</div>
            <InputText  value={contarctName}
                onChange={handleInputContractName} placeholder="Please Enter Contract Name" className="w-full input-back mt-2" />
            <div className="mt-5 font-bold">Plan:</div>
            <InputText value={planName}
                onChange={handleInputPlanName} placeholder="Please Enter Plan Name" className="w-full input-back mt-2" style={{color:'white'}}/>
            <div className="mt-5 ">
              <Button onClick={addSubscription} loading={loading}  label="Add Subscription"></Button>
            </div>
            <Messages ref={msgs} />

          </div>
        </div>
      </div>
    </Layout>
  );
}
