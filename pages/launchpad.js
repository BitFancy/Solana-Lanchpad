// import Layout from "@/Components/Layout";
import React from "react";
import { Button } from "primereact/button";

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
             
              <Button label="Launch Edition" severity="Primary" rounded />

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

        <div className="flex justify-content-around mt-16 card">
          
          <div className="bg-black text-black p-7 text-center card" style={{marginBottom:"0px"}}>
            <div className="font-bold">AIREX</div>

            <div className="mt-5"> Dynamic NFTs that provide </div>
            <div >dynamic features, changes</div>
            <div >in a dNFT smart contract </div>
            <div>are based on conditions.</div>
            <div className="mt-5">
              <Button label="Launch AIREX" severity="Primary"  rounded/>

            </div>
          </div>
          <div className="bg-black text-black p-7 text-center card" style={{marginBottom:"0px"}}>
            <div className="font-bold">subscription NFTs</div>
            <div className="mt-5 text-sm">An Opportunity to access</div>
            <div >digital assets and </div>
            <div >ownership to exclusive </div>
            <div >content or services. </div>

            <div className="mt-5">
            
              <Button label="Launch subscription NFTs" severity="Primary" rounded/>

            </div>
          </div>
          <div className="bg-black text-black p-7 text-center card">
            <div className="font-bold">Phygital NFTs</div>
            <div className="mt-5">Experience both the</div>
            <div >Phygital and digital worlds </div>
            <div >with myriadflow</div>

            <div className="mt-5">
              
              <Button label="Launch Phygital NFTs" severity="Primary" rounded/>

            </div>
          </div>
        </div>
      </div>
    // {/* </Layout> */}
  );
}
