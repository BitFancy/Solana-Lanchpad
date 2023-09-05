import React, { useContext } from "react";
import { LayoutContext } from "./context/layoutcontext";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

const AppFooter = () => {
  let date = new Date();
  let year = date.getFullYear();
  const { layoutConfig } = useContext(LayoutContext);
  return (
    <div>
      <div className="layout-footer mt-5" style={{borderBottom:'1px solid', padding:'20px',borderTop:'1px solid'}}>
        <div>
          <div>
            <Image
              src={`./${
                layoutConfig.colorScheme === "light" ? "dark" : "white"
              }.svg`}
              alt="Logo"
              height="60"
              width="60"
              className="mr-2"
            />
          </div>
          <div className=" mt-3 font-bold text-3xl cursor-pointer">
            Myriadflow
          </div>
          <div className="mt-5 text-xl text-left text-black">
            <div>MyriadFlow is an innovative platform to</div>
            <div>explore & launch NFT Experiences. Dive into</div>
            <div>the next generation of Utility NFTs through </div>
            <div>our Revolutionary App Store Explore.</div>
          </div>
        </div>
        <div>
          <div className="font-bold text-2xl ">
            Explore
          </div>
          <div>
            <div className="mt-5 text-sm"></div>
            All
          </div>  
          <div>
            <div className="mt-2 text-sm"></div>
            Image
          </div>
          <div>
            <div className="mt-2 text-sm"></div>
            Music
          </div>
        
          <div>
            <div className="mt-2 text-sm"></div>
            Video
          </div>
          <div>
            <div className="mt-2 text-sm"></div>
            Document
          </div>

        
        </div>

        <div>
          <div className="font-bold text-2xl ">Dashboard</div>
          <div className="mt-5">Created</div>
          <div className="mt-2">Sold</div>
          <div className="mt-2">bought</div>
          <div className="mt-2">market</div>
        </div>

        <div>
          <div className="font-bold text-2xl ">My profile</div>
          <div className="mt-5">create</div>
          <div className="mt-2">wishlist</div>
          <div className="mt-2">cart</div>
        </div>
        <div>
          <div className="font-bold text-2xl ">Company</div>
          <div className="mt-5">About</div>
        </div>
        <div>
          <div className="font-bold text-2xl ">
            Contact Us
          </div>

          <div className="flex gap-3 items-center mt-5">
            <div className="mt-2">
              <SocialIcon
                url="https://t.me/myriadFlow"
                style={{ width: "25px", height: "25px" ,border:"1px solid"}}
                network="telegram"
              />

              
            </div>

            <div className="mt-2">
              <SocialIcon
                url="https://twitter.com/0xMyriadFlow"
                style={{ width: "25px", height: "25px",border:"1px solid" }}
                network="twitter"
              />
            </div>
            <div className="mt-2">
              <SocialIcon
                url="https://discord.gg/38jktRtuY7"
                style={{ width: "25px", height: "25px",border:"1px solid" }}
                network="discord"
              />

            </div>
          </div>
        </div>

       
      </div>
      <div className="flex justify-content-center  flex flex-col  py-3 px-3  gradient-blue  " >
        <div className="font-bold text-2xl">
          MyriadFlow | Copyright © {year} Lazarus Network Inc. All Rights
          Reserved.
        </div>
      </div>
    
    </div>
  );
};

export default AppFooter;
