import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { NFTStorage } from "nft.storage";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { LayoutContext } from "../layout/context/layoutcontext";
import Layout2 from "../Components/Layout2";
import { Dialog } from "primereact/dialog";
import { useRouter, withRouter } from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });
function AddStorefront() {
  const router = useRouter();
  const [selecteBlockchaine, setselectedBlockchaine] = useState("polygon");
  const blockchain = [
    { label: "Polygon", value: "polygon" },
    { label: "Ethereum", value: "ethereum" },
    { label: "Arbitrum", value: "arbitrum" },
    { label: "Optimism", value: "optimism" },
    { label: "Base", value: "base" },
    { label: "Polygon zkevm", value: "polygon_zkevm" },
    { label: "Scroll", value: "scroll" },
  ];
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [contractName, setContarctName] = useState("");
  const [description, setdescription] = useState();
  const [headline, setHeadline] = useState();
  const { layoutConfig } = useContext(LayoutContext);
  const [visible, setVisible] = useState(false);
  const [errors, setErros] = useState({
    contractNameEror: "",
    descriptionError: "",
    headlineError: "",
    uploadImageError: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [uploadImage, setuploadImage] = useState("");

  async function uploadBlobGetHash(file) {
    try {
      const blobDataImage = new Blob([file]);
      const metaHash = await client.storeBlob(blobDataImage);
      return metaHash;
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
  const getStorefrontData = async () => {
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
      console.log(error);
    }
  };

  const addStorefront = async () => {
    const token = localStorage.getItem("platform_token");
    const valid = onClickButton();
    if (valid) {
      const storefronts = await getStorefrontData();
      if (
        storefronts?.find(
          (sf) => sf.name?.toLowerCase() === contractName?.toLowerCase()
        )
      ) {
        const showSuccessPro = () => {
          toast.current.show({
            severity: "warn",
            detail: `Storefront name '${contractName}' is already exist Please Enter Another name`,
            life: 10000,
          });
        };
        showSuccessPro();
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        return;
      }

      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/storefront`,
          {
            name: contractName,
            image: uploadImage,
            headline: headline,
            description: description,
            blockchain: selecteBlockchaine,
            network: "testnet",
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

          router.push({
            pathname: "/step1",
            query: { storefrontId: response.data.storefrontId },
          });
        })
        .catch((error) => {
          console.log(error);
          // showError();
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
    <Layout2
      title="Add Storefront"
      description="This is used to Add Storefront Details"
    >
      <div>
        <Toast ref={toast} />

        <Dialog
          visible={visible}
          style={{ width: "30vw", height: "18vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="text-center">
            <div className="font-bold mt-5 text-2xl">Well Done !</div>
            <div className="mt-5 text-xl">
              <div>You have assumed the role of administrator.</div>
              <div>The deployment of Flow access master</div>
              <div>has been completed successfully.</div>
            </div>
          </div>
        </Dialog>
        <div>
          <div
            className="font-bold text-4xl p-5 text-black p-heading"
            style={{ borderBottom: "1px solid #aba2a2" }}
          >
            Add StoreFront Details
          </div>
          <div className="text-center text-3xl font-bold mt-5">
            Enter storefront Details in testnet
          </div>

          <div
            className={`${
              layoutConfig.colorScheme === "light"
                ? "back-color"
                : "back-color-black"
            }  p-5 mt-5 font-bold  flex gap-5`}
            style={{ width: "80%", margin: "0 auto" }}
          >
            <div style={{ width: "445px" }}>
              <div className="p-5" style={{ border: "1px solid" }}>
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
                  className="p-2 mt-3 input-back w-full"
                />
                <p className="text-red-600 text-left mt-2">
                  {!contractName ? errors.contractNameEror : ""}
                </p>
              </div>

              <div className="mt-5">Blockchain</div>

              <div className="mt-3">
                <Dropdown
                  value={selecteBlockchaine}
                  options={blockchain}
                  placeholder="Select Blockchain "
                  className="w-full "
                  onChange={({ value }) => setselectedBlockchaine(value)}
                />
              </div>

              <div className="mt-5">Headline</div>

              <div>
                <InputText
                  value={headline}
                  onChange={handleInputHeadline}
                  className="p-2 mt-3 input-back w-full"
                />
                <p className="text-red-600 text-left mt-2">
                  {!headline ? errors.headlineError : ""}
                </p>
              </div>

              <div className="mt-5">Description</div>

              <div>
                <InputText
                  value={description}
                  onChange={handleInputDescription}
                  className="p-2 mt-3 input-back w-full"
                />
                <p className="text-red-600 text-left mt-2">
                  {!description ? errors.descriptionError : ""}
                </p>
              </div>

              <div className="flex mt-5 justify-content-between">
                <div>
                  <Button
                    label="Continue"
                    onClick={addStorefront}
                    severity="Primary"
                    className=" mt-7 w-full buy-img"
                    style={{ width: "30%" }}
                    rounded
                    type="submit"
                    loading={loading}
                  />
                </div>
                <div>
                  <Button
                    label="Cancel"
                    severity="Primary"
                    className=" mt-7 w-full buy-img"
                    rounded
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
}
export default withRouter(AddStorefront);
