import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { NFTStorage } from "nft.storage";
import Router from "next/router";
import { Dropdown } from "primereact/dropdown";
import { Toast } from 'primereact/toast';
import AppTopbar from "../layout/AppTopbar";
import Link from "next/link";

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
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [contarctName, setContarctName] = useState([]);
  const [enteredMarketplaceName, setenteredMarketplaceName] = useState();

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

  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  const addSubscription = async () => {
  //   const filterEmail = contarctName?.filter(x => x === enteredMarketplaceName);
  //   if (filterEmail) {
  //     setenteredMarketplaceName({ error: true,errorMessage: "Email already subscribed"})
  // };
  // handleItemChanged();
    const token = localStorage.getItem("authToken");
    setLoading(true);
    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/storefront`,
        {
          name: contarctName,
          owner: "asd3rfsdaf2334r23",
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
        showSticky()
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
    
    .catch((error) => {
      showError();
    });
  };
  const handleInputContractName = (e) => {
    setContarctName(e.target.value);
    
  }
  const handleInputDescription = (e) => {
    setdescription(e.target.value);

  };
  const handleInputHeadline = (e) => {
    setHeadline(e.target.value);
  };

  const showSticky = () => {
    toast.current.show({severity:'success', detail:'You have assumed the role of administrator.The deployment of Flow access master has been completed successfully.',sticky: true});
}
const showError = () => {
  toast.current.show({severity:'error', summary: 'Error ', detail:'Storefront Name Must be Unique', life: 1000});
}

//   const handleItemChanged = (event, index) => {
//     const value = event;
//     const list = [...contarctName];
//     if(list.filter(f=> f.contarctName === value).length > 0){
//         showSuccess();
//     }
//     else{
//        showError();
//     }
//     list[index].contarctName = value;
//     setContarctName(list)
    
// }
  return (
    <div>
      <AppTopbar/>
      <div className="buy-back-image" style={{ marginTop: "100px" }}>
        <div className="font-bold text-3xl p-5 text-white text-center">
          Add StoreFront Details
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
            <div>StoreFront Name(Name must be unique):</div>
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

            <div className="flex justify-content-between mt-5">
              <div>
            
              <Button
                onClick={addSubscription}
                loading={loading}
                label="Add Storefront"
              ></Button>
              
              </div>
              <div>
              <Link href='/step1'>
              <Button
                loading={loading2}
                onClick={load}
                label="Continue"
              ></Button>
              </Link>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
