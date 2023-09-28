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
import { toast } from "react-toastify";
function AppTopbar(props) {
  const {  isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { layoutConfig, layoutState } = useContext(LayoutContext);
  const [toggle, setToggle] = useState(false);
  const topbarmenuRef = useRef(null);
  const [plan, setsetPlan] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setsetPlan(
      JSON.parse(localStorage.getItem("profiledetails"))?.plan ?? null
    );
    if (!localStorage.getItem("wagmi.connected")) {
      router.push("/");
    }
  }, []);
  const logout=()=>{
    disconnect,
    localStorage.clear();
    router.push("/");
  }
  const notify = ()=>{
    toast.TYPE.WARNING;
  }
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
        <Link
          onClick={() =>
            isConnected ? null : 'Please Connect to Your wallet'
          }
          href={
            isConnected && !plan ? "/buySubscription" : "/storefrontDashboard"
          }
        >
          <span className="font-bold text-white text-2xl">Launch</span>
        </Link>

        {/* <Link
          onClick={() =>
            isConnected ? null : alert("Please connect to Your wallet")
          }
          href={isConnected ? "/getAllSignatureseriesContract" : ""}
        >
          <span className="font-bold text-white text-2xl">Dashboard</span>
        </Link> */}

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
            }}
          >
            <div style={{ color: "black" }} className="flex gap-2">
              <div>
                <i className="pi pi-pencil"></i>
              </div>
              <Link style={{ color: "black" }} href="/addProfileDetails">
                <div>
                  <div className="font-bold">Create profile</div>
                </div>
              </Link>
            </div>
            <div className="border-bottom-das"></div>

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
