import React from 'react'
import Link from 'next/link'
export default function LaunchContarctSidebar() {
  return (
     <div className="bg-blue-600 text-white p-5" style={{height:'359px'}}>
          <div className="font-bold text-2xl">Create As</div>
          <Link href='/launchSignatureseries' style={{color:'white'}}>
          <div className="flex gap-3 mt-5">
            <div>
              <img src="edition.png" alt="edition"></img>
            </div>
            <div className="edition-note">SignatureSeries</div>
          </div>
          </Link>
          <Link href='/launchFusionseries' style={{color:'white'}}>
          <div className="flex gap-3 mt-5">
            <div>
              <img src="collection.png" alt="FusionSeries"></img>
            </div>
            <div className="edition-note">FusionSeries</div>
          </div>
          </Link>
          <Link href='/launcheteriumpass' style={{color:'white'}}>
          <div className="flex gap-3 mt-5">
            <div>
              <img src="collection.png" alt="EternumPass"></img>
            </div>
            <div className="edition-note">EternumPass</div>
          </div>
          </Link>
          <Link href='/launchInstagen' style={{color:'white'}}>
          <div className="flex gap-3 mt-5">
            <div>
              <img src="collection.png" alt="Instagen"></img>
            </div>
            <div className="edition-note">Instagen</div>
          </div>
          </Link>
          <Link href='/launcheturnulsol' style={{color:'white'}}>
          <div className="flex gap-3 mt-5">
            <div>
              <img src="collection.png" alt="EternalSoul"></img>
            </div>
            <div className="edition-note">EternalSoul</div>
          </div>
          </Link>
         
        </div>
  
  )
}
