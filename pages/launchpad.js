import Layout from "@/Components/Layout";
import React from "react";

export default function Lunchpad() {
  return (
    <Layout title="Step one" description="Used to deploy contract">
      <div>
        <div className="text-center font-bold mt-16 text-3xl">
          Experience launching your favorites categories in just few steps
        </div>
        <div className="flex justify-around mt-16">
          <div className="bg-black text-white p-7 text-center">
            <div className="font-bold">Edition</div>

            <div className="mt-5 text-sm">
              {" "}
              Myriadflow helps you to create your
            </div>
            <div className="text-sm">storefront unique, inviting, and</div>
            <div className="text-sm">memorable for customers</div>
            <div className="mt-10">
              <button className="bg-white text-black rounded-full p-3 text-xs font-bold">
                Launch Edition
              </button>
            </div>
          </div>
          <div className="bg-black text-white p-7 text-center">
            <div className="font-bold">Collection</div>
            <div className="mt-5 text-sm">
              Watch your collections and saves{" "}
            </div>
            <div className="text-sm">time buying one of them</div>

            <div className="mt-10">
              <button className="bg-white text-black rounded-full p-3 text-xs font-bold">
                Launch Collection
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-16">
          <div className="bg-black text-white p-7 text-center">
            <div className="font-bold">AIREX</div>

            <div className="mt-5 text-sm"> Dynamic NFTs that provide </div>
            <div className="text-sm">dynamic features, changes</div>
            <div className="text-sm">in a dNFT smart contract </div>
            <div>are based on conditions.</div>
            <div className="mt-10">
              <button className="bg-white text-black rounded-full p-3 text-xs font-bold">
                Launch AIREX
              </button>
            </div>
          </div>
          <div className="bg-black text-white p-7 text-center">
            <div className="font-bold">subscription NFTs</div>
            <div className="mt-5 text-sm">An Opportunity to access</div>
            <div className="text-sm">digital assets and </div>
            <div className="text-sm">ownership to exclusive </div>
            <div className="text-sm">content or services. </div>

            <div className="mt-10">
              <button className="bg-white text-black rounded-full p-3 text-xs font-bold">
                Launch subscription NFTs
              </button>
            </div>
          </div>
          <div className="bg-black text-white p-7 text-center">
            <div className="font-bold">Phygital NFTs</div>
            <div className="mt-5 text-sm">Experience both the</div>
            <div className="text-sm">Phygital and digital worlds </div>
            <div className="text-sm">with myriadflow</div>

            <div className="mt-10">
              <button className="bg-white text-black rounded-full p-3 text-xs font-bold">
                Launch Phygital NFTs
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
