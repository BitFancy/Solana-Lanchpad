import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";
import { LayoutContext } from "../layout/context/layoutcontext";
import Image from "next/image";
export default function Launchpad() {
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [loading8, setLoading8] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);

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
  const load6 = () => {
    setLoading6(true);

    setTimeout(() => {
      setLoading6(false);
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
              <div> Launching Your Favorites</div>
              <div>NFTs in just few steps</div>
            </div>
          </div>
        </div>
        {/* <div
          className="flex justify-content-between gap-3 mt-5"
          style={{ padding: "70px" }}
        >
          <div
            className="text-center p-heading"
            style={{
              width: "400px",
              height: "500px",
              boxShadow: "0px 50px 60px 0px rgba(83, 71, 231, 0.50)",
              border: "1px solid",
              borderRadius:'20px'
            }}
          >
            <div className=" " style={{ marginTop: "100px" }}>
              <Image
                src={`./${
                  layoutConfig.colorScheme === "light"
                    ? "access"
                    : "Vector"
                }.svg`}
                alt="Logo"
                height="60"
                width="60"
                className="mr-2"
              />
            </div>
            <div className="font-bold mt-5 text-2xl p-heading">
              Access Control
            </div>
            <div className="mt-5 text-xl p-heading">
              <div>A self-executing contract automatically </div>
              <div>grants or denies permissions to </div>
              <div>network participants based on </div>
              <div>predefined rules.</div>
            </div>
          </div>
          <div
            className=" text-center"
            style={{
              width: "400px",
              height: "500px",
              boxShadow: "0px 50px 60px 0px rgba(83, 71, 231, 0.50)",
              border: "1px solid",
              borderRadius:'20px'

            }}
          >
            <div
              className="  p-heading"
              style={{ marginTop: "100px" }}
            >
              <Image
                src={`./${
                  layoutConfig.colorScheme === "light"
                    ? "tradhub"
                    : "darktradhub"
                }.svg`}
                alt="Logo"
                height="60"
                width="60"
                className="mr-2"
              />
            </div>
            <div className="font-bold mt-5 text-2xl p-heading">TradeHub</div>
            <div className="mt-5 text-xl p-heading">
              <div>A leading NFT marketplace for peer- </div>
              <div>to-peer buying, selling, and trading of </div>
              <div>non-fungible tokens (NFTs).</div>
            </div>
          </div>
          <div
            className=" text-center"
            style={{
              width: "400px",
              height: "500px",
              boxShadow: "0px 50px 60px 0px rgba(83, 71, 231, 0.50)",
              border: "1px solid",
              borderRadius:'20px'

            }}
          >
            <div className=" " style={{ marginTop: "100px" }}>
              <img
                style={{ width: "60px", height: "60px" }}
                src={`./${
                  layoutConfig.colorScheme === "light"
                    ? "eternalsoul"
                    : "eterdark"
                }.png`}
              ></img>
            </div>
            <div className="font-bold mt-5 text-2xl p-heading">EternalSoul</div>
            <div className="mt-5 text-xl p-heading">
              <div>A soulbound token is a non-transferable </div>
              <div>NFT publicly verifying an individual </div>
              <div>credentials, affiliations, and </div>
              <div>commitments.</div>
            </div>
          </div>
        </div> */}

        <div
          className="flex "
          style={{ marginTop: "150px", padding: "70px", gap: "50px" }}
        >
          <div style={{ width: "50%" }}>
            <div className="signature-series-head p-heading">
              SignatureSeries
            </div>
            <div className="mt-5 text-3xl p-heading">
              <div>Dive Into SignatureSeries, An Exclusive NFT </div>
              <div>Collection Built On ERC-721, Featuring One-of-a-</div>
              <div>Kind Digital Masterpieces. Immerse Yourself in</div>
              <div>the World of Unique, Non-Fungible Tokens, Each </div>
              <div>Possessing a Distinct, Unreplicable Signature of </div>
              <div>Authenticity</div>
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
            <img style={{ width: "100%", height: "100%" }} src="sig.png"></img>
          </div>
        </div>

        <div className="flex  mt-5" style={{ padding: "70px", gap: "50px" }}>
          <div style={{ width: "50%" }}>
            <img src="fusionseries2.png"></img>
          </div>

          <div style={{ width: "50%" }}>
            <div
              className="signature-series-head p-heading"
              style={{ textAlign: "end" }}
            >
              FusionSeries
            </div>
            <div
              className="mt-5 text-3xl p-heading"
              style={{ textAlign: "end" }}
            >
              <div>Explore FusionSeries, a Unique NFT Collection </div>
              <div>Leveraging ERC-1155 Power, Creating </div>
              <div>a Seamless Blend of Unique and</div>
              <div>Interchangeable Digital Assets. Experience </div>
              <div>the Future of Digital Art, with Bundled </div>
              <div>Collections and Rich Metadata that</div>
              <div>add Unprecedented Depth and</div>
              <div>Flexibility to Your NFT Experience</div>
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
              <div>Discover InstaGen, an Innovative NFT Collection </div>
              <div>Underpinned by the ERC-721A Protocol,</div>
              <div>Offering Unique, Indivisible, and Limited-</div>
              <div>Edition Digital Assets. Each Piece Stands as a </div>
              <div>Testament to Rarity and Uniqueness, </div>
              <div>Enhancing the Value and Exclusivity of Your</div>
              <div>Digital Art Portfolio</div>
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
            <img src="sig.png"></img>
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
              DynamicRealms
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
              <Button
                loading={loading6}
                onClick={load6}
                label="Launch"
                rounded
                className="buy-img"
                style={{ width: "25%" }}
              />
            </div>
          </div>
        </div>

        <div className="flex   mt-5" style={{ padding: "70px", gap: "50px" }}>
          <div style={{ width: "50%" }}>
            <div>
              <div className="signature-series-head p-heading">EternumPass</div>
              <div className="mt-5 text-3xl p-heading">
                <div>An Opportunity to Access Digital Assets</div>
                <div>and Ownership to Exclusive Content </div>
                <div>or services.</div>
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
            <img src="eturnumpass.png" className="w-full"></img>
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
              <div>Experience both the Phygital and </div>
              <div>Digital Worlds with Myriadflow</div>
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
            <div className="signature-series-head p-heading">EternalSoul</div>
            <div className="mt-5 text-3xl p-heading">
              <div>A soulbound token is a non-transferable </div>
              <div>NFT publicly verifying an individual</div>
              <div>credentials, affiliations and </div>
              <div>commitments.</div>
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
              <div>A self-executing contract automatically </div>
              <div>grants or denies permissions to </div>
              <div>network participants based on </div>
              <div>predefined rules.</div>
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
