import Link from "next/link";
import { Button } from "primereact/button";
import React from "react";
import AppTopbar from "../layout/AppTopbar";

export default function SuccessNoteContract() {
  return (
    <div>
            <AppTopbar/>

    
    <div className="text-center text-3xl back-img-sig" style={{marginTop:'100px'}}>
      <div className="font-bold">Congratulations</div>
      <div className="mt-3">your Storefront has been successfully Settled!</div>
      <div style={{marginTop:'35px'}}>
        <Link href="/subscriptionDashboard">
          <Button rounded>Manage StoreFront</Button>
        </Link>
      </div>
      <div className="mt-3">
        <Link href="/getAllSignatureseries">
          <Button rounded style={{background:'none',color:'black',border:'1px solid white'}}>Go to Dashboard</Button>
        </Link>
      </div>
      <div className="mt-3">
        <Link href="/launchSignatureseries">
          <Button rounded style={{background:'none',color:'black',border:'1px solid white'}}>Deploy Another Contract</Button>
        </Link>
      </div>
    </div>
    </div>
  );
}
