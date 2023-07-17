import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from "react";
import accessMasterAbi from "../artifacts/contracts/accessmaster/AccessMaster.sol/AccessMaster.json";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import Layout from "../Components/Layout";

export default function LunchManage() {
  const walletAddr = useSelector(selectUser);
  var wallet = walletAddr ? walletAddr[0] : "";   
  const [grantRole, setGrantRole] = useState(true);
  const [revokeRole, setRevokeRole] = useState(true);
  const [active, setActive] = useState("");

  const handleClick = (event) => {
    setActive(event.target.id);

  };
  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const token = localStorage.getItem("platform_token");
  //     if (token) {
  //     }
  //     const flowAccessControlContract = await etherContract(
  //           process.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
  //           accessMasterAbi.abi
  //     );
  //     setGrantRole(
  //       await flowAccessControlContract.grantRole(
  //         await flowAccessControlContract.FLOW_ADMIN_ROLE(),
  //         wallet
  //       )
  //     );
  //   };
  //   asyncFn();
  // }, [grantRole]);

  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const token = localStorage.getItem("platform_token");
  //     if (token) {
  //     }
  //     const flowAccessControlContract = await etherContract(
  //           process.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
  //           accessMasterAbi.abi
  //     );
  //     setRevokeRole(
  //       await flowAccessControlContract.revokeRole(
  //         await flowAccessControlContract.FLOW_ADMIN_ROLE(),
  //         wallet
  //       )
  //     );
  //   };
  //   asyncFn();
  // }, [revokeRole]);

  return (  
    <Layout
    title="Launch Manage Page"
    description="This is use to show information of the launch manage page"
  >
    <div>
      <div>
        <div className="font-bold mt-10 manage-colloection-back">Manage your FusionSeries</div>
        <div className="flex gap-right mt-5">
        <div className=" overflow-y-auto ... overflow-dashboard-left" style={{padding:'55px'}}>
        <div className="font-bold">overview</div>
              <div className="ml-3 mt-3">
                <div
                  key={1}
                  className={active === "1" ? "active" : undefined}
                  id={"1"}
                  onClick={handleClick}
                >
                  Analytics
                </div>
                <div
                  key={1}
                  className={active === "2" ? "active" : undefined}
                  id={"2"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Subscription
                </div>
              </div>

              <div className="font-bold mt-5">Contracts</div>
              <div className="ml-3">
                <div
                  key={3}
                  className={active === "3" ? "active" : undefined}
                  id={"3"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  SignatureSeries
                </div>
                <div
                  key={4}
                  className={active === "4" ? "active" : undefined}
                  id={"4"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  FusionSeries
                </div>
                <div
                  key={5}
                  className={active === "5" ? "active" : undefined}
                  id={"5"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  DynamicRealms
                </div>
                <div
                  key={6}
                  className={active === "6" ? "active" : undefined}
                  id={"6"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  EternumPass
                </div>
                <div
                  key={7}
                  className={active === "7" ? "active" : undefined}
                  id={"7"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Instagen
                </div>
              </div>
              <div className="border-bottom-das"></div>
              <div className="font-bold mt-5">Settings</div>
              <div className="ml-3">
                <div
                  key={8}
                  className={active === "8" ? "active" : undefined}
                  id={"8"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Roles
                </div>
                <div
                  key={9}
                  className={active === "9" ? "active" : undefined}
                  id={"9"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  TradeHub
                </div>
                <div
                  key={10}
                  className={active === "10" ? "active" : undefined}
                  id={"10"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Gateway
                </div>
                <div
                  key={11}
                  className={active === "11" ? "active" : undefined}
                  id={"11"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Frontend
                </div>
                <div
                  key={12}
                  className={active === "12" ? "active" : undefined}
                  id={"12"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Metaverse
                </div>
                </div>
        </div>
        <div style={{width:"100%"}}>
          <div className=" p-5 card card-role">
            <div> 1 . Grantrole</div>
            <div className="mt-3">Role</div>
            <span className="mt-2">
                <InputText id="role"  placeholder="role" type="text"style={{width:"100%"}}/>
            </span>
            <div className="mt-5">Account (address)</div>
            <div className="mt-2">
                <InputText  type="text" placeholder="Account (address)" style={{width:"100%"}}/>
            </div>
            <div className="mt-5 text-center">
                <Button  label="Assign" severity="Primary" rounded />
            </div>
          </div>
          <div className=" p-5 card card-role" >
            <div> 2. Revokrole</div>
            <div className="mt-3">Role</div>
            <div className="mt-2">
                <InputText  placeholder="role" type="text"style={{width:"100%"}}/>
            </div>
            <div className="mt-5">Account (address)</div>
            <div className="mt-2">
                <InputText  type="text" placeholder="Account (address)"style={{width:"100%"}}/>
            </div>
            <div className="mt-5 text-center">
                <Button label="Revoke/remove" severity="Primary" rounded />

            </div>
          </div>
          </div>
          
        </div>
        <div className="mt-5 text-center">
                <Button label="Deploy  another FusionSeries" severity="Primary" rounded />

            </div>
          
      </div>
      </div>
      </Layout>
  )
}
