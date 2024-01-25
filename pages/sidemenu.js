import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import React from "react";
function Sidemenu(props) {
  const router = useRouter();
  console.log("props in over", props);
  return (
    <div className=" p-5 overflow-y-auto ... overflow-dashboard-left">
      <div className="font-bold text-3xl p-heading mt-5">Analytics</div>
      <div className="ml-5 mt-3 p-heading ">
        <div className="text-2xl" style={{ marginTop: "30px" }}>
          <Link
            href={{
              pathname: "/overview",
              query: { storefrontId: props.router.query.storefrontId },
            }}
            className={router.pathname == "/overview" ? "active" : "p-heading"}
          >
            Analytics
          </Link>
        </div>
      </div>
      <div
        className="border-bottom-das"
        style={{ paddingBottom: "40px" }}
      ></div>

      <div
        className="font-bold  text-3xl p-heading"
        style={{ marginTop: "45px" }}
      >
        Contracts
      </div>
      <div className="ml-5">
        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href={{
              pathname: "/contracts/eternal-soul-collections",
              query: {
                storefrontId: props.router.query.storefrontId,
                // redirectURL: props.router.query.redirectURL,
              },
            }}
            className={
              router.pathname == "/contracts/eternal-soul-collections"
                ? "active"
                : "p-heading"
            }
          >
            EternalSoul
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href={{
              pathname: "/contracts/phygital-nft-collections",
              query: {
                storefrontId: props.router.query.storefrontId,
                // redirectURL: props.router.query.redirectURL,
              },
            }}
            className={
              router.pathname == "/contracts/phygital-nft-collections"
                ? "active"
                : "p-heading"
            }
          >
            Phygital NFTs
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            className={
              router.pathname == "/getAllSignatureseriesContract"
                ? "active"
                : "p-heading"
            }
            href={{
              pathname: "/getAllSignatureseriesContract",
              query: {
                storefrontId: props.router.query.storefrontId,
                redirectURL: props.router.query.redirectURL,
              },
            }}
          >
            SignatureSeries
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href={{
              pathname: "/getAllFusionseriesContract",
              query: {
                storefrontId: props.router.query.storefrontId,
                redirectURL: props.router.query.redirectURL,
              },
            }}
            className={
              router.pathname == "/getAllFusionseriesContract"
                ? "active"
                : "p-heading"
            }
          >
            FusionSeries
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href={{
              pathname: "/getAllEternumPassContract",
              query: { storefrontId: props.router.query.storefrontId },
            }}
            className={
              router.pathname == "/getAllEternumPassContract"
                ? "active"
                : "p-heading"
            }
          >
            EternumPass
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href={{
              pathname: "/getAllInstagenContract",
              query: { storefrontId: props.router.query.storefrontId },
            }}
            className={
              router.pathname == "/getAllInstagenContract"
                ? "active"
                : "p-heading"
            }
          >
            Instagen
          </Link>
        </div>
      </div>
      <div
        className="border-bottom-das"
        style={{ paddingBottom: "40px" }}
      ></div>
      <div
        className="font-bold  text-3xl p-heading"
        style={{ marginTop: "45px" }}
      >
        Settings
      </div>
      <div className="ml-5">
        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href={{
              pathname: "/accessMasterRole",
              query: { storefrontId: props.router.query.storefrontId },
            }}
            className={
              router.pathname == "/accessMasterRole" ? "active" : "p-heading"
            }
          >
            AccessMaster
          </Link>
        </div>
        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href={{
              pathname: "/updatemarketplace",
              query: { storefrontId: props.router.query.storefrontId },
            }}
            className={
              router.pathname == "/updatemarketplace" ? "active" : "p-heading"
            }
          >
            TradeHub
          </Link>
        </div>

        <div className="text-2xl p-heading" style={{ marginTop: "30px" }}>
          <Link
            href={{
              pathname: "/markeplaceDetailsForm",
              query: { storefrontId: props.router.query.storefrontId },
            }}
            className={
              router.pathname == "/markeplaceDetailsForm"
                ? "active"
                : "p-heading"
            }
          >
            Web App
          </Link>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Sidemenu);
