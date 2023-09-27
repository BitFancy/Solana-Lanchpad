import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { withRouter } from "next/router";
import axios from "axios";
import { Toast } from "primereact/toast";
import Link from "next/link";
import Layout2 from "../Components/Layout2";
import { LayoutContext } from "../layout/context/layoutcontext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });

import {
  getAccessMasterByStorefrontID,
  getStorefrontByID,
} from "../utils/util";
import { NFTStorage } from "nft.storage";
import { FileUpload } from "primereact/fileupload";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
class Eturnulsol extends React.Component {
  constructor(props) {
    super(props);
    this.showError = this.showError.bind(this);

    this.state = {
      contractName: "",
      contractSymbol: "",
      eturnalsolResponse: "",
      accsessmasterAddress: "",
      loading: false,
      visible: false,
      thumbnail: "",
      uploadImageCover: "",
      loading2: false,
      loading4: false,
      submitClicked: false,
      errors: {
        contractNameEror: "",
        symbolError: "",
      },
      storefrontData: {},
    };
    let copyState = this.state;
    delete copyState.storefrontData;
    this.initialState = { ...copyState };
  }
  async componentDidMount() {
    const { payload } = await getStorefrontByID(
      "b68284bd-2c23-4f9d-8a4a-85cf816358c7"
    );
    this.setState({ storefrontData: payload });
    console.log("Data", payload);
  }

