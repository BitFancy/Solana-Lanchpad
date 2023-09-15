import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { LayoutContext } from "../layout/context/layoutcontext";
export default function Sidemenu() {
  const router = useRouter();
  const [active, setActive] = useState("");
  const { layoutConfig } = useContext(LayoutContext);

  const handleClick = (event) => {
    setActive(event.target.id);
  };
  return (
    <div className=" p-5 overflow-y-auto ... overflow-dashboard-left">
      <div className="font-bold text-3xl p-heading mt-5">overview</div>
      <div className="ml-5 mt-3 p-heading ">
        <div className="text-2xl"   style={{ marginTop: "30px"}}>
          <Link
            href="/overview"
            className={router.pathname == "/overview" ? "active" : "p-heading"}
            
          >
            Overview
          </Link>
        </div>
      </div>
      <div className="border-bottom-das" style={{paddingBottom:'40px'}}></div>

      <div className="font-bold  text-3xl p-heading" style={{marginTop:'45px'}}>Contracts</div>
      <div className="ml-5">
        <div className="text-2xl p-heading" style={{ marginTop: "30px",  }}>
          <Link
            href="/getAllSignatureseriesContract"
            className={
              router.pathname == "/getAllSignatureseriesContract" ? "active" : "p-heading"
            }
          >
            SignatureSeries
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px"}}>
          <Link
            href="/getAllFusionseriesContract"
            className={router.pathname == "/getAllFusionseriesContract" ? "active" : "p-heading"}
          >
            FusionSeries
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href="/getAllEternumPassContract"
            className={router.pathname == "/getAllEternumPassContract" ? "active" : "p-heading"}
          >
            EternumPass
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href="/getAllInstagenContract"
            className={router.pathname == "/getAllInstagenContract" ? "active" : "p-heading"}
          >
            Instagen
          </Link>
        </div>
        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href="/getAlleturnalsolContract"
            className={router.pathname == "/getAlleturnalsolContract" ? "active" : "p-heading"}
          >
            EternalSoul
          </Link>
        </div>
      </div>
      <div className="border-bottom-das" style={{paddingBottom:'40px'}}></div>
      <div className="font-bold  text-3xl p-heading" style={{marginTop:'45px'}}>Settings</div>
      <div className="ml-5">
        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href="/accessMasterRole"
            className={router.pathname == "/accessMasterRole" ? "active" : "p-heading"}
          >
            AccessMaster
          </Link>
        </div>
        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href="/updatemarketplace"
            className={router.pathname == "/updatemarketplace" ? "active" : "p-heading"}
          >
            TradeHub
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href="/markeplaceDetailsForm"
            className={router.pathname == "/markeplaceDetailsForm" ? "active" : "p-heading"}
          >
             Web App
          </Link>
        </div>
      
      
      </div>
    </div>
  );
}
