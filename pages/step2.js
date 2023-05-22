import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import Web3 from "web3";
import collection from "../artifacts/contracts/FLOWCOLLECTION/FlowCollection.sol/FlowCollection.json";
import { withRouter } from "next/router";
import { useEffect } from "react";
import { FileUpload } from 'primereact/fileupload';
import { NFTStorage } from "nft.storage";

const YOUR_API_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });

const Step2=(props)=> {
  const msgs = useRef(null);
  const [marketplaceContarctA, setMarketplaceContarctA] = useState("");
  const [flowcontarctAddress, setFlowcontractAddress] = useState("");
  const [collectionContractA, setCollectionContractA] = useState("");
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
  
  var web3 = new Web3(Web3.givenProvider);
  const collectionContarct = () => {
    const collectionContarct = new web3.eth.Contract(collection.abi);
    web3.eth.getAccounts().then((accounts) => {
      collectionContarct
        .deploy({
          data: collection.bytecode,
          arguments: [uploadImage,marketplaceContarctA,flowcontarctAddress ],
        })
        .send({ from: accounts[0], gas: 10002 })
        .on("receipt", (receipt) => {
          console.log(" collection Contract Address:", receipt.contractAddress);

          setCollectionContractA(receipt.contractAddress);
          msgs.current.show([
            {
              sticky: true,
              severity: "success",
              detail: "Your contract has been  successfully deployed",
              closable: true,
            },
          ]);
        });
    });
  };

useEffect(() => {
  setMarketplaceContarctA(props.router.query.contractAddress)
}, [props.router.query.contractAddress])

useEffect(() => {
  setFlowcontractAddress(props.router.query.contractAddressFlowAccess)
}, [props.router.query.contractAddressFlowAccess])

  console.log("Address in step 2", props.router.query.contractAddress, props.router.query.contractAddressFlowAccess);
  return (
    <div style={{marginTop:"85px"}}>
      <div className="card p-5 font-bold justify-content-center flex">
        Deploy Collection
      </div>
      <div className="flex justify-content-center gap-5">
      
        <div className="card" style={{ width: "50%" }}>
          <div className="text-center mt-5">

          <div className="mt-3 text-left">Choose Uri</div>
               <div className="mt-5">
            <FileUpload type="file" onSelect={(event)=>{onChangeThumbnail(event)}} uploadHandler={(e)=>console.log("File upload handler",e.files)} value={uploadImage}   accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
            </div>
            <div className="mt-3 text-left">Marketplace Address</div>
            <div className="mt-2">
              <InputText
                value={marketplaceContarctA}
                className="p-2 w-full"
                type="text"
                disabled
              />
            </div>
            <div className="mt-3 text-left">Flowcontract Address</div>
            <div className="mt-2">
              <InputText
                value={flowcontarctAddress}
                className="p-2 w-full"
                type="text"
                disabled
              />
            </div>
         
          </div>
          <div className="text-center mt-5">
            <Button
              onClick={collectionContarct}
              label="Deploy Collection"
              severity="Primary"
              rounded
              disabled={!marketplaceContarctA}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default withRouter(Step2)