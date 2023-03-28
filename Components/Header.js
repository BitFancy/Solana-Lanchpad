import React from 'react'
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

import Image from "next/image";
import { ConnectWallet } from '@thirdweb-dev/react';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen((prev) => !prev);
  };
  return (
    <div>
        
        <div className="flex items-center justify-between bg-current">
          <div className='flex items-center'>
          <FaBars
            onClick={handleNav}
            className="lg:hidden cursor-pointer text-2xl text-gray-500 dark:text-white"
          />
          <Link href="/">
            <div className="pt-2 transition-all cursor-pointer">
              <span className="dark:block hidden">
                <Image alt="dark" src="/dark.svg" width="60" height="60" />
              </span>
              <span className="dark:hidden ">
                <Image alt="light" src="/light.svg" width="60" height="60" />
              </span>
            </div>
          </Link>
          <Link href="/">
            <div className="text-3xl text-white lg:block md:block font-semibold cursor-pointer pl-4 transition-all tracking-wide text-gray-500 dark:text-white">
              MarketPlace
            </div>
          </Link>
          </div>
          <div >
                      <ConnectWallet className="bg-gradient-to-r from-indigo-500 via-purple-500 to-gray-500 ..." />
                    </div>
        </div>
    </div>
  )
}
