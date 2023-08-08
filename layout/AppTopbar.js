import Link from "next/link";
import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import Image from "next/image";
import AppConfig from "./AppConfig";
import Router from "next/router";
import { useAccount,useDisconnect,useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const AppTopbar = forwardRef((props, ref) => {
  const [subscription, setSubscription] = useState();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useEffect(() => {
    if (!isConnected) {
      Router.push("/buySubscription");
    }

  }, []);
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
        <img src='./myriadflow.png' style={{height:'20px'}}></img>
        

      </Link>
      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
{ 
!subscription &&
  <Link href="/addSubscription">
  <span
    className="text-black"
    style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
  >
    Launch
  </span>
</Link>
}
      {
        subscription &&
        <Link href="/fusionSeries">
          <span
            className="text-black"
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Launch
          </span>
        </Link>
      }
        

        <Link href="/subscriptionDashboard">
          <span
            className="text-black"
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Dashboard
          </span>
        </Link>
        {/* <Link href="/accessMasterRole">
          <span
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Manage
          </span>
        </Link> */}
        {/* <Link href="/signatureSeriesAssets">
          <span
            className="text-black"
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Create
          </span>
        </Link> */}
        <div>
          <ConnectButton />
        </div>
        <div>
          <AppConfig />
        </div>
      </div>
    </div>
  );
});

export default AppTopbar;
