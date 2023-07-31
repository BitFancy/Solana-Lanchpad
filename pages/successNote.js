import { Button } from "primereact/button";
import React from "react";
import Layout from "../Components/Layout";
export default function SuccessNote() {
  return (
    <Layout
      title="Success Note"
      description="Used to show success contract information"
    >
      <div>
        <div className="text-center sucessnote-back">
          <div className="flex justify-content-center  gap-5">
            <div className="font-bold text-3xl">Congratulations</div>
            <div>
              <img className="congra-img" src="./congra.png" />
            </div>
          </div>
          <div className="mt-10  text-2xl">
            your Storefront has been successfully Settled!
          </div>
          <div className="mt-5">
            <Button
              label="Update Marketplace"
              className="update-marketplace"
              severity="Primary"
              rounded
            />
          </div>
          <div className="mt-5">
            <button className="skip-button">Skip continue to dashboard</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
