import React from "react";
import { Badge } from "primereact/badge";
import { Divider } from 'primereact/divider';
import Layout from "../Components/Layout";

export default function LiveOffLine() {
  return (
    <Layout title="Live OffLine" description="Used to live or offline contract information">
       <div className="text-center mt-10 border-b-2 border-indigo-500 ... overview-top-back">
      </div>
      <hr></hr>
      <div>
        <div className="card overview-card">
          <div className="flex font-bold justify-content-between mt-10  ">
            <div>TradeHub Name</div>
            <div>Status</div>
          </div>
          <Divider />
          <div className="flex justify-content-between mt-5 cursor-pointer">
            <div> 1. Demo</div>
            <div className="flex gap-2">
              <div>
                <Badge severity="success"></Badge>
              </div>

              <div>Live</div>
            </div>
          </div>
          <Divider />

            <div className="flex justify-content-between mt-5 cursor-pointer">
            <div>2. Demo</div>
            <div className="flex gap-2">
              <div>
                <Badge severity="warning"></Badge>
              </div>

              <div>Offline</div>
            </div>
          </div>
          <Divider />

          <div className="flex justify-content-between mt-5 cursor-pointer">
            <div> 3. Demo</div>
            <div className="flex gap-2">
              <div>
                <Badge severity="success"></Badge>
              </div>

              <div>Live</div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-content-between mt-5 cursor-pointer">
            <div> 4. Demo</div>
            <div className="flex gap-2">
              <div>
                <Badge severity="success"></Badge>
              </div>

              <div>Live</div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-content-between mt-5 cursor-pointer">
            <div> 5. Demo</div>
            <div className="flex gap-2">
              <div>
                <Badge severity="success"></Badge>
              </div>

              <div>Live</div>
            </div>
          </div>
          <Divider />
        </div>
      </div>
    </Layout>
  );
}
