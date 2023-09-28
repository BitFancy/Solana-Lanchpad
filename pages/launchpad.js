import React, { useState } from "react";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";
export default function Launchpad() {
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [loading8, setLoading8] = useState(false);

  const load3 = () => {
    setLoading3(true);

    setTimeout(() => {
      setLoading3(false);
    }, 2000);
  };
  const load4 = () => {
    setLoading4(true);

    setTimeout(() => {
      setLoading4(false);
    }, 2000);
  };
  const load5 = () => {
    setLoading5(true);

    setTimeout(() => {
      setLoading5(false);
    }, 2000);
  };
 
  const load7 = () => {
    setLoading7(true);

    setTimeout(() => {
      setLoading7(false);
    }, 2000);
  };
  const load8 = () => {
    setLoading8(true);

    setTimeout(() => {
      setLoading8(false);
    }, 2000);
  };
  return (
    <div className="launchpad wrapper">
      <Layout
        title="Launchpad Main Page"
        description="Used to show launchpad information"
      >
        <div>
          <div className="launchpad-back">
            <div
              className="text-center font-bold mt-16 text-white "
              style={{ top: "300px", position: "relative", fontSize: "50px" }}
            >
              <div> Launching Your Favorite</div>
              <div>NFTs in just few steps</div>
            </div>
          </div>
        

        </div>
      
        <div
          className="flex "
          style={{ marginTop: "150px", padding: "70px", gap: "50px" }}
        >
          <div style={{ width: "50%" }}>
            <div className="signature-series-head p-heading">
              Signature Series
            </div>
            <div className="mt-5 text-3xl p-heading">
              <div> Delve into Signature Series, an exclusive </div>
              <div>assortment of ERC-721 NFTs, showcasing </div>
              <div>incomparable digital artworks, each imbued</div>
              <div>with a unique, unmistakable mark of </div>
              <div>authenticity</div>
            </div>
            <div className="mt-5">
              <Link href="/signatureseries">
                <Button
                  loading={loading3}
                  onClick={load3}
                  label="Launch"
                  rounded
                  className="buy-img"
                  style={{ width: "25%" }}
                />
              </Link>
            </div>
          </div>

          <div style={{ width: "50%" }}>
            <img style={{ width: "100%" }} src="image.png"></img>
          </div>
        </div>

        <div className="flex  mt-5" style={{ padding: "70px", gap: "50px" }}>
          <div style={{ width: "50%" }}>
            <img src="fusionseries.png"></img>
          </div>

          <div style={{ width: "50%" }}>
            <div
              className="signature-series-head p-heading"
              style={{ textAlign: "end" }}
            >
              Fusion Series
            </div>
            <div
              className="mt-5 text-3xl p-heading"
              style={{ textAlign: "end" }}
            >
              <div>Explore Fusion Series, an ERC-1155 NFT</div>
              <div>collection merging unique digital assets  </div>
              <div>with rich metadata for an enhanced</div>
              <div>NFT experience </div>
            </div>
             

 

            <div className="mt-5" style={{ textAlign: "end" }}>
              <Link href="/fusionSeries">
                <Button
                  loading={loading4}
                  onClick={load4}
                  label="Launch"
                  rounded
                  className="buy-img"
                  style={{ width: "25%" }}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex  mt-5" style={{ padding: "70px", gap: "50px" }}>
          <div style={{ width: "50%" }}>
            <div className="signature-series-head p-heading">Instagen</div>
            <div className="mt-5 text-3xl p-heading">
              <div>Explore InstaGen: an ERC-721A NFT collection </div>
              <div>with unique, indivisible, and limited-edition </div>
              <div>digital assets, elevating your digital art</div>
              <div>portfolio rarity and exclusivity </div>
           
            </div>
           

 

            <div className="mt-5">
              <Link href="/instagen">
                <Button
                  loading={loading5}
                  onClick={load5}
                  label="Launch"
                  rounded
                  className="buy-img"
                  style={{ width: "25%" }}
                />
              </Link>
            </div>
          </div>

          <div style={{ width: "50%" }}>
            <img src="instagen.png"></img>
          </div>
        </div>
        <div className="flex  mt-5" style={{ padding: "70px", gap: "50px" }}>
          
            <div style={{ width: "50%" }}>
              <img src="dynamicrealms.png"></img>
            </div>
          

          <div style={{ width: "50%" }}>
            <div
              className="signature-series-head p-heading"
              style={{ textAlign: "end" }}
            >
              Dynamic Realms
            </div>
            <div
              className="mt-5 text-3xl p-heading"
              style={{ textAlign: "end" }}
            >
              <div>Dynamic NFTs that Provide Dynamic </div>
              <div>Features, Changes in a NFT Smart </div>
              <div>Contract are Based on Conditions.</div>
            </div>
            <div className="mt-5" style={{ textAlign: "end" }}>
            <div className="font-bold p-heading text-3xl">Coming soon...</div>

            </div>
          </div>
        </div>

        <div className="flex   mt-5" style={{ padding: "70px", gap: "50px" }}>
          <div style={{ width: "50%" }}>
            <div>
              <div className="signature-series-head p-heading">Eternum Pass</div>
              <div className="mt-5 text-3xl p-heading">
                <div>Eternum pass offers a unique subscription model </div>
                <div>through its NFTs, enabling users to access </div>
                <div>premium content and services for a set</div>
                <div>duration, benefiting content creators and</div>
                <div>providers</div>
              </div>
               

 
 

              <div className="mt-5">
                <Link href="/eternumPass">
                  <Button
                    loading={loading7}
                    onClick={load7}
                    label="Launch"
                    rounded
                    className="buy-img"
                    style={{ width: "35%" }}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div style={{ width: "50%" }}>
            <img src="eternumpassl.png" className="w-full"></img>
          </div>
        </div>
        <div
          className="flex  "
          style={{
            padding: "70px",
            gap: "50px",
          }}
        >
          <div style={{ width: "50%" }}>
            <img src="physital.png"></img>
          </div>

          <div style={{ width: "50%" }}>
            <div
              className="signature-series-head p-heading"
              style={{ textAlign: "end" }}
            >
              Phygital NFTs
            </div>
            <div
              className="mt-5 text-3xl p-heading"
              style={{ textAlign: "end" }}
            >
              <div> Phygital NFTs redefine the boundary </div>
              <div>between the tangible and digital universes,</div>
              <div>seamlessly uniting physical assets with </div>
              <div>blockchain technology</div>
            </div>
           
 


            <div className="mt-5" style={{ textAlign: "end" }}>
             
              <div className="font-bold p-heading text-3xl">Coming soon...</div>
            </div>
          </div>
        </div>
        <div className="flex  mt-5" style={{ padding: "70px", gap: "50px" }}>
          <div style={{ width: "50%" }}>
            <div className="signature-series-head p-heading">Eternal Soul</div>
            <div className="mt-5 text-3xl p-heading">
              <div>An NFT that cannot be transferred and serves</div>
              <div>as a public verification of an individual</div>
              <div>credentials, affiliations, and commitments</div>
            </div>
             


            <div className="mt-5">
              <Link href="/eturnalsol">
                <Button
                  loading={loading5}
                  onClick={load5}
                  label="Launch"
                  rounded
                  className="buy-img"
                  style={{ width: "25%" }}
                />
              </Link>
            </div>
          </div>

          <div style={{ width: "50%" }}>
            <img src="eternulsol.png"></img>
          </div>
        </div>
        <div
          className="flex  "
          style={{
            padding: "70px",
            gap: "50px",
          }}
        >
          <div style={{ width: "50%" }}>
            <img src="accesscontrol.png"></img>
          </div>

          <div style={{ width: "50%" }}>
            <div
              className="signature-series-head p-heading"
              style={{ textAlign: "end" }}
            >
              Access Control
            </div>
            <div
              className="mt-5 text-3xl p-heading"
              style={{ textAlign: "end" }}
            >
              <div>The Access Master contract empowers the</div>
              <div>storefront creator to assign roles, handle </div>
              <div>finances, and manage all contracts within </div>
              <div>the storefront</div>
            </div>
            



            <div className="mt-5" style={{ textAlign: "end" }}>
              <Button
                loading={loading8}
                onClick={load8}
                label="Launch"
                rounded
                className="buy-img"
                style={{ width: "25%" }}
              />
            </div>
          </div>
        </div>
        <div className="flex  mt-5" style={{ padding: "70px", gap: "50px" }}>
          <div style={{ width: "50%" }}>
            <div className="signature-series-head p-heading">TradeHub</div>
            <div className="mt-5 text-3xl p-heading">
              <div>A leading NFT marketplace for peer-</div>
              <div>to-peer buying, selling, and trading of </div>
              <div>non-fungible tokens (NFTs).</div>
            </div>

            <div className="mt-5">
              <Link href="/step1">
                <Button
                  loading={loading5}
                  onClick={load5}
                  label="Launch"
                  rounded
                  className="buy-img"
                  style={{ width: "25%" }}
                />
              </Link>
            </div>
          </div>

          <div style={{ width: "50%" }}>
            <img src="tradhub.png"></img>
          </div>
        </div>
      </Layout>
    </div>
  );
}
