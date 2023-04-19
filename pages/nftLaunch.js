import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

export default function NftLaunch() {
  return (
    <div>
     <div className="flex card justify-content-between">
        <div className="bg-blue-600 text-white p-5">
            <div className="font-bold text-2xl">Create As</div>
            <div className="mt-5">Edition</div>
            <div className="mt-3">Collection</div>
        </div>
        <div className="bg-blue-100 p-5">
            <div className="text-center">Image</div>
            <div>
                <div className="flex mt-5 gap-5">
                    <div>
                        <div className="font-bold text-2xl">Launch Edition</div>
                        <div>Deploy your own ERC-721 contract &</div>
<div>launch edition of assets</div>
                    </div>
                    <div>
                    <Button label="Launch" severity="Primary" rounded />
                                        </div>
                </div>
            </div>
        </div>
     </div>
      </div>
  )
}
