import Link from "next/link";
import { Button } from "primereact/button";
import React, { useContext } from "react";
import AppTopbar from "../layout/AppTopbar";
import { LayoutContext } from "../layout/context/layoutcontext";

export default function SuccessNoteContract() {
  const { layoutConfig } = useContext(LayoutContext);

  return (
    <div>
            <AppTopbar/>

    
    <div  className={`${layoutConfig.colorScheme === 'light' ? 'back-img-sig' : 'dark'} text-center text-3xl`} style={{marginTop:'100px'}}>
      <div className="font-bold">Congratulations</div>
      <div className="mt-3">your Storefront has been successfully Settled!</div>
      <div style={{marginTop:'35px'}}>
        <Link href="/subscriptionDashboard">
          <Button className="buy-img" rounded>Manage StoreFront</Button>
        </Link>
      </div>
      <div className="mt-3 p-heading">
        <Link href="/getAllSignatureseries">
          <Button className="buy-img" rounded style={{border:'1px solid white'}}>Go to Dashboard</Button>
        </Link>
      </div>
      {/* <div className="mt-3">
        <Link href="/launchSignatureseries">
          <Button rounded style={{background:'none',color:'black',border:'1px solid white'}}>Deploy Another Contract</Button>
        </Link>
      </div> */}
    </div>
    </div>
  );
}