  async componentDidMount() {
    getAccessMasterByStorefrontID(this.props.router.query.storefrontId).then(
      (response) => {
        this.setState({ accsessmasterAddress: response[0]?.contractAddress });
      }
    );
  }
  showError() {
    this.toast.show({
      severity: "error",
      summary: "Error",
      detail: "Error While deploying eturnalsol  contract",
      life: 10000,
    });
  }
  eturnulsolData = () => {
    const token = localStorage.getItem("platform_token");

    const valid = this.onClickButton();
    if (valid) {
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
          {
            contractName: "EternalSoul",
            constructorParams: {
              param1: this.state.contractName,
              param2: this.state.contractSymbol,
              param3: "www.xyz.com",
              param4: this.state.accsessmasterAddress,
            },
            network: "maticmum",
            storefrontId: this.props?.router?.query?.storefrontId,
            collectionName: this.state.contractName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (response) => {
          this.setState({ visible: true });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 2000);
          this.setState({ eturnalsolResponse: response.data.contractAddress });
          this.setState({ storefrontId: response.data.storefrontId });
        })
        .catch((error) => {
          console.log(error);
          this.showError();
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  load = () => {
    this.setState({ loading2: true });

    setTimeout(() => {
      this.setState({ loading2: false });
    }, 2000);
  };

  load4 = () => {
    this.setState({ loading4: true });
    setTimeout(() => {
      this.setState({ loading4: false });
    }, 2000);
  };

  handleInputName = (e) => {
    this.setState({ contractName: e.target.value, contractNameEror: "" });
    this.setState({ loading: false });
  };
  handleInputSymbol = (e) => {
    this.setState({ contractSymbol: e.target.value, symbolError: "" });
    this.setState({ loading: false });
  };

  onClickButton = () => {
    if (!this.state.contractName) {
      this.setState({
        contractNameEror: "Please Enter EternalSoul Name",
      });
      return false;
    } else if (!this.state.contractSymbol) {
      this.setState({
        symbolError: "Please Enter EternalSoul Symbol Description",
      });
      return false;
    } else if (this.state.contractName && this.state.contractSymbol) {
      this.setState({ submitClicked: true });
      this.setState({ loading: true });
      return true;
    }
  };

  uploadBlobGetHash = async (file) => {
    try {
      const blobDataImage = new Blob([file]);
      const metaHash = await client.storeBlob(blobDataImage);
      return metaHash;
    } catch (error) {
      console.log("error while upload image", error);
    }
  };
  getMetaHashURI = (metaHash) => `ipfs://${metaHash}`;
  onChangeThumbnail = async (e) => {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = this.getMetaHashURI(metaHash);
      this.setState({ thumbnail: metaHashURI });
    } catch (error) {
      console.log("error while upload image", error);
    }
  };

  onChangeThumbnailCover = async (e) => {
    const file = e.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = this.getMetaHashURI(metaHash);
      this.setState({ uploadImageCover: metaHashURI });
    } catch (error) {
      console.log("error while upload image", error);
    }
  };
  static contextType = LayoutContext;

  render() {
    return (
      <Layout2
        title="Deploy Eturnalsol"
        description="This is use to show information of the deploy Eturnalsol contract"
      >
        <div
          className={`${
            this.context.layoutConfig.colorScheme === "light"
              ? "buy-back-image"
              : "dark"
          } `}
        >
          <Dialog
            visible={this.state.visible}
            style={{ width: "30vw", height: "18vw" }}
            onHide={() => this.setState({ visible: false })}
          >
            <div className="text-center">
              <div className="font-bold text-2xl">Step 3 of 3</div>
              <div className="mt-3 text-xl">Deploying storefront Webapp</div>
            </div>
          </Dialog>
          <div>
            <div
              className="flex justify-content-between p-3"
              style={{ borderBottom: "2px solid" }}
            >
              <div className=" p-5 font-bold text-center text-black">
                Step 2 : Deploy EternalSoul
              </div>
              <div className="mt-5">
                {/* <Dropdown
                  value={this.state.selecteBlockchaine}
                  onChange={(e) =>
                    this.setState({ selecteBlockchaine: e.value })
                  }
                  options={this.blockchain}
                  optionLabel="name"
                  placeholder="Chains "
                  className="w-full font-bold"
                  style={{ borderRadius: "20px" }}
                /> */}
                <span className="blockchain-label">
                  {this.state.storefrontData?.blockchain}
                </span>
              </div>
            </div>
            <div className="flex justify-content-center gap-5">
              <div
                className="card buy-img mt-5 back-color"
                style={{ width: "50%" }}
              >
                <div className="text-center mt-5">
                  {!this.state.eturnalsolResponse ? (
                    <>
                      <div id="addr0" className=" mt-5">
                        <div>
                          <div className="text-left text-black">Enter Name</div>
                          <InputText
                            value={this.state.contractName}
                            onChange={this.handleInputName}
                            className="p-2 mt-3 input-back w-full "
                          />
                          <p style={{ textAlign: "left", color: "red" }}>
                            {!this.state.contractName
                              ? this.state.contractNameEror
                              : ""}
                          </p>
                        </div>
                        <div className="mt-5">
                          <div className="text-left">
                            Enter EternalSoul Symbol
                          </div>

                          <InputText
                            value={this.state.contractSymbol}
                            onChange={this.handleInputSymbol}
                            className="p-2 mt-3 input-back w-full "
                          />
                          <p style={{ textAlign: "left", color: "red" }}>
                            {!this.state.contractSymbol
                              ? this.state.symbolError
                              : ""}
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
                                this.onChangeThumbnail(event);
                              }}
                              uploadHandler={(e) =>
                                console.log("File upload handler", e.files)
                              }
                              value={this.state.thumbnail}
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
                                this.onChangeThumbnailCover(event);
                              }}
                              uploadHandler={(e) =>
                                console.log("File upload handler", e.files)
                              }
                              value={this.state.uploadImageCover}
                              accept="image/*"
                              maxFileSize={1000000}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-center"
                        style={{ marginTop: "60px" }}
                      >
                        <Button
                          onClick={this.eturnulsolData}
                          label="Deploy Eturnulsol"
                          severity="Primary"
                          rounded
                          loading={this.state.loading}
                          className="buy-img"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-content-between">
                        <div className="font-bold">Add another EternalSoul</div>
                        <div className="font-bold text-left">
                          Choose another contract
                        </div>
                      </div>
                      <div className="flex mt-3 justify-content-between text-center">
                        <div
                          style={{
                            border: "1px solid",
                            padding: "20px 130px 25px 130px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        >
                          <i
                            onClick={this.handleForm}
                            className="pi pi-plus cursor-pointer"
                          ></i>
                        </div>
                        <div
                          style={{
                            border: "1px solid",
                            padding: "20px 130px 25px 130px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        >
                          <i
                            onClick={() =>
                              this.navigateTo("/launchSignatureseries")
                            }
                            className="pi pi-plus cursor-pointer"
                          ></i>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Toast ref={(el) => (this.toast = el)} />
            </div>
            <div
              className="flex justify-content-center mt-5"
              style={{ gap: "445px" }}
            >
              <div className="text-center mt-5">
                <Link
                  href={{
                    pathname: "/launchSignatureseries",
                    query: {
                      storefrontId: this.props?.router?.query?.storefrontId,
                    },
                  }}
                >
                  <Button
                    label="Back"
                    severity="Primary"
                    rounded
                    loading={this.state.loading2}
                    onClick={this.load}
                    className=" buy-img"
                    style={{ padding: "10px 60px 10px 60px" }}
                  />
                </Link>
              </div>

              {this.state.eturnalsolResponse && (
                <div className="text-center mt-5">
                  <Link
                    href={{
                      pathname: "/webappForm",
                      query: {
                        storefrontId: this.props?.router?.query?.storefrontId,
                      },
                    }}
                  >
                    <Button
                      label="Next"
                      severity="Primary"
                      rounded
                      loading={this.loading4}
                      onClick={this.load4}
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
  }
}

export default withRouter(Eturnulsol);
