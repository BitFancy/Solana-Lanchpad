import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { withRouter } from "next/router";
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
    this.state = {
      rows: [{}],
      contractName: "",
      contractSymbol: "",
      signatureseriesRespoanse: "",
      loading: false,
      loading2: false,
      submitClicked: false,
      errors: {
        contractNameEror: "",
        symbolError: "",
      },
    };
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
      detail: "Error While deploying signature series contract",
      life: 10000,
    });
  }

  handleAddRow = () => {
    const item = {
      name: "",
      symbol: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };
  load = () => {
    this.setState({ loading2: true });

    setTimeout(() => {
      this.setState({ loading2: false });
    }, 2000);
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
    const token = localStorage.getItem("platform_token");
   const valid= this.onClickButton();
   if(valid){
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
      this.setState({
        signatureseriesRespoanse: response.data.contractAddress,
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

  handleInputName = (e) => {
    this.setState({ contractName: e.target.value, contractNameEror: "" });
  };
  handleInputSymbol = (e) => {
    this.setState({ contractSymbol: e.target.value, symbolError: "" });
  };

 
  onClickButton = () => {
    if (!this.state.contractName) {
      this.setState({
        contractNameEror: "Please Enter Signatureseries  Name"
      });   
       return false;
    } else if (!this.state.contractSymbol) {
      this.setState({
        symbolError: "Please Enter Signatureseries Symbol Descriptio"
      });   
      return false;
    } else if (this.state.contractName && this.state.contractSymbol) {
      this.setState({submitClicked:true})
      this.setState({loading:true})
      return true;
    }
  };

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
                          value={this.state.rows[idx].contractName}
                          onChange={this.handleInputName}
                          className="p-2 mt-3 input-back w-full text-white"
                        />
                        <p  style={{textAlign:'left',color:'red'}}>
                          {!this.state.contractName
                            ? this.state.contractNameEror
                            : ""}
                        </p>
                      </div>
                      <div>
                        <div className="mt-3 text-left">
                          Enter SignatureSeries Symbol
                        </div>

                        <InputText
                          value={this.state.rows[idx].contractSymbol}
                          onChange={this.handleInputSymbol}
                          className="p-2 mt-3 input-back w-full text-white"
                        />
                          <p  style={{textAlign:'left',color:'red'}}>
                          {!this.state.contractSymbol
                            ? this.state.symbolError
                            : ""}
                        </p>
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
                    rounded
                    loading={this.state.loading}
                    className="w-full"
                  />
                </div>
                {this.state.signatureseriesRespoanse && (
                  <div className="text-center mt-5">
                    <Link href="/instagen">
                      <Button
                        label="Continue"
                        severity="Primary"
                        rounded
                        loading={this.state.loading2}
                        onClick={this.load}
                        className="w-full"
                      />
                    </Link>
                  </div>
                )}
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
