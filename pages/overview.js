import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function LunchManage() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['A', 'B'],
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
    <div>
      <div>
        <div className="font-bold ml-5 mt-10">Manage your collection</div>
        <div className="flex justify-content-around">
        <div className="font-bold p-5" style={{borderRight:"1px solid"}}>
            <div className="mt-5">Edition</div>
            <div className="mt-5">Collection</div>
            <div className="mt-5">AIREX</div>
            <div className="mt-5">Subscription NFTs</div>
            <div className="mt-5">Phygital NFTs</div>
            <div className="mt-5">Roles</div>
            <div className="mt-5">Marketplace</div>
            <div className="mt-5">Gateway</div>
            <div className="mt-5">Frontend</div>
            <div className="mt-5">Metaverse</div>
          </div>
        
       <div>
        <div className="flex ">
       <Chart type="doughnut" data={chartData} options={chartOptions}  />
       <Chart type="doughnut" data={chartData} options={chartOptions}  />
       <Chart type="doughnut" data={chartData} options={chartOptions} />
       </div>
       </div>
        </div>
       
          
      </div>
      </div>
  )
}
