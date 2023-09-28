import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import Router, { withRouter } from "next/router";
import Link from "next/link";
import Layout2 from "../Components/Layout2";
import { Dropdown } from "primereact/dropdown";
import { LayoutContext } from "../layout/context/layoutcontext";
import { Dialog } from "primereact/dialog";
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });
import {
  getAccessMasterByStorefrontID,
  getStorefrontByID,
  getTradeHubByStorefrontID,
} from "../utils/util";
import { FileUpload } from "primereact/fileupload";
import { NFTStorage } from "nft.storage";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
class FusionSeries extends React.Component {
  constructor(props) {
    super(props);
    this.showError = this.showError.bind(this);

    this.state = {
      contractName: "",
      contractSymbol: "",
      fusionseriesResponse: "",
      loading: false,
      accsessmasterAddress: "",
      tradhubAddress: "",
      thumbnail: "",
      uploadImageCover: "",

      visible: false,
      loading2: false,
      loading4: false,
      submitClicked: false,
      selecteBlockchaine: null,
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
 

  blockchain = [
    { name: "Polygon", value: "Polygon" },
    { name: "Ethereum", value: "Ethereum" },
  ];

  async componentDidMount() {
    const { payload } = await getStorefrontByID(
      "b68284bd-2c23-4f9d-8a4a-85cf816358c7"
    );
    this.setState({ storefrontData: payload });
    console.log("Data", payload);

    getAccessMasterByStorefrontID(this.props.router.query.storefrontId).then(
      (response) => {
        this.setState({ accsessmasterAddress: response[0]?.contractAddress });
      }
    );
    getTradeHubByStorefrontID(this.props.router.query.storefrontId).then(
      (response) => {
        this.setState({ tradhubAddress: response[0]?.contractAddress });
      }
    );
  }

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

  getAllContarctData = async () => {
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
  fusionSerisData = async() => {
    const token = localStorage.getItem("platform_token");
    const valid = this.onClickButton();
    if (valid) {
      const contractName = await this.getAllContarctData();
      if (
        contractName?.find(
          (sf) =>
            sf.collectionName?.toLowerCase() ===
            this.state.contractName?.toLowerCase()
        )
      ) {
        const showSuccessPro = () => {
          this.toast.show({
            severity: "warn",
            detail: `Contract name' ${this.state.contractName}' is already exist please enter another name`,
            life: 10000,
          });
        };
       showSuccessPro();
        setTimeout(() => {
          this.setState({ loading: false });
        }, 2000);

        return;
      }
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
          {
            contractName: "FusionSeries",
            constructorParams: {
              param1: "www.xyz.com",
              param2: this.state.contractName,
              param3: this.state.contractSymbol,
              param4: this.state.tradhubAddress,
              param5: this.state.accsessmasterAddress,
            },
            network: "maticmum",
            storefrontId: this.props?.router?.query?.storefrontId,
            collectionName: this.state.contractName,
            thumbnail: this.state.thumbnail,
            coverImage: this.state.uploadImageCover,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        .then(async (response) => {

          setTimeout(() => {
            this.setState({ loading: false,visible:true });

          }, 2000);
          this.setState({
            fusionseriesResponse: response.data.contractAddress,
          });
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

  handleInputName = (e) => {
    this.setState({ contractName: e.target.value, contractNameEror: "" });
  };
  handleInputSymbol = (e) => {
    this.setState({ contractSymbol: e.target.value, symbolError: "" });
  };

  navigateTo = (nav) => {
    Router.push(nav);
  };
  onClickButton = () => {
    if (!this.state.contractName) {
      this.setState({
        contractNameEror: "Please Enter FusionSeries  Name",
      });
      return false;
    } else if (!this.state.contractSymbol) {
      this.setState({
        symbolError: "Please Enter FusionSeries Symbol Descriptio",
      });
      return false;
    } else if (this.state.contractName && this.state.contractSymbol) {
      this.setState({ submitClicked: true });
      this.setState({ loading: true });
      return true;
    }
  };

  showError() {
    this.toast.show({
      severity: "error",
      summary: "Error",
      detail: "Error While deploying fusion series contract",
      life: 10000,
    });
  }
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
      const metaHash = await this.uploadBlobGetHash(thumbnail);
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
      const metaHash = await this.uploadBlobGetHash(thumbnail);
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
        title=" Deploy FusionSeries"
        description="This is use to show deployed FusionSeries Form"
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
        <div
          className={`${
            this.context.layoutConfig.colorScheme === "light"
              ? "buy-back-image"
              : "dark"
          } `}
        >
          <div>
            <div
              className="flex justify-content-between p-3"
              style={{ borderBottom: "2px solid" }}
            >
              <div className=" p-5 font-bold text-3xl text-center text-black">
                Step 2 : Deploy FusionSeries
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
                  {!this.state.fusionseriesResponse ? (
                    <>
                      <div id="addr0" className=" mt-5">
                        <div>
                          <div className="text-left text-black">
                            Enter FusionSeries Name
                          </div>
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
                            Enter FusionSeries Symbol
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
                          onClick={this.fusionSerisData}
                          label="Deploy FusionSeries"
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
                        <div className="font-bold">
                          Add another FusionSeries
                        </div>
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
              {this.state.fusionseriesResponse && (
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

export default withRouter(FusionSeries);
