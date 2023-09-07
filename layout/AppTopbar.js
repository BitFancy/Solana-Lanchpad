import Link from "next/link";
import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import Image from "next/image";
import AppConfig from "./AppConfig";
import Router from "next/router";
import { useAccount, useDisconnect, useEnsName, useEnsAvatar } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const AppTopbar = forwardRef((props, ref) => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ address });

  const { layoutConfig, layoutState } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  useEffect(() => {
    if (!isConnected) {
      Router.push("/launchpad");
    }
  }, []);

  return (
    <div className="layout-topbar">
      <Link href="/launchpad" className="layout-topbar-logo">
        <Image
          src={`./${
            layoutConfig.colorScheme !== "light" ? "white" : "dark"
          }.svg`}
          width="60"
          height="60"
          widt={"true"}
          alt="logo"
        />
        <img src="./myriadflow.png" style={{ height: "20px" }}></img>
      </Link>
      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        <Link href="/buySubscription">
          <span
            className="text-black"
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Launch
          </span>
        </Link>

        <Link href="/getAllSignatureseries">
          <span
            className="text-black"
            style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
          >
            Dashboard
          </span>
        </Link>

        <div>
          <ConnectButton className="connect-wallet" />
        </div>
        <div>
          <Link href="/profile">
            <img style={{ cursor: "pointer" }} src="/profile.png"></img>
          </Link>
        </div>
        <div>
          <AppConfig />
        </div>
      </div>
    </div>
  );
});

export default AppTopbar;
