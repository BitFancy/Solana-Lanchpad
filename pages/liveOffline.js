import React from "react";
import { Badge } from "primereact/badge";
import { Divider } from 'primereact/divider';

export default function LiveOffLine() {
  return (
    // <Layout title="Step one" description="Used to deploy contract">
      <div>
        <div className="card">
          <div className="flex font-bold justify-around mt-10  ">
            <div>Marketplace Name</div>
            <div>Status</div>
          </div>
          <Divider />
          <div className="flex justify-content-around mt-5">
            <div> 1. Demo</div>
            <div className="flex gap-2">
              <div>
                <Badge severity="success"></Badge>
              </div>

              <div>Live</div>
            </div>
          </div>
          <Divider />

            <div className="flex justify-content-around mt-5">
            <div>2. Demo</div>
            <div className="flex gap-2">
              <div>
                <Badge severity="warning"></Badge>
              </div>

              <div>Offline</div>
            </div>
          </div>
        </div>
      </div>
    // {/* </Layout> */}
  );
}
