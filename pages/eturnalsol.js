import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import  { withRouter } from "next/router";
import axios from "axios";
import { Toast } from "primereact/toast";
import AppTopbar from "../layout/AppTopbar";
import Link from "next/link";
import Layout2 from "../Components/Layout2";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
class Eturnulsol extends React.Component {
constructor(props) {
    super(props);
    this.showError = this.showError.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
  }
  showSuccess() {
    this.toast.show({
      severity: "success",
      summary: "Success",
      detail: "Your Eturnulsol contract has been  successfully deployed",
      life: 10000,
    });
  }
  showError() {
    this.toast.show({
      severity: "error",
      summary: "Error",
      detail: "Error While Deploying EternalSoul Contract",
      life: 10000,
    });
  }
  state = {
    rows: [{}],
    contractName: "",
    contractSymbol: "",
    eturnalsolResponse: "",
    loading: false,
    loading2:false,
    submitClicked: false,
    errors: {
      contractNameEror: "",
      symbolError: "",
    },
  
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
        param3 : "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
        param4 : "0xEFf4209584cc2cE0409a5FA06175002537b055DC"
    },
     network: "maticmum" },
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
    this.setState({ eturnalsolResponse: response.data.contractAddress });


  })
  .catch(() => {
    this.showError();
  }).finally(() => {
    this.setState({loading:false});
  });
}
    
  };


//   useEffect(() => {
//     setTradhubContarctAddress(props.router.query.contractAddress);
//   }, [props.router.query.contractAddress]);

load = () => {
  this.setState({loading2:true})

  setTimeout(() => {
    this.setState({loading2:false})
  }, 2000);
};
handleChange = idx => e => {
  const { name, value } = e.target;
  const rows = [...this.state.rows];
  rows[idx] = {
    [name]: value
  };
  this.setState({
    rows
  });
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

  render() {
    return (
      <Layout2  title="Deploy Eturnalsol"
      description="This is use to show information of the deploy Eturnalsol contract">
    <div
     
      className="buy-back-image"
    >
      <div >
        <div className=" p-5 font-bold text-center" style={{ borderBottom: "2px solid" }}>
          Deploy EternalSoul
        </div>
        <div className="flex justify-content-center gap-5">
          <div className="card buy-img mt-5" style={{ width: "50%" }}>
            <div className="text-center mt-5">
              {this.state.rows.map((item, idx) => (
                  <div id="addr0" key={idx} className="card mt-5">
                    <div className="">
                      <div>
                        <div className="text-left">
                          Enter EternalSoul Name
                        </div>

                        <InputText
                          value={this.state.rows[idx].ontractName}
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
                          Enter EternalSoul Symbol
                        </div>

                        <InputText
                          value={this.state.rows[idx].contractSymbol}
                          onChange={this.handleInputSymbol}
                          name="symbol"
                          className="p-2 mt-3 input-back w-full text-white"
                          type="text"
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
                            className="buy-img"
                          ></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-5">
                  <Button
                    icon="pi pi-plus"
                    label="Add Another EternalSoul"
                    severity="info"
                    onClick={this.handleAddRow}
                    className="buy-img"
                  />
                </div>
            </div>
            <div className="flex justify-content-between mt-5">
            <div className="text-center mt-5">
              <Button
                onClick={this.eturnulsolData}
                label="Deploy EturnalSoul"
                className="buy-img"
                severity="Primary"
                rounded
                loading={this.state.loading}
              />
            </div>
            <div >
              {this.state.eturnalsolResponse &&
                <div className="text-center mt-5">
                <Link href='/fusionSeries'>
              <Button
                label="Continue"
                severity="Primary"
                rounded
                loading={this.state.loading2}
                onClick={this.load}
                className="buy-img"
              />
              </Link>
            </div>
              }

          
            
            </div>
           
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

export default withRouter(Eturnulsol);
