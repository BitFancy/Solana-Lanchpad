import Link from "next/link";
import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AppConfig from "./AppConfig";

const AppTopbar = forwardRef((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);


  
  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    
    <div className="layout-topbar">
      <Link href="/dashboardl" className="layout-topbar-logo">
        <Image
          src={`./${
            layoutConfig.colorScheme !== "light" ? "white" : "dark"
          }.svg`}
          width="60"
          height="60" 
          widt={"true"}
          alt="logo"
        />
        <span style={{ fontSize: "30px", color: "white" }}>Myriadflow</span>
      </Link>
      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        <Link href='/launchpad'>
      
          <span
            className="text-black"
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Launch 
          </span>
        </Link>
          <Link href="/dashboardl">
          <span
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Dashboard
          </span>
          </Link>
        <div>
          <ConnectButton/>
        </div>
        <div >
          <AppConfig/>
        </div>
      </div>
    </div>
  );
});

export default AppTopbar;
