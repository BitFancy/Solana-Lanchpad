import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { NFTStorage } from "nft.storage";
import { Dropdown } from "primereact/dropdown";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Toast } from "primereact/toast";
import { LayoutContext } from "../layout/context/layoutcontext";
import Layout2 from "../Components/Layout2";

const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });
export default function AddStorefront() {
  const [selecteBlockchaine, setselectedBlockchaine] = useState(null);
  const blockchain = [
    { name: "Polygon", value: "Polygon" },
    { name: "Ethereum", value: "Ethereum" },
  ];

  const { address } = useAccount();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [contractName, setContarctName] = useState("");
  const [description, setdescription] = useState();
  const [headline, setHeadline] = useState();
  const [storefrontResponase, setstorefrontResponase] = useState();
  const { layoutConfig } = useContext(LayoutContext);

  const [errors, setErros] = useState({
    contractNameEror: "",
    descriptionError: "",
    headlineError: "",
    uploadImageError: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [uploadImage, setuploadImage] = useState("");

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
  const showErrorGetStorefront = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While Get Storefront",
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
      showErroruploadImage();
    }
  }

  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  const getSubscriptionData = async () => {
    const token = localStorage.getItem("platform_token");
    try {
      const { data } = await axios.get(
        `${BASE_URL_LAUNCH}api/v1.0/storefront`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      showErrorGetStorefront();
    }
  };

  const addSubscription = async () => {
    const token = localStorage.getItem("platform_token");
    const valid = onClickButton();
    if (valid) {
      const storefronts = await getSubscriptionData();

      if (
        storefronts?.find(
          (sf) => sf.string?.toLowerCase() === contractName?.toLowerCase()
        )
      ) {
        alert(`Storefront '${contractName}' already exist`);
        return;
      }
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/storefront`,
          {
            name: contractName,
            owner: address,
            createdBy: "Admin",
            updatedBy: "Admin",
            image: uploadImage,
            headline: headline,
            description: description,
            blockchain: selecteBlockchaine,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (response) => {
          
          setstorefrontResponase(response.data.storefrontId);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          showSticky();
          localStorage.setItem("storefrontId",response.data.storefrontId)
          localStorage.setItem("accessMasterAddress",response.data.accessMasterAddress)
        })

        .catch(() => {
          showError();
        })
        .finally(() => {
          setLoading(false);
        });
    }
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

  const showSticky = () => {
    toast.current.show({
      severity: "success",
      detail:
        "You have assumed the role of administrator.The deployment of Flow access master has been completed successfully.",
      sticky: true,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error ",
      detail: "Error While Add Storefront Details",
      sticky: true,
    });
  };

  const onClickButton = () => {
    if (!contractName) {
      setErros({ contractNameEror: "Please Enter Storefront Name" });
      return false;
    } else if (!headline) {
      setErros({ headlineError: "Please Enter Headline" });
      return false;
    } else if (!description) {
      setErros({ descriptionError: "Please Enter Description" });
      return false;
    } else if (contractName && headline && description) {
      setSubmitClicked(true);
      setLoading(true);
      return true;
    }
  };
  return (
    <Layout2 title="Add Storefront" description="This is used to Add Storefront Details">
    <div>
     
      <Toast ref={toast} />

      <div  className={`${layoutConfig.colorScheme === 'light' ? 'buy-back-image' : 'dark'}`}>
        <div className="font-bold text-4xl p-5 text-black p-heading" style={{borderBottom:'1px solid #aba2a2'}}>
          Add StoreFront Details
        </div>
        <div className="ml-5 text-2xl mt-5 text-center font-bold">
          You are currently observing the deployed {" "}
        </div>
        <div className="ml-5 text-2xl text-center font-bold"> storefronts in testnet</div>
        <div
          className=" p-5 mt-5 font-bold card flex gap-5 buy-img back-color"
          style={{ width: "80%", margin: "0 auto" }}
        >
          <div style={{ width: "445px" }}>
            <div style={{ padding: "20px", border: "1px solid" }}>
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
          </div>
          <div className="w-full">
            <div>StoreFront Name(must be unique)</div>
            <div>
              <InputText
                id="contractName"
                onChange={handleInputContractName}
                value={contractName}
                className="p-2 mt-3 input-back w-full text-white"
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!contractName ? errors.contractNameEror : ""}
              </p>
            </div>

            <div className="mt-5">Blockchain</div>

            <div className="mt-3">
              <Dropdown
                value={selecteBlockchaine}
                onChange={(e) => setselectedBlockchaine(e.value)}
                options={blockchain}
                optionLabel="name"
                placeholder="Select Blockchain "
                className="w-full input-back"
              />
            </div>

            <div className="mt-5">Headline</div>

            <div>
              <InputText
                value={headline}
                onChange={handleInputHeadline}
                className="p-2 mt-3 input-back w-full text-white"
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!headline ? errors.headlineError : ""}
              </p>
            </div>

            <div className="mt-5">Description</div>

            <div>
              <InputText
                value={description}
                onChange={handleInputDescription}
                className="p-2 mt-3 input-back w-full text-white"
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!description ? errors.descriptionError : ""}
              </p>
            </div>

            <div className="flex mt-5 justify-content-between">
              <div>
                <Button
                  label="Add Storefront"
                  onClick={addSubscription}
                  severity="Primary"
                  className=" mt-7 w-full buy-img"
                  style={{ width: "30%" }}
                  rounded
                  type="submit"
                  loading={loading}
                />
              </div>
              {storefrontResponase && (
                <div>
                  <Link href="/storefrontDashboard">
                    <Button
                      label="Continue"
                      severity="Primary"
                      className=" mt-7 w-full"
                      style={{ width: "30%" }}
                      rounded
                      loading={loading2}
                      onClick={load}
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout2>
  );
}
