import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Layout from "../Components/Layout";
import axios from "axios";
import Router from "next/router";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
export default function Deployflowmarket() {
  const [visible, setVisible] = useState(false);
  const [supabaseToken, setsupabaseToken] = useState();
  const flowAccessControllData = async () => {
    const token = localStorage.getItem("authToken");
    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
        {
          contractName: "AccessMaster",
          constructorParams: {},
          network: "hardhat",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        setsupabaseToken(response.data.contractAddress);
        setVisible(true);
        Router.push("/step1");
      })

      .catch((error) => {
        console.log("err", error);
      });
  };
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
          style={{ width: "18vw", textAlign: "center" }}
          onHide={() => setVisible(false)}
        >
          <div className="m-0 bg-blue-600 text-white p-5 text-lg success-msg">
            <div>Well Done !</div>
            <div>You Are Now The Admin, Flow Access Control</div>
            <div>Has Been Successfully Deployed</div>
          </div>
        </Dialog>
      </div>
    </Layout>
  );
}
