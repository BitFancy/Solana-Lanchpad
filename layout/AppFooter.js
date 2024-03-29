import React, { useContext } from "react";
import { LayoutContext } from "./context/layoutcontext";
import Image from "next/image";
import Link from "next/link";

const AppFooter = () => {
  let date = new Date();
  let year = date.getFullYear();
  const { layoutConfig } = useContext(LayoutContext);
  return (
    <div>
      <div
        className="layout-footer mt-5 p-5"
        style={{
          borderBottom: "1px solid #bcb2b2",
          borderTop: "1px solid #bcb2b2",
        }}
      >
        <div>
          <div>
            <Image
              src={`./${
                layoutConfig.colorScheme === "dark" ? "dark" : "Rectangle"
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
        <div className="flex gap-40" style={{ gap: "150px" }}>
          <div className="p-heading">
            <div className="font-bold text-2xl ">Explore</div>
            <div className="mt-3 cursor-pointer">Signature Series</div>
            <div className="mt-3 cursor-pointer">Fusion Series</div>
            <div className="mt-3 cursor-pointer">Instagen</div>
            <div className="mt-3 cursor-pointer">Eternum Pass</div>
            <div className="mt-3 cursor-pointer">Phygital NFTs</div>
            <div className="mt-3 cursor-pointer">Eternnal Soul</div>
            <div className="mt-3 cursor-pointer">TradeHub</div>
          </div>
          <div className="p-heading">
            <div className="font-bold text-2xl ">Contact Us</div>

            <div className="flex gap-3 items-center mt-5">
              <div className="mt-2">
                <Link href="https://t.me/myriadFlow">
                  <Image
                    src={`./${
                      layoutConfig.colorScheme === "light"
                        ? "teliblack"
                        : "teliwhite"
                    }.svg`}
                    alt="Logo"
                    height="30"
                    width="30"
                    className="mr-2 border-icon p-1"
                  />
                </Link>
              </div>

              <div className="mt-2">
                <Link href="https://twitter.com/0xMyriadFlow">
                  <Image
                    src={`./${
                      layoutConfig.colorScheme === "light"
                        ? "twiblack"
                        : "tweewhite"
                    }.svg`}
                    alt="Logo"
                    height="30"
                    width="30"
                    className="mr-2 border-icon p-1"
                  />
                </Link>
              </div>
              <div className="mt-2">
                <Link href="https://discord.gg/38jktRtuY7">
                  <Image
                    src={`./${
                      layoutConfig.colorScheme === "light"
                        ? "disblack"
                        : "diswhite"
                    }.svg`}
                    alt="Logo"
                    height="30"
                    width="30"
                    className="mr-2 border-icon p-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-content-center  flex flex-col  py-3 px-3  gradient-blue  p-heading">
        <div className="font-bold text-2xl">
          MyriadFlow | Copyright © {year} Lazarus Network Inc. All Rights
          Reserved.
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
