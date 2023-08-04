import React, { useState, useEffect, useRef } from "react";
import { Chart } from "primereact/chart";
import Layout from "../Components/Layout";
import Sidemenu from "./sidemenu";
import { Messages } from "primereact/messages";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
export default function Overview() {
  const msgs = useRef(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      datasets: [
        {
          data: [300, 100],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--black-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--black-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return ( 
    <Layout
      title="Overview"
      description="This is use to show information of the overview launchpad"
    >
        <Messages ref={msgs} />
        <MarketplaceProfileDetails/>
          <div className="flex p-5 buy-back-image">
            <div >
            <Sidemenu/>
            </div>
            <div style={{ margin: "0 auto" }}>
              <div className="flex ">
                <Chart
                  style={{ height: "100px", width: "100px" }}
                  type="doughnut"
                  data={chartData}
                  options={chartOptions}
                />
                <Chart
                  style={{ height: "100px", width: "100px" }}
                  type="doughnut"
                  data={chartData}
                  options={chartOptions}
                />
                <Chart
                  style={{ height: "100px", width: "100px" }}
                  type="doughnut"
                  data={chartData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        
      
    </Layout>
  );
}
