import React from "react";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
import Link from "next/link";
export default function Launchpad() {
  return (
    <Layout title="Launchpad" description="Used to show launchpad information">
      <div className="launchpad-back">
        <div
          className="text-center font-bold mt-16 text-white"
          style={{ top: "200px", position: "relative", fontSize: "50px" }}
        >
          <div>Experience launching your favorites</div>
          <div>categories in just few steps</div>
        </div>

       </div>
       <div className="flex p-5 justify-content-around mt-5">
        <div>
          <div>
            <div className="signature-series-head">Access Master</div>
            <div className="mt-5 text-3xl">
              <div>Dive into SignatureSeries, an exclusive NFT </div>
              <div>collection built on ERC-721, featuring one-of-a-</div>
              <div>kind digital masterpieces. Immerse yourself in</div>
              <div>the world of unique, non-fungible tokens, each </div>
              <div>possessing a distinct, unreplicable signature of </div>
              <div>authenticity</div>
            </div>
            <div className="mt-5">
              <Link  href='/deployflowaccessControl' >
              <Button  label="Launch Access Master" rounded />
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
              <div>Dive into SignatureSeries, an exclusive NFT </div>
              <div>collection built on ERC-721, featuring one-of-a-</div>
              <div>kind digital masterpieces. Immerse yourself in</div>
              <div>the world of unique, non-fungible tokens, each </div>
              <div>possessing a distinct, unreplicable signature of </div>
              <div>authenticity</div>
            </div>
            <div className="mt-5">
              <Link  href='/step1' >
              <Button  label="Launch Tradhub" rounded />
              </Link>
            </div>
         
        </div>
       
      </div>
      <div className="flex p-5 justify-content-around mt-5">
       
          <div>
            <div className="signature-series-head">SignatureSeries</div>
            <div className="mt-5 text-3xl">
              <div>Dive into SignatureSeries, an exclusive NFT </div>
              <div>collection built on ERC-721, featuring one-of-a-</div>
              <div>kind digital masterpieces. Immerse yourself in</div>
              <div>the world of unique, non-fungible tokens, each </div>
              <div>possessing a distinct, unreplicable signature of </div>
              <div>authenticity</div>
            </div>
            </div>
            <div className="mt-5">
              <Link  href='/signatureseries' >
              <Button  label="Launch" rounded />
              </Link>
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
            <div>Explore FusionSeries, a unique NFT collection </div>
            <div>leveraging ERC-1155 power, creating </div>
            <div>a seamless blend of unique and</div>
            <div>interchangeable digital assets. Experience </div>
            <div>pthe future of digital art, with bundled </div>
            <div>collections and rich metadata that</div>
            <div>add unprecedented depth and</div>
            <div>flexibility to your NFT experience</div>
          </div>

          <div className="mt-5">
            <Link href='/fusionSeries'>
            <Button label="Launch" rounded />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex p-5 justify-content-around mt-5">
        <div>
          <div>
            <div className="signature-series-head">Instagen</div>
            <div className="mt-5 text-3xl">
              <div>Discover InstaGen, an innovative NFT collection </div>
              <div>underpinned by the ERC-721A protocol,</div>
              <div>offering unique, indivisible, and limited-</div>
              <div>edition digital assets. Each piece stands as a </div>
              <div>testament to rarity and uniqueness, </div>
              <div>enhancing the value and exclusivity of your</div>
              <div>digital art portfolio</div>
            </div>
            <div className="mt-5">
              <Link href='/instagen'>
              <Button label="Launch Instagen" rounded />
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
            <div>Dynamic NFTs that provide dynamic </div>
            <div>features, changes in a dNFT smart </div>
            <div>contract are based on conditions.</div>
          </div>
          <div className="mt-5">
            <Button label="Launch" rounded />
          </div>
        </div>
      </div>
      <div className="flex p-5 justify-content-around mt-5">
        <div>
          <div>
            <div>
              <div className="signature-series-head">EternumPass</div>
              <div className="mt-5 text-3xl">
                <div>An Opportunity to access digital assets</div>
                <div>and ownership to exclusive content </div>
                <div>or services.</div>
              </div>
              <div className="mt-5">
                <Link href='/eternumPass'>
                <Button label="Launch EternumPass" rounded />
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
            <div>digital worlds with myriadflow</div>
          </div>
          <div className="mt-5">
            <Button label="Launch" rounded />
          </div>
        </div>
      </div>
    </Layout>
  );
}
