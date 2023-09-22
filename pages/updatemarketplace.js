import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import axios from "axios";
import { Toast } from "primereact/toast";
import LayoutDashbord from "../Components/LayoutDashbord";
import { LayoutContext, LayoutProvider } from "../layout/context/layoutcontext";
import { withRouter } from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
class UpdateMarketPlace extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    rows: [{}],
   
    submitClicked: false,
    tradhubFees: "",
    contractAddress: "",
    errors: {
      tradhubFeesError: "",
      contractAddressError: "",
    },
  };
}
  handleAddRow = () => {
    const item = {
      fees: "",
      address: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };
  showSuccess() {
    this.toast.show({
      severity: "success",
      summary: "Success",
      detail: "Marketplace Upadated",
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

  handleInputFee = (e) => {
    this.setState({ tradhubFees: e.target.value, tradhubFeesError: "" });
  };
  handleInputAddress = (e) => {
    this.setState({
      ContractAddress: e.target.value,
      contractAddressError: "",
    });
  };

  updateMarketplaceData = () => {
    const token = localStorage.getItem("platform_token");
   const valid= this.onClickButton();
   if(valid){
    axios
    .post(
      `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
      {
        contractName: "SignatureSeries",
        constructorParams: {
          param1: this.state.tradhubFees,
          param2: this.state.contractAddress,
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

  onClickButton = () => {
    if (!this.state.tradhubFees) {
      this.setState({
        tradhubFeesError: "Please Enter Marketplace Fees",
      });
       return false;
    } else if (!this.state.contractAddress) {
      this.setState({
        contractAddressError: "Please Enter Marketplace Contract Address",
      });
      return false;
    } else if (this.state.tradhubFees && this.state.contractAddress) {
      this.setState({submitClicked:true})
      this.setState({loading:true})
      return true;
    }
  };
  static contextType = LayoutContext
  render() {
    return (
      <LayoutDashbord
        title="Update Tradhub"
        description="Used to show updated tradhub information"
      >
        <MarketplaceProfileDetails id={this.props.router.query.storefrontId}/>
        <div  className={`${this.context.layoutConfig.colorScheme === 'light' ? 'buy-back-image-update-tradhub' : 'dark'} flex`} >
          <div>
            <Sidemenu />
            <Toast ref={(el) => (this.toast = el)} />
          </div>
          <div style={{ margin: "0 auto", width: "70%" }}>
            <div className=" p-5 font-bold text-3xl mt-5">Manage Your TradeHub</div>
            {this.state.rows.map((item, idx) => (
              <div  id="addr0" key={idx} className="mt-5 back-color p-5">
                <div >
                  <div >
                    <div className="text-left">Enter new TradeHub fee</div>

                    <InputText
                      value={this.state.rows[idx].tradhubFees}
                      className="p-2 mt-3 input-back w-full text-white"
                      type="number"
                      onChange={this.handleInputFee}
                    />
                    <p style={{ textAlign: "left", color: "red" }}>
                      {!this.state.tradhubFees
                        ? this.state.tradhubFeesError
                        : ""}
                    </p>
                  </div>
                  <div>
                    <div className="mt-5">Enter payout address</div>

                    <InputText
                      value={this.state.rows[idx].contractAddress}
                      className="p-2 mt-3 input-back w-full text-white"
                      type="text"
                      onChange={this.handleInputAddress}
                    />
                    <p style={{ textAlign: "left", color: "red" }}>
                      {!this.state.contractAddress
                        ? this.state.contractAddressError
                        : ""}
                    </p>
                  </div>
                  <div className="mt-5">
                    <Button
                      severity="danger"
                      icon="pi pi-minus"
                      onClick={this.handleRemoveSpecificRow(idx)}
                    ></Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center mt-5">
              <Button
                icon="pi pi-plus"
                label="Add Another Admin"
                severity="info"
                onClick={this.handleAddRow}
                className="buy-img"
              />
            </div>
            <div className="text-center mt-5">
              <Button
                label="Update"
                severity="info"
                onClick={this.updateMarketplaceData}
                className="buy-img"
              />
            </div>
          </div>
        </div>
      </LayoutDashbord>
    );
  }
}

export default withRouter(UpdateMarketPlace);
