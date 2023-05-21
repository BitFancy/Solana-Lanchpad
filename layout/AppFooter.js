import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import Link from 'next/link';
import Image from 'next/image';
import { NavLink } from 'reactstrap';
import { useRouter } from "next/router";
import { SocialIcon } from "react-social-icons";

const AppFooter = () => {
    let date = new Date();
  let year = date.getFullYear();
  const router = useRouter();

    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <Image src={`./${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Logo" height="30" width="30" className="mr-2" />
            <div className="body-back">
      <div className="bg-white dark:bg-gray-900 border-t border-solid mt-10">
        <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-center  text-gray-500 dark:text-white"></div>
      </div>

      <div className=" dark:bg-gray-900 p-6 mt-10">
        <div
          className="flex text-center "
          style={{ padding: "10px 24px 10px 40px" }}
        >
          <div>
            <div className="flex">
              
              <div className="font-bold text-1xl text-left cursor-pointer mt-5 ml-3 text-gray-500 dark:text-white">
                Myriadflow
              </div>
            </div>

            <div className="mt-3 text-sm text-left text-gray-500 dark:text-white">
              MyriadFlow is an innovative platform to explore & launch NFT
              Experiences. Dive into the next generation of Utility NFTs through
              our Revolutionary App Store Explore.
            </div>
          </div>

          <div className="flex gap-5 cursor-pointer">
            <div>
              <div className="font-bold text-1xl text-gray-500 dark:text-white">
                Explore
              </div>
              <div className="mt-3 text-sm"></div>
              <Link className="text-gray-500 dark:text-white" href="/explore">
                <NavLink
                  className={router.pathname == "/explore" ? "active " : ""}
                >
                  All
                </NavLink>
              </Link>
            </div>

            <div>
              <div className="font-bold text-1xl text-gray-500 dark:text-white">
                {" "}
                Profile
              </div>

              <div className="text-sm mt-3">
                <Link className="text-gray-500 dark:text-white" href="/profile">
                  <NavLink
                    className={router.pathname == "/profile" ? "active " : ""}
                  >
                    Create
                  </NavLink>
                </Link>
              </div>
              <div className="text-sm mt-3">
                <Link
                  className="text-gray-500 dark:text-white"
                  href="/wishlist"
                >
                  <NavLink
                    className={router.pathname == "/wishlist" ? "active " : ""}
                  >
                    Wishlist
                  </NavLink>
                </Link>
              </div>
            </div>
            <div>
              <div className="font-bold text-1xl text-gray-500 dark:text-white">
                Company
              </div>
              <div className="mt-3 text-sm">
                <Link className="text-gray-500 dark:text-white" href="/about">
                  <NavLink
                    className={router.pathname == "/about" ? "active " : ""}
                  >
                    About
                  </NavLink>
                </Link>
              </div>
            </div>
            <div>
              <div className="font-bold text-1xl text-gray-500 dark:text-white">
                Contact Us
              </div>

              <div className="flex gap-3 items-center mt-5">
                  <div><SocialIcon url="https://t.me/MyriadFlow" style={{width:"25px",height:"25px"}} network="telegram" /></div>
                <div><SocialIcon url="https://twitter.com/0xMyriadFlow" style={{width:"25px",height:"25px"}} network="twitter" /></div>
                <div><SocialIcon url="https://discord.gg/38jktRtuY7" style={{width:"25px",height:"25px"}} network="discord" /></div>

              </div>
            </div>
          </div>
        </div>

        <div className="m-auto  text-sm flex flex-col  py-2 px-1  text-center gradient-blue mt-10 border-y-2">
          <div className="font-bold text-gray-500 dark:text-white">
            MyriadFlow | Copyright © {year} Lazarus Network Inc. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default AppFooter;
