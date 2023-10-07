import React, { useState, useEffect, useContext } from "react";
import { Chart } from "primereact/chart";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { LayoutContext } from "../layout/context/layoutcontext";
import LayoutDashbord from "../Components/LayoutDashbord";
import { withRouter } from "next/router";
import axios from "axios";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;

 function Overview(props) {
  const [chartData, setChartData] = useState({});
  const { layoutConfig } = useContext(LayoutContext);
  const [chartOptions, setChartOptions] = useState({});
  const [contractData, setContarctData] = useState('');

  useEffect(() => {
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const data = {
  //     datasets: [
  //       {
  //         data: [300, 100],
  //         backgroundColor: [
  //           documentStyle.getPropertyValue("--blue-500"),
  //           documentStyle.getPropertyValue("--black-500"),
  //         ],
  //         hoverBackgroundColor: [
  //           documentStyle.getPropertyValue("--blue-400"),
  //           documentStyle.getPropertyValue("--black-400"),
  //         ],
  //       },
  //     ],
  //   };
  //   const options = {
  //     cutout: "60%",
  //   };

  //   setChartData(data);
  //   setChartOptions(options);
    getcontractById();
  }, []);


  const getcontractById = () => {
    const token = localStorage.getItem("platform_token");
    axios.get(`${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts/${props.router.query.storefrontId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
          setContarctData(response?.data?.length);
        console.log('length',response?.data?.length)
      })
      .catch((error) => {
        console.log('error while get contract by id',error)
      })
    
  };
  return ( 
    <LayoutDashbord
      title="Overview"
      description="This is use to show information of the overview launchpad"
    >        <MarketplaceProfileDetails id={props?.router?.query?.storefrontId}/>
          <div  className="flex">
            <div >
            <Sidemenu/>
            </div>
            {/* <div style={{ margin: "0 auto" }}>
              <div className="flex mt-5">
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

            </div> */}

          <div className="mt-5 ml-5">  No of contract: {contractData}</div>
          </div>
        
      
    </LayoutDashbord>
  );
}
export default withRouter(Overview)