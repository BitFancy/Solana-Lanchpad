import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
function LaunchContarctSidebar(props) {
  console.log("sft id in sidebar", props.router.query.storefrontId);
  return (
    <div
      className="bg-blue-600 text-white p-5"
      style={{ height: "435px", borderRadius: "10px" }}
    >
      <div className="font-bold text-2xl">Create As</div>
      <Link
        href={{
          pathname: "/launchSignatureseries",
          query: { storefrontId: props?.router?.query?.storefrontId}
        }}
        style={{ color: "white" }}
      >
        <div className="flex gap-3 " style={{ marginTop: "65px" }}>
          <div>
            <img src="edition.png" alt="edition"></img>
          </div>
          <div className="edition-note">SignatureSeries</div>
        </div>
      </Link>
      <Link
        href={{
          pathname: "/launchFusionseries",
          query: { storefrontId: props?.router?.query?.storefrontId},
        }}
        style={{ color: "white" }}
      >
        <div className="flex gap-3 mt-3">
          <div>
            <img src="collection.png" alt="FusionSeries"></img>
          </div>
          <div className="edition-note">FusionSeries</div>
        </div>
      </Link>
      <Link
        href={{
          pathname: "/launcheturnulsol",
          query: { storefrontId: props?.router?.query?.storefrontId},
        }}
        style={{ color: "white" }}
      >
        <div className="flex gap-3 mt-3">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
            >
              <path
                d="M10.1562 4.80023C11.0156 4.80023 11.7188 5.50223 11.7188 6.36023C11.7188 7.21823 11.0156 7.92023 10.1562 7.92023C9.29688 7.92023 8.59375 7.21823 8.59375 6.36023C8.59375 5.50223 9.29688 4.80023 10.1562 4.80023ZM10.1562 11.8202C12.2656 11.8202 14.6875 12.8264 14.8438 13.3802V14.1602H5.46875V13.388C5.625 12.8264 8.04688 11.8202 10.1562 11.8202ZM10.1562 3.24023C8.42969 3.24023 7.03125 4.63643 7.03125 6.36023C7.03125 8.08403 8.42969 9.48023 10.1562 9.48023C11.8828 9.48023 13.2812 8.08403 13.2812 6.36023C13.2812 4.63643 11.8828 3.24023 10.1562 3.24023ZM10.1562 10.2602C8.07031 10.2602 3.90625 11.3054 3.90625 13.3802V15.7202H16.4062V13.3802C16.4062 11.3054 12.2422 10.2602 10.1562 10.2602Z"
                fill="white"
                fill-opacity="0.7"
              />
            </svg>
          </div>
          <div className="edition-note">EternalSoul</div>
        </div>
      </Link>
      <Link
        href={{
          pathname: "/launcheteriumpass",
          query: { storefrontId: props?.router?.query?.storefrontId},
        }}
        style={{ color: "white" }}
      >
        <div className="flex gap-3 mt-3">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4.01 6.01001H20.01V8.01001H4.01V6.01001ZM6.01 2.01001H18.01V4.01001H6.01V2.01001ZM20 10H4C3.46957 10 2.96086 10.2107 2.58579 10.5858C2.21071 10.9609 2 11.4696 2 12V20C2 20.5304 2.21071 21.0392 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0392 22 20.5304 22 20V12C22 11.4696 21.7893 10.9609 21.4142 10.5858C21.0391 10.2107 20.5304 10 20 10ZM10.3 20L7 16.76L8.4 15.36L10.3 17.26L15.6 11.96L17 13.36L10.3 20Z"
                fill="white"
                fill-opacity="0.7"
              />
            </svg>
          </div>
          <div className="edition-note">EternumPass</div>
        </div>
      </Link>
      <Link
        href={{
          pathname: "/launchInstagen",
          query: { storefrontId: props?.router?.query?.storefrontId},
        }}
        style={{ color: "white" }}
      >
        <div className="flex gap-3 mt-3">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M0 23V3C0 2.45 0.196 1.979 0.588 1.587C0.98 1.195 1.45067 0.999335 2 1H9C9.55 1 10.021 1.196 10.413 1.588C10.805 1.98 11.0007 2.45067 11 3V23H9V21H2V23H0ZM15.5 23V16.4L17.65 14.35L17.125 11.75C16.475 12.5 15.6873 13.0627 14.762 13.438C13.8367 13.8133 12.916 14.0007 12 14V12C12.8 12 13.575 11.8083 14.325 11.425C15.075 11.0417 15.6917 10.4583 16.175 9.675L16.925 8.45C17.175 8.03334 17.5417 7.75 18.025 7.6C18.5083 7.45 18.9667 7.46667 19.4 7.65L24 9.6V14.5H22V10.925L20.575 10.325L23 23H20.95L19.425 15.85L17.5 17.65V23H15.5ZM2 19H9V3H2V19ZM4 13L7.5 11L4 9V13ZM17 7C16.45 7 15.979 6.804 15.587 6.412C15.195 6.02 14.9993 5.54934 15 5C15 4.45 15.196 3.979 15.588 3.587C15.98 3.195 16.4507 2.99934 17 3C17.55 3 18.021 3.196 18.413 3.588C18.805 3.98 19.0007 4.45067 19 5C19 5.55 18.804 6.021 18.412 6.413C18.02 6.805 17.5493 7.00067 17 7Z"
                fill="white"
                fill-opacity="0.7"
              />
            </svg>
          </div>
          <div className="edition-note">Instagen</div>
        </div>
      </Link>
   
    </div>
  );
}
export default withRouter(LaunchContarctSidebar);
