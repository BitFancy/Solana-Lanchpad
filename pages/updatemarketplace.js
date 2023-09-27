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
import { Dialog } from "primereact/dialog";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
class UpdateMarketPlace extends React.Component {
  constructor(props) {
    super(props);
  this.state = {   
    submitClicked: false,
    tradhubFees: "",
    contractAddress: "",
    visible:false,
    errors: {
      tradhubFeesError: "",
      contractAddressError: "",
    },
  };
}
 
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
 
 

  handleInputFee = (e) => {
    this.setState({ tradhubFees: e.target.value, tradhubFeesError: "" });
  };
  handleInputAddress = (e) => {
    this.setState({
      contractAddress: e.target.value,
      contractAddressError: "",
    });
  };

  updateMarketplaceData = () => {
    const token = localStorage.getItem("platform_token");
   const valid= this.onClickButton();
  //  if(valid){
  //   axios
  //   .post(
  //     `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
  //     {
  //       contractName: "SignatureSeries",
  //       constructorParams: {
  //         param1: this.state.tradhubFees,
  //         param2: this.state.contractAddress,
  //         param3: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
  //         param4: "0xEFf4209584cc2cE0409a5FA06175002537b055DC",
  //       },
  //       network: "maticmum",
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   )
  //   .then(async (response) => {
  //     this.showSuccess();

  //     setTimeout(() => {
  //       this.setState({ loading: false });
  //     }, 2000);
  //     this.setState({
  //       signatureseriesRespoanse: response.data.contractAddress,
  //     });
  //   })

  //   .catch(() => {
  //     this.showError();
  //   })
  //   .finally(() => {
  //     this.setState({ loading: false });
  //   });
  //  }
  this.setState({ visible: true });

   
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
            <Dialog
          visible={this.state.visible}
          style={{ width: "25vw", height: "15vw" }}
          onHide={() => this.setState({ visible: false })}
        >
          <div className="text-center">
            <div className="mt-3 text-xl">Your Tradehub is successfully updated</div>
          </div>
        </Dialog>
              <div   key={1} className="mt-5 back-color p-5">
                <div >
                  <div >
                    <div className="text-left p-heading">Enter new TradeHub fee</div>

                    <InputText
                      value={this.state.tradhubFees}
                      className="p-2 mt-3 input-back w-full"
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
                      value={this.state.contractAddress}
                      className="p-2 mt-3 input-back w-full"
                      type="text"
                      onChange={this.handleInputAddress}
                    />
                    <p style={{ textAlign: "left", color: "red" }}>
                      {!this.state.contractAddress
                        ? this.state.contractAddressError
                        : ""}
                    </p>
                  </div>
                 
                </div>
              </div>
          
           
            <div className="text-center"style={{marginTop:'80px'}}>
              <Button
                label="Update"
               rounded
                onClick={this.updateMarketplaceData}
                className="buy-img"
                style={{width:'20%'}}
              />
            </div>
          </div>
        </div>
      </LayoutDashbord>
    );
  }
}

export default withRouter(UpdateMarketPlace);
