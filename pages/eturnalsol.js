import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import  { withRouter } from "next/router";
import axios from "axios";
import { Toast } from "primereact/toast";
import Link from "next/link";
import Layout2 from "../Components/Layout2";
import { LayoutContext } from "../layout/context/layoutcontext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { getAccessMasterByStorefrontID, getStorefrontByID } from "../utils/util";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
class Eturnulsol extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      contractName: "",
      contractSymbol: "",
      eturnalsolResponse: "",
      accessmasterAddress:'',
      loading: false,
      visible:false,
      loading2:false,
      loading4:false,
      submitClicked: false,
      errors: {
        contractNameEror: "",
        symbolError: "",
      },
      storefrontData:{}
    
    };
    let copyState = this.state
    delete copyState.storefrontData
    this.initialState = { ...copyState };
  }
  async componentDidMount(){
    const {payload} = await getStorefrontByID("b68284bd-2c23-4f9d-8a4a-85cf816358c7")
    this.setState({storefrontData: payload})
   console.log("Data",payload);
   }

   async componentDidMount(){
   const payload=await getAccessMasterByStorefrontID(this.props.router.query.storefrontId);
   this.setState({accessmasterAddress: payload})
   console.log("Data accessmaster",payload);
   }
 
  
   eturnulsolData = () => {
    const token = localStorage.getItem("platform_token");

   const valid= this.onClickButton();
if(valid){
  axios
  .post(
    `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
    { contractName : "EternalSoul",
  constructorParams:{
        param1 : this.state.contractName,
        param2 : this.state.contractSymbol,
        param3 : "www.xyz.com",
        param4 : this.state.accessmasterAddress
    },
     network: "maticmum",
     storefrontId:this.props?.router?.query?.storefrontId ,
     collectionName:this.state.contractName


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
    this.setState({storefrontId:response.data.storefrontId})
  })
  .catch((error) => {
    console.log(error)
  }).finally(() => {
    this.setState({loading:false});
  });
}
    
  };



    
load = () => {
  this.setState({loading2:true})

  setTimeout(() => {
    this.setState({loading2:false})
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
      contractNameEror: "Please Enter EternalSoul Name"
    });   
     return false;
  } else if (!this.state.contractSymbol) {
    this.setState({
      symbolError: "Please Enter EternalSoul Symbol Description"
    });   
    return false;
  } else if (this.state.contractName && this.state.contractSymbol) {
    this.setState({submitClicked:true})
    this.setState({loading:true})
    return true;
  }
};

static contextType = LayoutContext

  render() {
    return (
      <Layout2  title="Deploy Eturnalsol"
      description="This is use to show information of the deploy Eturnalsol contract">
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
               <span className="blockchain-label">{this.state.storefrontData?.blockchain}</span>

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
                          <div className="text-left text-black">
                            Enter  Name
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
                      </div>
                      <div className="text-center mt-5">
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
                      <div className="font-bold text-left">Choose another contract</div>
                    </div>
                    <div className="flex mt-3 justify-content-between text-center">

                      <div style={{border:'1px solid',padding:'20px 130px 25px 130px',height:'70px',borderRadius:'10px'}}>
                        <i  onClick={this.handleForm} className="pi pi-plus cursor-pointer"></i>
                      </div>
                      <div style={{border:'1px solid',padding:'20px 130px 25px 130px',height:'70px',borderRadius:'10px'}}>
                      <i   onClick={() =>
                            this.navigateTo("/launchSignatureseries")
                          } className="pi pi-plus cursor-pointer"></i>

                      </div>
                    </div>
                      
                    </>
                  )}
                </div>
              </div>
              <Toast ref={(el) => (this.toast = el)} />
            </div>
            <div className="flex justify-content-center mt-5" style={{gap:'445px'}}>
              <div className="text-center mt-5">
                <Link 
                 href={{
                  pathname: "/launchSignatureseries",
                  query: { storefrontId: this.props?.router?.query?.storefrontId},
                }}
                >
                  <Button
                    label="Back"
                    severity="Primary"
                    rounded
                    loading={this.state.loading2}
                    onClick={this.load}
                    className=" buy-img"
                    style={{padding:'10px 60px 10px 60px'}}
                  />
                </Link>
              </div>
              <div className="text-center mt-5">
                <Link 
                 href={{
                  pathname: "/webappForm",
                  query: { storefrontId: this.props?.router?.query?.storefrontId},
                }}
                >
                  <Button
                    label="Next"
                    severity="Primary"
                    rounded
                    loading={this.loading4}
                    onClick={this.load4}
                    className=" buy-img"
                    style={{padding:'10px 60px 10px 60px'}}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
    </Layout2>
);
}
}

export default withRouter(Eturnulsol);
