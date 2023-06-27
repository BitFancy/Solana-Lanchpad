import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useEffect } from "react";
import { Messages } from "primereact/messages";
import { withRouter } from "next/router";
import Router from "next/router";
import Layout from "../Components/Layout";
const Step1 = (props) => {
  const msgs = useRef(null);
  const [flowContarctA, setFlowContarctA] = useState("");
  const [_platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [supabaseToken, setsupabaseToken] = useState();
 
    const tradHubContarctData=async(props)=>{
      const token= localStorage.getItem('authToken')
       localStorage.getItem('')
       const config = {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
       }
         let tokenData;
       try {
         tokenData = await axios.post(`${BASE_URL_LAUNCH}/FlowAccessControl`,config,  { contractName:"TradeHub"})
         setsupabaseToken(tokenData)
         console.log("tradHubContarctData  data",tokenData)  
         msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail: "Your Tradhub contract has been  successfully deployed",
            closable: true,
          },
        ]);
        setTimeout(() => {
          Router.push({
            pathname: "/step2",
            query: {
              contractAddress: receipt.contractAddress,
              contractAddressFlowAccess: flowContarctA,
            },
          });
        }, 2000);
       } catch (e) {
         console.log(e);
       }
       
     
     }
    useEffect(() => {
      setFlowContarctA(props.router.query.contractAddressFlowAccess);
    }, [props.router.query.contractAddressFlowAccess]);
  
    const handleInputFee = (e) => {
      if (e.target.value <= 100) {
        setPlatformfee(e.target.value);
      }
    };
    const handleInputName = (e) => {
      setContractName(e.target.value);
    };
  
    console.log(
      "props.router.query.contractAddressFlowAccess",
      props.router.query.contractAddressFlowAccess
    );
  return (
    <Layout title="Step 1" description="Step one of the launchpad">

    <div style={{ marginTop: "60px" }}>
      <div className="font-bold p-3 mb-5" style={{ borderBottom: "2px solid" }}>
        Step 1 : Setup  TradeHub
      </div>
      <div className="card">
        <div className="flex justify-content-between gap-5">
          <div style={{ width: "50%" }}>
            <div>Enter TradeHub Name</div>

            <InputText
              type="text"
              name="contractName"
              value={contractName}
              onChange={handleInputName}
              id="contractName"
              className="p-2 w-full mt-3 input-back"
              placeholder="Enter TradeHub Name"
            />
          </div>
          <div style={{ width: "50%" }}>
            <div>Enter TradeHub fee</div>
            <InputText
              type="number"
              name="_platformFee"
              value={_platformFee}
              onChange={handleInputFee}
              className="p-2 w-full mt-3 input-back "
              placeholder="Enter TradeHub fee"
            />
          </div>
        </div>

        <div className="text-center">
          <Button
            label="deploy Tradhub Contract"
            onClick={tradHubContarctData}
            severity="Primary"
            className=" mt-7"
            style={{ width: "30%" }}
            rounded
          />
        </div>
        {msgs && <Messages className="success-msg" ref={msgs} />}
      </div>
    </div>
    </Layout>
  );
  }
export default withRouter(Step1);
