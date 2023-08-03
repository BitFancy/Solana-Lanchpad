import Link from "next/link";
import React, { useState } from "react";
export default function Sidemenu() {
  const [active, setActive] = useState("");
  const handleClick = (event) => {
    setActive(event.target.id);
  };
  return (
    <div className=" p-5 overflow-y-auto ... overflow-dashboard-left">
      <div className="font-bold">overview</div>
      <div className="ml-3 mt-3">
        <Link href='/overview'>
        <div
          key={1}
          className={active === "1" ? "active" : undefined}
          id={"1"}
          onClick={handleClick}
          style={{color:'white'}}
        >
          Overview
        </div>
        </Link>
      </div>
      <div className="font-bold mt-5">Contracts</div>
      <div className="ml-3">
        <Link href='/getAllSignatureseries'>
        <div
          key={3}
          className={active === "3" ? "active" : undefined}
          id={"3"}
          onClick={handleClick}
          style={{ marginTop: "20px" ,color:'white'}}
        >
          SignatureSeries
        </div>
        </Link>
        <Link href='/getAllFusionseries'>
        <div
          key={4}
          className={active === "4" ? "active" : undefined}
          id={"4"}
          onClick={handleClick}
          style={{ marginTop: "20px",color:'white' }}
        >
          FusionSeries
        </div>
        </Link>
        <Link href='/getAllEternumPass'>
        <div
          key={6}
          className={active === "6" ? "active" : undefined}
          id={"6"}
          onClick={handleClick}
          style={{ marginTop: "20px",color:'white' }}
        >
          EternumPass
        </div>
        </Link>
        <Link href='/getAllInstagen'>
        <div
          key={7}
          className={active === "7" ? "active" : undefined}
          id={"7"}
          onClick={handleClick}
          style={{ marginTop: "20px",color:'white' }}
        >
          Instagen
        </div>
        </Link>
       
      </div>
      <div className="border-bottom-das"></div>
      <div className="font-bold mt-5">Settings</div>
      <div className="ml-3">
        <Link href='/accessMasterRole'>
        <div
          key={8}
          className={active === "8" ? "active" : undefined}
          id={"8"}
          onClick={handleClick}
          style={{ marginTop: "20px",color:'white' }}
        >
          AccessMaster
        </div>
        </Link>

        <div
          key={11}
          className={active === "11" ? "active" : undefined}
          id={"11"}
          onClick={handleClick}
          style={{ marginTop: "20px",color:'white' }}
        >
          Frontend
        </div>
        <div
          key={12}
          className={active === "12" ? "active" : undefined}
          id={"12"}
          onClick={handleClick}
          style={{ marginTop: "20px",color:'white' }}
        >
          Metaverse
        </div>
      </div>
    </div>
  );
}
