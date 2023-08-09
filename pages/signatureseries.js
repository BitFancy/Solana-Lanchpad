import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import Router, { withRouter } from "next/router";
import axios from "axios";
import AppTopbar from "../layout/AppTopbar";
import { Toast } from "primereact/toast";
import Link from "next/link";

const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
class SignatureSeries extends React.Component {
  constructor(props) {
    super(props);
    this.showError = this.showError.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
  }
  showSuccess() {
    this.toast.show({
      severity: "success",
      summary: "Success",
      detail: "Your SignatureSeries contract has been  successfully deployed",
      life: 10000,
    });
  }
  showError() {
    this.toast.show({
      severity: "error",
      summary: "Error",
      detail: "Something Went Wrong Please Try Again",
      life: 10000,
    });
  }
  state = {
    rows: [{}],
    contractName: "",
    contractSymbol: "",
    supabaseToken: "",
    loading: false,
  };
  handleAddRow = () => {
    const item = {
      contractName: "",
      contractSymbol: "",
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
  signatureSeriesdata = () => {
    const token = localStorage.getItem("authToken");
    this.setState({ loading: true });
    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
        {
          contractName: "SignatureSeries",
          constructorParams: {
            param1: this.state.contractName,
            param2: this.state.contractSymbol,
            param3: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
            param4: "0xEFf4209584cc2cE0409a5FA06175002537b055DC",
          },
          network: "maticmum",
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
        console.log("response SignatureSeries data", response);
        this.setState({ supabaseToken: response.data.contractAddress });
        Router.push({ pathname: "/eturnalsol" });

      })

      .catch((error) => {
        console.log("err", error);
        this.showError();
      });
  };
  handleInputName = (e) => {
    this.setState({ contractName: e.target.value });
  };
  handleInputSymbol = (e) => {
    this.setState({ contractSymbol: e.target.value });
  };
  // useEffect(() => {
  //   setTradhubContarctAddress(props.router.query.contractAddress);
  // }, [props.router.query.contractAddress]);

  render() {
    return (
      <div
        title="Deploy SignatureSeries"
        description="This is use to show information of the deploy signatureSeries contract"
        className="back-img-sig"
      >
        <AppTopbar />
        <div style={{ marginTop: "100px" }}>
          <div
            className=" p-5 font-bold text-center"
            style={{ borderBottom: "2px solid" }}
          >
            Deploy SignatureSeries
          </div>
          <div className="flex justify-content-center gap-5">
            <div className="card mt-5" style={{ width: "50%" }}>
              <div className="text-center mt-5">
                {this.state.rows.map((item, idx) => (
                  <div id="addr0" key={idx} className="card mt-5">
                    <div className="">
                      <div>
                        <div className="text-left">
                          Enter SignatureSeries Name
                        </div>

                        <InputText
                          value={this.state.rows[idx].ontractName}
                          onChange={this.handleInputName}
                          name="name"
                          className="p-2 mt-3 input-back w-full text-white"
                        />
                      </div>
                      <div>
                        <div className="mt-3 text-left">
                          Enter SignatureSeries Symbol
                        </div>

                        <InputText
                          value={this.state.rows[idx].contractSymbol}
                          onChange={this.handleInputSymbol}
                          name="mobile"
                          className="p-2 mt-3 input-back w-full text-white"
                          type="text"
                        />
                        <div className="mt-5">
                          <Button
                            severity="danger"
                            icon="pi pi-minus"
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
                    label="Add Another SignatureSeries"
                    severity="info"
                    onClick={this.handleAddRow}
                  />
                </div>
              </div>
              <div className="flex justify-content-between mt-5">
              <div className="text-center mt-5">
                <Button
                  onClick={this.signatureSeriesdata}
                  label="Deploy SignatureSeries"
                  severity="Primary"
                  icon="pi pi-external-link"
                  rounded
                  loading={this.state.loading}
                  className="w-full"
                />
              </div>
              <div className="text-center mt-5">
              <Link href='/eturnalsol'>
                <Button
                  label="Continue"
                  severity="Primary"
                  icon="pi pi-external-link"
                  rounded
                  loading={this.state.loading}
                  className="w-full"
                />
                </Link>
              </div>
              </div>
              
            </div>
            <Toast ref={(el) => (this.toast = el)} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignatureSeries);
