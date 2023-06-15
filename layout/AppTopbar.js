import Link from "next/link";
import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import Image from "next/image";
import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const AppTopbar = forwardRef((props, ref) => {
  const [error, setError] = useState("");
  const address = useAddress();
  const { contract } = useContract(address);
  const user = useSelector(selectUser);
  const walletAddress = user ? user[0] : "";

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
        <span style={{ fontSize: "30px", color: "white" }}>Launchpad</span>
      </Link>
      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        <button type="button" className="p-link ">
          <span
            className="text-black"
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Launch
          </span>
        </button>
        <button type="button" className="p-link ">
          <span
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Dashboard
          </span>
        </button>
       

        <div> 
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
});

export default AppTopbar;
