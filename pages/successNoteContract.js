import Link from "next/link";
import { Button } from "primereact/button";
import React from "react";
import AppTopbar from "../layout/AppTopbar";

export default function SuccessNoteContract() {
  return (
    <div>
            <AppTopbar/>

    
    <div className="text-center mt-5 text-3xl back-img-sig">
      <div className="font-bold">Congratulations</div>
      <div className="mt-5">your Storefront has been successfully Settled!</div>
      <div className="mt-5">
        <Link href="/subscriptionDashboard">
          <Button rounded>Manage StoreFront</Button>
        </Link>
      </div>
      <div className="mt-3">
        <Link href="/getAllSignatureseries">
          <Button rounded>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
    </div>
  );
}
