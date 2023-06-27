import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Layout from "../Components/Layout";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_LAUNCH;
export default function Deployflowmarket() {
  const [visible, setVisible] = useState(false);
  const flowAccessControllData=async()=>{
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
       tokenData = await axios.post(`${BASE_URL_LAUNCH}/FlowAccessControl`,config,  { contractName:"FlowAccessControl"})
       setsupabaseToken(tokenData)
       console.log("FlowAccessControl  data",tokenData)  
     } catch (e) {
       console.log(e);
     }
     
   
   }
  return (
    <Layout
    title="Deploy Flow Access Control Contract"
    description="This is use to show information of the flow access control contract"
  >
    <div>
      <div className="text-center">
        <Button
          label="Deploy Flow Access Control"
          icon="pi pi-external-link"
          onClick={flowAccessControllData}
          style={{ marginTop: "115px" }}
        />
      </div>
      <Dialog
        visible={visible}
        style={{ width: "50vw", textAlign: "center" }}
        onHide={() => setVisible(false)}
      >
        <div className="m-0 bg-blue-600 text-white p-5 text-lg success-msg">
          <div>Well done !</div>
          <div>you are now the admin, Flow access control</div>
          <div>has been successfully deployed</div>
        </div>
      </Dialog>
    </div>
    </Layout>
  );
}
