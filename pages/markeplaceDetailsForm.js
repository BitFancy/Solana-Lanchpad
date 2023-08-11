import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { NFTStorage } from "nft.storage";
import AppTopbar from '../layout/AppTopbar';
import Link from 'next/link';

const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });

export default function markeplaceDetailsForm() {
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [contarctName, setContarctName] = useState();
    const [description, setdescription] = useState();
    const [email, setEmail] = useState();
  
  
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
            headline:headline,
            description:description,
            blockchain:selecteBlockchaine
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (response) => {
          showSuccess()
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });
      Router.push("/successNoteContract")
      .catch((error) => {
        showError();
      });
    };
    const handleInputContractName = (e) => {
      setContarctName(e.target.value);
    };
  
    const handleInputDescription = (e) => {
      setdescription(e.target.value);
  
    };
    const handleInputEmail = (e) => {
      setEmail(e.target.value);
    };
  
    const showSuccess = () => {
      toast.current.show({severity:'success', summary: 'Success', detail:'Success', life: 1000});
  }
  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error ', detail:'Storefront Name Must be Unique', life: 1000});
  }
  
  return (
    <div>
        <AppTopbar/>
      <div className="buy-back-image" style={{ marginTop: "100px" }}>
        <div className="font-bold text-3xl p-5 text-white text-center">
          Add Marketplace Details
        </div>
        <Toast ref={toast} />

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
            <div>Enter storefront name:</div>
            <div className="mt-2">
            <InputText
              value={contarctName}
              onChange={handleInputContractName}
              placeholder="Please Enter Srorefront Name"
              className="w-full input-back mt-2 text-white"
              maxLength={12}
              minLength={7} 
            />
            </div>
            
            
             
              <div className="mt-3 text-left">Enter description:</div>
              <div className="mt-2">
                <InputText
                  value={description}
                  onChange={handleInputDescription}
                  className="p-2 w-full input-back text-white"
                  placeholder="Please Enter description of the Storefront"
                  type="text"
                />
              </div>
              
            
            <div className="mt-5">Enter Mail ID:</div>

            <InputText
                  value={email}
                  onChange={handleInputEmail}
                  className="p-2 w-full input-back text-white"
                  placeholder="Please Enter Email"
                  type="text"
                />

            <div className="mt-5 ">
                <Link href='/successNoteContract'>
              <Button
                loading={loading}
                
                label="Continue"
              ></Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
