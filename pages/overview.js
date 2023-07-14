import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import Layout from "../Components/Layout";

export default function Overview() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            datasets: [
                {
                    data: [300, 100],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--black-500'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--black-400'), 
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

  return (
    <Layout
    title="Overview"
    description="This is use to show information of the overview launchpad"
  >
      <div className="text-center mt-10 border-b-2 border-indigo-500 ... overview-donut-top-back">
       
      </div>
    <div>
      <div>
        <div className="flex justify-content-between">
        <div className=" p-5 overflow-y-auto ... overflow-dashboard-left">
          <div className="font-bold">
          overview
          </div>
          <div className="ml-3 mt-3">
          <div>Analytics</div>
          <div className="mt-3">Subscription</div>
          </div>
         
          <div className="font-bold mt-5">Contracts</div>
         <div className="ml-3">
         <div className="mt-3">SignatureSeries</div>
          <div className="mt-3">FusionSeries</div>
          <div className="mt-3">DynamicRealms</div>
          <div className="mt-3">EternumPass</div>
          <div className="mt-3">Instagen</div>
         </div>
          <div className="border-bottom-das"></div>
          <div className="font-bold mt-5">Settings</div>
         <div className="ml-3">
         <div className="mt-3">Roles</div>
          <div className="mt-3">TradeHub</div>
          <div className="mt-3">Gateway</div>
          <div className="mt-3">Frontend</div>
          <div className="mt-3">Metaverse</div>
         </div>
        </div>
       <div style={{margin:'0 auto'}}>
        <div className="flex ">
       <Chart style={{height:"100px",width:'100px'}} type="doughnut" data={chartData} options={chartOptions}  />
       <Chart style={{height:"100px",width:'100px'}} type="doughnut" data={chartData} options={chartOptions}  />
       <Chart style={{height:"100px",width:'100px'}} type="doughnut" data={chartData} options={chartOptions} />
       </div>
       </div>
        </div>
       
          
      </div>
      </div>
      </Layout>
  )
}
