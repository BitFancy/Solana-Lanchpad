import React, { useContext } from "react";
import { LayoutContext } from "./context/layoutcontext";
import Image from "next/image";
import Link from "next/link";

const AppFooterDashboard = () => {
  let date = new Date();
  let year = date.getFullYear();
  const { layoutConfig } = useContext(LayoutContext);
  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #bcb2b2",
          padding: "20px",
          borderTop: "1px solid #bcb2b2",
        }}
        className={`${
          layoutConfig.colorScheme === "light" ? "buy-back-image-footer" : "dark"
        } layout-footer justify-content-between`}

      >
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
          <div className=" mt-3 font-bold text-3xl cursor-pointer p-heading">
            Myriadflow
          </div>
          <div className="mt-5 text-xl text-left p-heading">
            <div>MyriadFlow is an innovative platform to</div>
            <div>explore & launch NFT Experiences. Dive into</div>
            <div>the next generation of Utility NFTs through </div>
            <div>our Revolutionary App Store Explore.</div>
          </div>
        </div>
        <div className="p-heading">
          <div className="font-bold text-3xl ">Explore</div>
          <div className="mt-3 cursor-pointer text-2xl">Signature Series</div>
          <div className="mt-3 cursor-pointer text-2xl">Fusion Series</div>
          <div className="mt-3 cursor-pointer text-2xl">Instagen</div>
          <div className="mt-3 cursor-pointer text-2xl">Eternum Pass</div>
          <div className="mt-3 cursor-pointer text-2xl">Phygital NFTs</div>
          <div className="mt-3 cursor-pointer text-2xl">Eternnal Soul</div>
          <div className="mt-3 cursor-pointer text-2xl">TradeHub</div>

         
        </div>
        <div className="p-heading">
          <div className="font-bold text-3xl ">Contact Us</div>

          <div className="flex gap-3 items-center mt-5">
            <div className="mt-2">
              <Link href='https://t.me/myriadFlow'>
              <Image
                src={`./${
                  layoutConfig.colorScheme === "light"
                    ? "teliblack"
                    : "teliwhite"
                }.svg`}
                alt="Logo"
                height="50"
                width="50"
                className="mr-2 border-icon"
                style={{padding:'12px'}}
              />
              </Link>
            </div>

            <div className="mt-2">
             
                <Link href='https://twitter.com/0xMyriadFlow'>
              <Image
                src={`./${
                  layoutConfig.colorScheme === "light"
                    ? "twiblack"
                    : "tweewhite"
                }.svg`}
                alt="Logo"
                height="50"
                width="50"
                className="mr-2 border-icon"
                style={{padding:'12'}}
              />
              </Link>
              
            </div>
            <div className="mt-2">
             
                <Link href='https://discord.gg/38jktRtuY7'>
              <Image
                src={`./${
                  layoutConfig.colorScheme === "light"
                    ? "disblack"
                    : "diswhite"
                }.svg`}
                alt="Logo"
                height="50"
                width="50"
                className="mr-2 border-icon"
                style={{padding:'12px'}}
              />
              </Link>
            </div>
          </div>
        </div>
      

      
      </div>
      <div 
      
       className="flex justify-content-center  flex flex-col  py-3 px-3  gradient-blue  p-heading">
        <div className="font-bold text-2xl">
          MyriadFlow | Copyright © {year} Lazarus Network Inc. All Rights
          Reserved.
        </div>
      </div>
    </div>
  );
};

export default AppFooterDashboard;
