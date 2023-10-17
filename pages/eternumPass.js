import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useContext, useEffect } from "react";
import { withRouter } from "next/router";
import axios from "axios";
import { Toast } from "primereact/toast";
import Link from "next/link";
import Layout2 from "../Components/Layout2";
import { LayoutContext } from "../layout/context/layoutcontext";
import { FileUpload } from "primereact/fileupload";
import { NFTStorage } from "nft.storage";
import {
  getAccessMasterByStorefrontID,
  getStorefrontByID,
  getTradeHubByStorefrontID,
} from "../utils/util";
import { Dialog } from "primereact/dialog";
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const EternumPass = (props) => {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [visible, setVisible] = useState(false);
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [platformFeeBasePrice, setplatformFeeBasePrice] = useState("");
  const [subspricePerMonth, setSubspricePerMonth] = useState("");
  const [royltybps, setRoyltybps] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [uploadImageCover, setUploadImageCover] = useState("");
  const [accsessmasterAddress, setAccessMasterAddress] = useState("");
  const [tradhubAddress, setTradhubAddress] = useState("");
  const [storefrontData, setstorefrontData] = useState("");
  const [zipfile, setZipFile] = useState("");


  const { layoutConfig } = useContext(LayoutContext);
  const [errors, setErros] = useState({
    contractNameError: "",
    contractSymbolError: "",
    salePriceError: "",
    platformFeeBasePriceError: "",
    subspricePerMonthError: "",
    royltybpsError: "",
  });

  const [submitClicked, setSubmitClicked] = useState(false);
 
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail:
        "Error While deploying Eternumpass contract",
      life: 2000,
    });
  };
  useEffect(() => {
    getBlocchain();
    getAccessMasterByStorefrontID(props.router.query.storefrontId).then(
      (response) => {
        setAccessMasterAddress(response[0]?.contractAddress,);
      }
    );
    getTradeHubByStorefrontID(props.router.query.storefrontId).then(
      (response) => {
        setTradhubAddress(response[0]?.contractAddress);
      }
    );
  }, []);


  const getBlocchain=async()=>{
    const  payload  = await getStorefrontByID(props.router.query.storefrontId);
    setstorefrontData(payload)
  }
  const [eturnumpassResponse, setEturnumpassResponse] = useState();

  const getAllContarctData = async () => {
    const token = localStorage.getItem("platform_token");
    const { data } = await axios.get(
      `${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  };
  const eturnumpassContarctData = async() => {
    const token = localStorage.getItem("platform_token");
    const valid = onClickButton();
    if (valid) {
      const getcontractName = await getAllContarctData();
      if (
        getcontractName?.find(
          (cn) =>
            cn.collectionName?.toLowerCase() === contractName?.toLowerCase()
        )
      ) {
        const showSuccessPro = () => {
          toast.current.show({
            severity: "warn",
            detail:  `Contract name' ${contractName}' is already exist please Enter another name`,
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
          `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
          {
            contractName: "EternumPass",
            constructorParams: {
              param1: contractName,
              param2: contractSymbol,
              param3: "www.xyz.com",
              param4: salePrice,
              param5: platformFeeBasePrice,
              param6: subspricePerMonth,
              param7: royltybps,
              param8: accsessmasterAddress,
              param9: tradhubAddress,
            },
            network: "maticmum",
            storefrontId: props.router.query.storefrontId,
            collectionName: contractName,
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
            setVisible(true)
          }, 2000);
          setEturnumpassResponse(response.data.contractAddress);
        })

        .catch((error) => {
          console.log(error);
          showError();

        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };
  const handleInputSymbol = (e) => {
    setcontractSymbol(e.target.value);
  };
  const handleInputSalePrice = (e) => {
    setSalePrice(e.target.value);
  };

  const handleInputPlatformFee = (e) => {
    setplatformFeeBasePrice(e.target.value);
  };
  const handleInputSubscriptionPrice = (e) => {
    setSubspricePerMonth(e.target.value);
  };

  const handleInputRoyelty = (e) => {
    setRoyltybps(e.target.value);
  };

  const load4 = () => {
    setLoading4(true);

    setTimeout(() => {
      setLoading4(false);
    }, 2000);
  };
  const load3 = () => {
    setLoading3(true);

    setTimeout(() => {
      setLoading3(false);
    }, 2000);
  };
  const onClickButton = () => {
    if (!contractName) {
      setErros({ contractNameError: "Please Enter Contarct Name" });
      return false;
    } else if (!contractSymbol) {
      setErros({ contractSymbolError: "Please Enter Symbol description" });
      return false;
    } else if (!salePrice) {
      setErros({ salePriceError: "Please Enter Sale Price" });
      return false;
    } else if (!platformFeeBasePrice) {
      setErros({
        platformFeeBasePriceError: "Please Enter Platform Fee Price",
      });
      return false;
    } else if (!subspricePerMonth) {
      setErros({
        subspricePerMonthError: "Please Enter Subscription Per Months Price",
      });
      return false;
    } else if (!royltybps) {
      setErros({ royltybpsError: "Please Enter Roylty BPS" });
      return false;
    } else if (
      contractName &&
      contractSymbol &&
      salePrice &&
      platformFeeBasePrice &&
      subspricePerMonth &&
      royltybps
    ) {
      setSubmitClicked(true);
      setLoading(true);
      return true;
    }
  };

  const uploadBlobGetHash = async (file) => {
    try {
      const blobDataImage = new Blob([file]);
      const metaHash = await client.storeBlob(blobDataImage);
      return metaHash;
    } catch (error) {
      console.log("error while upload image", error);
    }
  };
  const getMetaHashURI = (metaHash) => `ipfs://${metaHash}`;
  const onChangeThumbnail = async (e) => {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setThumbnail(metaHashURI);
    } catch (error) {
      console.log("error while upload image", error);
    }
  };


  const onChangeZipFile = async (e) => {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setZipFile(metaHashURI);
    } catch (error) {
      console.log("error while upload image", error);
    }
  };
  const onChangeThumbnailCover = async (e) => {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setUploadImageCover(metaHashURI);
    } catch (error) {
      console.log("error while upload image", error);
    }
  };

  return (
    <Layout2
      title="Deploy Eternumpass"
      description="This is use to show information of the deploy Eternumpass contract"
    >
      <div
       
      >
        <Toast ref={toast} />

        <Dialog
          visible={visible}
          style={{ width: "30vw", height: "18vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="text-center">
            <div className="font-bold text-2xl">Step 3 of 3</div>
            <div className="mt-5 text-xl">Deploying storefront Webapp</div>
          </div>
        </Dialog>
        <div>
          <div
            className="flex justify-content-between p-3"
            style={{ borderBottom: "2px solid" }}
          >
            <div className=" p-5 font-bold text-3xl text-center p-heading">
              Deploy EternumPass
            </div>
            <div className="mt-5">
              <span className="blockchain-label">{storefrontData?.payload?.blockchain}</span>
            </div>
          </div>

          <div className="flex justify-content-center gap-5 mt-5">
            <div style={{ width: "50%" }}
             className={`${layoutConfig.colorScheme === 'light' ? 'back-color' : 'back-color-black' }  p-5 mt-5`} 
            >
              <div className="p-heading">Enter Eternum Pass Name</div>
              <div className="mt-3">
                <InputText
                  className="p-2 input-back w-full "
                  onChange={handleInputName}
                  value={contractName}
                />
                <p className="text-left text-red-600 mt-2">
                  {!contractName ? errors.contractNameError : ""}
                </p>
              </div>

              <div className="mt-5 p-heading">Enter Eternum Pass Symbol</div>

              <div className="  mt-3">
                <InputText
                  className="p-2  input-back w-full "
                  value={contractSymbol}
                  onChange={handleInputSymbol}
                />
                <p className="text-left text-red-600 mt-2">
                  {!contractSymbol ? errors.contractSymbolError : ""}
                </p>
              </div>

              <div className="mt-5 p-heading">Sale Price</div>

              <div className="  mt-3">
                <InputText
                  className="p-2  input-back w-full "
                  value={salePrice}
                  onChange={handleInputSalePrice}
                />
                <p className="text-left text-red-600 mt-2">
                  {!salePrice ? errors.salePriceError : ""}
                </p>
              </div>

              <div className="mt-5">Platform Fee BasisPoint</div>

              <div className=" mt-3">
                <InputText
                  value={platformFeeBasePrice}
                  onChange={handleInputPlatformFee}
                  className="p-2 input-back w-full "
                />
                <p
                  className="text-left text-red-600 mt-2"
                  style={{ textAlign: "left", color: "red" }}
                >
                  {!platformFeeBasePrice
                    ? errors.platformFeeBasePriceError
                    : ""}
                </p>
              </div>
              <div className="mt-5 p-heading">
              Subscription Price/month
              </div>

              <div className=" mt-3">
                <InputText
                  value={subspricePerMonth}
                  onChange={handleInputSubscriptionPrice}
                  className="p-2  input-back w-full "
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!subspricePerMonth ? errors.subspricePerMonthError : ""}
                </p>
              </div>

              <div className="mt-5 p-heading">Royalty BPS</div>

              <div className=" mt-3">
                <InputText
                  value={royltybps}
                  onChange={handleInputRoyelty}
                  className="p-2 input-back w-full"
                />
                <p style={{ textAlign: "left", color: "red" }}>
                  {!royltybps ? errors.royltybpsError : ""}
                </p>
              </div>

              <div className="flex justify-content-between mt-5">
                <div>Thumbnail</div>
                <div>Cover Image</div>
              </div>
              <div className="flex mt-3" style={{ gap: "70px" }}>
                <div
                  style={{
                    border: "1px solid",
                    padding: "15px",
                    width: "45%",
                  }}
                >
                  <FileUpload
                    type="file"
                    onSelect={(event) => {
                      onChangeThumbnail(event);
                    }}
                    uploadHandler={(e) =>
                      console.log("File upload handler", e.files)
                    }
                    value={thumbnail}
                    accept="image/*"
                    maxFileSize={1000000}
                  />
                </div>
                <div
                  style={{
                    border: "1px solid",
                    padding: "15px",
                    width: "45%",
                  }}
                >
                  <FileUpload
                    type="file"
                    onSelect={(event) => {
                      onChangeThumbnailCover(event);
                    }}
                    uploadHandler={(e) =>
                      console.log("File upload handler", e.files)
                    }
                    value={uploadImageCover}
                    accept="image/*"
                    maxFileSize={1000000}
                  />
                </div>
              </div>


              <div className="mt-5 p-heading">Upload Zip File</div>
              <div className="mt-3"
                  style={{
                    border: "1px solid",
                    padding: "15px",
                    
                  }}
                >
                  <FileUpload
                    type="file"
                    onSelect={(event) => {
                      onChangeZipFile(event);
                    }}
                    uploadHandler={(e) =>
                      console.log("File upload handler", e.files)
                    }
                    value={zipfile}
                    accept="image/*"
                    maxFileSize={1000000}
                  />
                </div>

              <div className="flex mt-5 justify-content-center">
                <div>
                  <Button
                    label="Deploy EternumPass"
                    onClick={eturnumpassContarctData}
                    severity="Primary"
                    className=" mt-7 w-full buy-img"
                    style={{ width: "30%" }}
                    rounded
                    type="submit"
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-content-center mt-5"
            style={{ gap: "445px" }}
          >
            <div className="text-center mt-5">
              <Link
                href={{
                  pathname: "/launchSignatureseries",
                  query: { storefrontId: props?.router?.query?.storefrontId },
                }}
              >
                <Button
                  label="Back"
                  severity="Primary"
                  rounded
                  loading={loading3}
                  onClick={load3}
                  className=" buy-img"
                  style={{ padding: "10px 60px 10px 60px" }}
                />
              </Link>
            </div>
            {eturnumpassResponse && (
              <div className="text-center mt-5">
                <Link
                  href={{
                    pathname: "/webappForm",
                    query: { storefrontId: props?.router?.query?.storefrontId },
                  }}
                >
                  <Button
                    label="Next"
                    severity="Primary"
                    rounded
                    loading={loading4}
                    onClick={load4}
                    className=" buy-img"
                    style={{ padding: "10px 60px 10px 60px" }}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default withRouter(EternumPass);
