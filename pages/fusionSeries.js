import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { withRouter } from "next/router";
import Link from "next/link";
import Layout2 from "../Components/Layout2";
import { Dropdown } from "primereact/dropdown";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
class FusionSeries extends React.Component {
  constructor(props) {
    super(props);
    this.showError = this.showError.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
  }
  showSuccess() {
    this.toast.show({
      severity: "success",
      summary: "Success",
      detail: "Your FusionSeries contract has been  successfully deployed",
      life: 10000,
    });
  }
  showError() {
    this.toast.show({
      severity: "error",
      summary: "Error",
      detail: "Error While Deploying Fusion Series Contarct",
      life: 10000,
    });
  }
  state = {
    rows: [{}],
    contractName: "",
    contractSymbol: "",
    fusionseriesResponse: "",
    loading: false,
    loading2: false,
    storefrontId: "",
    storefrontData: "",
    submitClicked: false,
    selecteBlockchaine: null,
    errors: {
      contractNameEror: "",
      symbolError: "",
    },
  };
  blockchain = [
    { name: "Polygon", value: "Polygon" },
    { name: "Ethereum", value: "Ethereum" },
  ];
  load = () => {
    this.setState({ loading2: true });

    setTimeout(() => {
      this.setState({ loading2: false });
    }, 2000);
  };
  handleAddRow = () => {
    const item = {
      name: "",
      symbol: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
    });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };

  componentDidMount() {
    this.getStorefrontData();
  }
  getStorefrontData = () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/storefront`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response?.data?.length > 0) {
          this.setState({ storefrontData: response.data });
          this.setState({
            storefrontId: response.data[response.data.length - 1].id,
          });
        }
      })
      .catch(() => {
        showError();
      });
  };
  fusionSerisData = () => {
    const token = localStorage.getItem("platform_token");
    const valid = this.onClickButton();
    if (valid) {
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
          {
            contractName: "FusionSeries",
            constructorParams: {
              param1: "www.xyz.com",
              param2: this.state.contractName,
              param3: this.state.contractSymbol,
              param4: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
              param5: "0xEFf4209584cc2cE0409a5FA06175002537b055DC",
            },
            network: "maticmum",
            storefrontId: this.state.storefrontId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        .then(async (response) => {
          this.showSuccess();
          setTimeout(() => {
            this.setState({ loading: false });
          }, 2000);
          this.setState({
            fusionseriesResponse: response.data.contractAddress,
          });
        })
        .catch(() => {
          this.showError();
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  // useEffect(() => {
  //   setTradhubContarctAddress(props.router.query.contractAddress);
  // }, [props.router.query.contractAddress]);

  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
  };
  handleInputName = (e) => {
    this.setState({ contractName: e.target.value, contractNameEror: "" });
  };
  handleInputSymbol = (e) => {
    this.setState({ contractSymbol: e.target.value, symbolError: "" });
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

  render() {
    return (
      <Layout2
        title=" Deploy FusionSeries"
        description="This is use to show deployed FusionSeries Form"
      >
        <div className="buy-back-image">
          <div>
            <div
              className="flex justify-content-between p-3"
              style={{ borderBottom: "2px solid" }}
            >
              <div className=" p-5 font-bold text-center text-black">
                Step 2 : Deploy FusionSeries
              </div>
              <div className="mt-5">
                <Dropdown
                  value={this.state.selecteBlockchaine}
                  onChange={(e) =>
                    this.setState({ selecteBlockchaine: e.value })
                  }
                  options={this.blockchain}
                  optionLabel="name"
                  placeholder="Chains "
                  className="w-full font-bold"
                  style={{ borderRadius: "20px" }}
                />
              </div>
            </div>
            <div className="flex justify-content-center gap-5">
              <div
                className=" buy-img mt-5 back-color p-5"
                style={{ width: "50%" }}
              >
                <div className="text-center mt-5">
                  {this.state.rows.map((item, idx) => (
                    <div id="addr0" key={idx} className=" mt-5">
                      <div className="">
                        <div>
                          <div className="text-left">
                            Enter FusionSeries Name
                          </div>

                          <InputText
                            value={this.state.rows[idx].ontractName}
                            onChange={this.handleInputName}
                            className="p-2 mt-3 input-back w-full text-white"
                          />
                          <p style={{ textAlign: "left", color: "red" }}>
                            {!this.state.contractName
                              ? this.state.contractNameEror
                              : ""}
                          </p>
                        </div>
                        <div className="mt-5">
                          <div className=" text-left">
                            Enter FusionSeries Symbol
                          </div>

                          <InputText
                            value={this.state.rows[idx].contractSymbol}
                            onChange={this.handleInputSymbol}
                            className="p-2 mt-3 input-back w-full text-white"
                          />
                          <p style={{ textAlign: "left", color: "red" }}>
                            {!this.state.contractSymbol
                              ? this.state.symbolError
                              : ""}
                          </p>
                          <div className="mt-5">
                            <Button
                              severity="danger"
                              icon="pi pi-minus"
                              className="buy-img"
                              onClick={this.handleRemoveSpecificRow(idx)}
                            ></Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-5">
                    <Button
                      icon="pi pi-plus"
                      label="Add Another FusionSeries"
                      severity="info"
                      className="buy-img"
                      onClick={this.handleAddRow}
                    />
                  </div>
                </div>
                <div className="flex justify-content-between mt-5">
                  <div>
                    <Button
                      onClick={this.fusionSerisData}
                      label="Deploy FusionSeries"
                      severity="Primary"
                      className="buy-img"
                      type="submit"
                      rounded
                      loading={this.state.loading}
                    />
                  </div>
                  {this.state.fusionseriesResponse && (
                    <div>
                      <Link href="/eternumPass">
                        <Button
                          label="Continue"
                          severity="Primary"
                          onClick={this.load}
                          className="buy-img"
                          rounded
                          loading={this.state.loading2}
                        />
                      </Link>
                    </div>
                  )}
                </div>
                <Toast ref={(el) => (this.toast = el)} />
              </div>
            </div>
          </div>
        </div>
      </Layout2>
    );
  }
}

export default withRouter(FusionSeries);
