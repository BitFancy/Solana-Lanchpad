import Link from "next/link";
import { classNames } from "primereact/utils";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import Image from "next/image";
import AppConfig from "./AppConfig";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter, withRouter } from "next/router";
import axios from "axios";
function AppTopbar() {
  const {  isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { layoutConfig, layoutState } = useContext(LayoutContext);
  const [toggle, setToggle] = useState(false);
  const topbarmenuRef = useRef(null);
  const [getplan, setpaln] = useState('');
  const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

  const router = useRouter();
  useEffect(() => {
    getPlan();
    if (!localStorage.getItem("wagmi.connected")) {
      router.push("/");
    }
  }, []);
  const logout=()=>{
    disconnect,
    localStorage.clear();
    router.push("/");
  }
  const getPlan=async()=>{
    const token = localStorage.getItem("platform_token");
    const { data } = await axios.get(
      `${BASE_URL_LAUNCH}api/v1.0/profile/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setpaln(data.payload.plan);
  };
  
  return (
    <div className="layout-topbar">
      <Link href="/launchpad" className="layout-topbar-logo">
        <Image
          src={`./${
            layoutConfig.colorScheme !== "light" ? "dark" : "Rectangle"
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
        <Link
          onClick={() =>
            isConnected ? null : 'Please Connect to Your wallet'
          }
          href={
            isConnected && !getplan ? "/buySubscription" : "/profile"
          }
        >
          <span className="font-bold text-white text-2xl">Launch</span>
        </Link>

        <Link
          onClick={() =>
            isConnected ? null : alert("Please connect to Your wallet")
          }
          href={isConnected ? "/dashboard" : ""}
        >
          <span className="font-bold text-white text-2xl">Dashboard</span>
        </Link>

        <div>
          <ConnectButton
            className="connect-wallet"
          />
        </div>
        <div onClick={() => setToggle(!toggle)}>
          <img className="cursor-pointer" src="/profile.png"></img>
        </div>

        {toggle && (
          <div
            className="profile-drop bg-white p-3"
            style={{
              borderRadius: "10px",
              marginTop: "200px",
              position: "absolute",
              right: "60px",
              border:'1px solid'
            }}
          >
            {/* <div style={{ color: "black" }} className="flex gap-2">
              <div>
                <i className="pi pi-pencil"></i>
              </div>
              <Link style={{ color: "black" }} href="/addProfileDetails">
                <div>
                  <div className="font-bold">Create profile</div>
                </div>
              </Link>
            </div> */}
            {/* <div className="border-bottom-das"></div> */}

            <div  style={{ color: "black" }} className="flex gap-2 mt-2 ">
              <div>
                <i className="pi pi-eye"></i>
              </div>
              <Link style={{ color: "black" }} href="/profile">
                <div>
                  <div className="font-bold">View profile</div>
                </div>
              </Link>

            </div>
            <div className="border-bottom-das"></div>

            <div onClick={logout} style={{ color: "black" }} className="flex gap-2 mt-2 p-heading">
              <div>
                <i className="pi pi-sign-out"></i>
              </div>
                <div className=" cursor-pointer">
                  <div className="font-bold ">Logout</div>
                </div>
            </div>
          </div>
        )}
        <div>
          <AppConfig />
          {/* <DarkTheme/> */}
        </div>
      </div>
    </div>
  );
}

export default withRouter(AppTopbar);
