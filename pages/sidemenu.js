import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
export default function Sidemenu() {
  const router = useRouter();
  const [active, setActive] = useState("");
  const handleClick = (event) => {
    setActive(event.target.id);
  };
  return (
    <div className=" p-5 overflow-y-auto ... overflow-dashboard-left">
      <div className="font-bold text-3xl text-white">overview</div>
      <div className="ml-3 mt-3">
        <div className="text-2xl" style={{ marginTop: "30px"}}>
          <Link
            href="/overview"
            className={router.pathname == "/overview" ? "active" : ""}
          >
            Overview
          </Link>
        </div>
      </div>
      <div className="font-bold mt-5 text-3xl text-white">Contracts</div>
      <div className="ml-3">
        <div className="text-2xl" style={{ marginTop: "30px", color: "white" }}>
          <Link
            href="/getAllSignatureseries"
            className={
              router.pathname == "/getAllSignatureseries" ? "active" : ""
            }
          >
            SignatureSeries
          </Link>
        </div>

        <div className="text-2xl" style={{ marginTop: "30px", color: "white" }}>
          <Link
            href="/getAllFusionseries"
            className={router.pathname == "/getAllFusionseries" ? "active" : ""}
          >
            FusionSeries
          </Link>
        </div>

        <div className="text-2xl" style={{ marginTop: "30px", color: "white" }}>
          <Link
            href="/getAllEternumPass"
            className={router.pathname == "/getAllEternumPass" ? "active" : ""}
          >
            EternumPass
          </Link>
        </div>

        <div className="text-2xl" style={{ marginTop: "30px", color: "white" }}>
          <Link
            href="/getAllInstagen"
            className={router.pathname == "/getAllInstagen" ? "active" : ""}
          >
            Instagen
          </Link>
        </div>
      </div>
      <div className="border-bottom-das"></div>
      <div className="font-bold mt-5 text-3xl text-white">Settings</div>
      <div className="ml-3">
        <div className="text-2xl" style={{ marginTop: "30px", color: "white" }}>
          <Link
            href="/accessMasterRole"
            className={router.pathname == "/accessMasterRole" ? "active" : ""}
          >
            AccessMaster
          </Link>
        </div>
        <div className="text-2xl" style={{ marginTop: "30px", color: "white" }}>
          <Link
            href="/updatemarketplace"
            className={router.pathname == "/updatemarketplace" ? "active" : ""}
          >
            TradeHub
          </Link>
        </div>

        <div className="text-2xl" style={{ marginTop: "30px", color: "white" }}>
          <Link
            href="/markeplaceDetailsForm"
            className={router.pathname == "/markeplaceDetailsForm" ? "active" : ""}
          >
             Web App
          </Link>
        </div>
      
      
      </div>
    </div>
  );
}
