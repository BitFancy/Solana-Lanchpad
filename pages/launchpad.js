// import Layout from "@/Components/Layout";
import React from "react";
import { Button } from "primereact/button";
import Link from "next/link";

export default function Lunchpad() {
  return (
    // <Layout title="Step one" description="Used to deploy contract">
      <div>
        <div className="text-center font-bold mt-16 text-3xl">
          Experience launching your favorites categories in just few steps
        </div>
        <div className="flex justify-content-around mt-5 card">
          <div className="bg-black text-black p-7 text-center card" style={{marginBottom:"0px"}}>
            <div className="font-bold">Edition</div>

            <div className="mt-5 text-sm">
              {" "}
              Myriadflow helps you to create your
            </div>
            <div >storefront unique, inviting, and</div>
            <div >memorable for customers</div>
            <div className="mt-5">
             <Link href="/deployflowaccessControl">
              <Button label="Launch Edition"  severity="Primary" rounded />
              </Link>
            </div>
          </div>
          <div className="bg-black text-black p-7 text-center card">
            <div className="font-bold">Collection</div>
            <div className="mt-5 text-sm">
              Watch your collections and saves{" "}
            </div>
            <div >time buying one of them</div>

            <div className="mt-5">
             
              <Button label="Launch Collection" severity="Primary" rounded />

            </div>
          </div>
        </div>
      </div>
  );
}
