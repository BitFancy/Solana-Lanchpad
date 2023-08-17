import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { withRouter } from "next/router";
import axios from "axios";
import AppTopbar from "../layout/AppTopbar";
import { Toast } from "primereact/toast";
import Link from "next/link";
import { id } from "ethers/lib/utils";
import { Field, Form } from "react-final-form";
import { classNames } from "primereact/utils";

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
    signatureseriesRespoanse: "",
    loading: false,
    loading2: false,
    formData: {},
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
        this.setState({
          signatureseriesRespoanse: response.data.contractAddress,
        });
      })

      .catch((error) => {
        console.log("err", error);
        this.showError();
      })
      .finally(() => {
        this.setState({ loading: false });
        this.setState({ loading2: false });
      });
  };

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

  validate = (data) => {
    let errors = {};

    if (!data.contractName) {
      errors.contractName = "Please Fill SignatureSeries Name.";
      this.setState({ loading: false });
    }

    if (!data.contractSymbol) {
      errors.contractSymbol = "Please Fill SignatureSeries Symbol.";
      this.setState({ loading: false });
    }

    return errors;
  };
  onSubmit = (data, form) => {
    this.setState({ formData: data });
  };
  isFormFieldValid = (meta) => {
    !!(meta.touched && meta.error);
  };
  getFormErrorMessage = (meta) => {
    return (
      this.isFormFieldValid(meta) && (
        <small className="p-error">{meta.error}</small>
      )
    );
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
                    <Form
                      onSubmit={this.onSubmit}
                      initialValues={{ contractName: "", contractSymbol: "" }}
                      validate={this.validate}
                      render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                          <div>
                            
                          </div>
                          <Field
                            name="contractName"
                            render={({ input, meta }) => (
                              <div className="field">
                                <div>Enter SignatureSeries Name</div>
                                <div className="mt-3">
                                  <InputText
                                    id="contractName"
                                    onChange={this.handleChange(idx)}
                                    {...input}
                                    autoFocus
                                    className={classNames({
                                      "p-invalid": this.isFormFieldValid(meta),
                                    })}
                                    value={this.state.rows[idx].contractName}
                                  />
                                  <label
                                    htmlFor="contractName"
                                    className={classNames({
                                      "p-error": this.isFormFieldValid(meta),
                                    })}
                                  ></label>
                                </div>
                                {this.getFormErrorMessage(meta)}
                              </div>
                            )}
                          />
                          <Field
                            name="contractSymbol"
                            render={({ input, meta }) => (
                              <div className="field">
                                <div>Enter SignatureSeries Symbol</div>
                                <div className="mt-3">
                                  <InputText
                                    id="contractSymbol"
                                    onChange={this.handleChange(idx)}
                                    {...input}
                                    autoFocus
                                    className={classNames({
                                      "p-invalid": this.isFormFieldValid(meta),
                                    })}
                                    value={this.state.rows[idx].contractSymbol}
                                  />
                                  <label
                                    htmlFor="contractSymbol"
                                    className={classNames({
                                      "p-error": this.isFormFieldValid(meta),
                                    })}
                                  ></label>
                                </div>
                                {this.getFormErrorMessage(meta)}
                              </div>
                            )}
                          />
                          <div className="mt-5">
                            <Button
                              severity="danger"
                              icon="pi pi-minus"
                              onClick={this.handleRemoveSpecificRow(idx)}
                            ></Button>
                          </div>
                          <div className="text-center mt-5">
                  <Button
                    icon="pi pi-plus"
                    label="Add Another SignatureSeries"
                    severity="info"
                    onClick={this.handleAddRow}
                  />
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
                    type="submit"
                  />
                </div>
                {this.state.signatureseriesRespoanse && (
                  <div className="text-center mt-5">
                    <Link href="/fusionSeries">
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

                        </form>
                      )}
                    />
                  </div>
                ))}
               
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
