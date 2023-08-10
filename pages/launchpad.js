import React, { useState } from "react";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";
export default function Launchpad() {
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <Layout title="Launchpad" description="Used to show launchpad information">
      <div className="launchpad-back">
        <div
          className="text-center font-bold mt-16 text-white"
          style={{ top: "200px", position: "relative", fontSize: "50px" }}
        >
          <div>Experience Launching Your Favorites</div>
          <div>Categories In Just Few Steps</div>
        </div>
      </div>
      <div className="flex justify-content-center gap-5 mt-5">
        <div className="card text-center" style={{width:'360px',height:'350px'}}>
          <div>
            <img
              style={{ width: "60px", height: "60px" }}
              src="/accessicon.png"
            ></img>
          </div>
          <div className="font-bold mt-5 text-2xl">Access Control</div>
          <div className="mt-5 text-xl">
            <div>A self-executing contract automatically </div>
            <div>grants or denies permissions to </div>
            <div>network participants based on </div>
            <div>predefined rules.</div>
          </div>
        </div>
        <div className="card text-center" style={{width:'360px',height:'350px'}}>
          <div>
            <img
              style={{ width: "60px", height: "60px" }}
              src="/marketplace.png"
            ></img>
          </div>
          <div className="font-bold mt-5 text-2xl">TradeHub</div>
          <div className="mt-5 text-xl">
            <div>A leading NFT marketplace for peer- </div>
            <div>to-peer buying, selling, and trading of </div>
            <div>non-fungible tokens (NFTs).</div>
          </div>
        </div>
        <div className="card text-center" style={{width:'360px',height:'350px'}}>
          <div>
            <img
              style={{ width: "60px", height: "60px" }}
              src="/eternalsoul.png"
            ></img>
          </div>
          <div className="font-bold mt-5 text-2xl">EternalSoul</div>
          <div className="mt-5 text-xl">
            <div>A soulbound token is a non-transferable </div>
            <div>NFT publicly verifying an individual </div>
            <div>credentials, affiliations, and </div>
            <div>commitments.</div>
          </div>
        </div>
      </div>
      <div className="flex p-5 justify-content-around mt-5">
        <div>
          <div>
            <div className="signature-series-head">Access Master</div>
            <div className="mt-5 text-3xl">
              <div>Dive Into SignatureSeries, An Exclusive NFT </div>
              <div>Collection Built On ERC-721, Featuring One-of-a-</div>
              <div>Kind Digital Masterpieces. Immerse Yourself in</div>
              <div>the World of Unique, Non-Fungible Tokens, Each </div>
              <div>Possessing a Distinct, Unreplicable Signature of </div>
              <div>Authenticity</div>
            </div>
            <div className="mt-5">
              <Link href="/deployflowaccessControl">
                <Button
                  loading={loading}
                  onClick={load}
                  label="Launch Access Master"
                  rounded
                />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img style={{ height: "300px" }} src="signatureseries.png"></img>
        </div>
      </div>
      <div className="flex p-5 justify-content-around mt-5">
        <div>
          <img style={{ height: "300px" }} src="signatureseries.png"></img>
        </div>
        <div>
          <div className="signature-series-head">TradeHub</div>
          <div className="mt-5 text-3xl">
            <div>Dive Into SignatureSeries, An Exclusive NFT </div>
            <div>Collection Built On ERC-721, Featuring One-of-a-</div>
            <div>Kind Digital Masterpieces. Immerse Yourself in</div>
            <div>the World of Unique, Non-Fungible Tokens, Each </div>
            <div>Possessing a Distinct, Unreplicable Signature of </div>
            <div>Authenticity</div>
          </div>
          <div className="mt-5">
            <Link href="/step1">
              <Button
                loading={loading}
                onClick={load}
                label="Launch Tradhub"
                rounded
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex p-5 justify-content-around mt-5">
        <div>
          <div className="signature-series-head">SignatureSeries</div>
          <div className="mt-5 text-3xl">
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
                loading={loading}
                onClick={load}
                label="Launch SignatureSeries"
                rounded
              />
            </Link>
          </div>
        </div>

        <div>
          <img style={{ height: "300px" }} src="signatureseries.png"></img>
        </div>
      </div>

      <div className="flex p-5 justify-content-around">
        <div>
          <div>
            <img style={{ height: "300px" }} src="Fusionseries.png"></img>
          </div>
        </div>
        <div>
          <div className="signature-series-head">FusionSeries</div>
          <div className="mt-5 text-3xl">
            <div>Explore FusionSeries, a Unique NFT Collection </div>
            <div>Leveraging ERC-1155 Power, Creating </div>
            <div>a Seamless Blend of Unique and</div>
            <div>Interchangeable Digital Assets. Experience </div>
            <div>the Future of Digital Art, with Bundled </div>
            <div>Collections and Rich Metadata that</div>
            <div>add Unprecedented Depth and</div>
            <div>Flexibility to Your NFT Experience</div>
          </div>

          <div className="mt-5">
            <Link href="/fusionSeries">
              <Button
                loading={loading}
                onClick={load}
                label="Launch FusionSeries"
                rounded
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex p-5 justify-content-around mt-5">
        <div>
          <div>
            <div className="signature-series-head">Instagen</div>
            <div className="mt-5 text-3xl">
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
                  loading={loading}
                  onClick={load}
                  label="Launch Instagen"
                  rounded
                />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img style={{ height: "300px" }} src="instagen.png"></img>
        </div>
      </div>
      <div className="flex p-5 justify-content-around mt-5">
        <div>
          <div>
            <img style={{ height: "300px" }} src="dynamicrealms.png"></img>
          </div>
        </div>
        <div>
          <div className="signature-series-head">DynamicRealms</div>
          <div className="mt-5 text-3xl">
            <div>Dynamic NFTs that Provide Dynamic </div>
            <div>Features, Changes in a NFT Smart </div>
            <div>Contract are Based on Conditions.</div>
          </div>
          <div className="mt-5">
            <Button
              loading={loading}
              onClick={load}
              label="Launch DynamicRealms"
              rounded
            />
          </div>
        </div>
      </div>
      <div className="flex p-5 justify-content-around mt-5">
        <div>
          <div>
            <div>
              <div className="signature-series-head">EternumPass</div>
              <div className="mt-5 text-3xl">
                <div>An Opportunity to Access Digital Assets</div>
                <div>and Ownership to Exclusive Content </div>
                <div>or services.</div>
              </div>
              <div className="mt-5">
                <Link href="/eternumPass">
                  <Button
                    loading={loading}
                    onClick={load}
                    label="Launch EternumPass"
                    rounded
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img style={{ height: "300px" }} src="Eternumpass.png"></img>
        </div>
      </div>
      <div className="flex p-5 justify-content-around mt-5">
        <div>
          <div>
            <img style={{ height: "300px" }} src="Phygital.png"></img>
          </div>
        </div>
        <div>
          <div className="signature-series-head">Phygital NFTs</div>
          <div className="mt-5 text-3xl">
            <div>Experience both the Phygital and </div>
            <div>Digital Worlds with Myriadflow</div>
          </div>
          <div className="mt-5">
            <Button
              loading={loading}
              onClick={load}
              label="Launch Phygital NFTs"
              rounded
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
