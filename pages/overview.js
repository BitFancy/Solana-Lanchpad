import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import Layout from "../Components/Layout";

export default function Overview() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [active, setActive] = useState("");

  const handleClick = (event) => {
    setActive(event.target.id);

  };
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
      <div className="text-center mt-10 border-b-2 border-indigo-500 ... overview-donut-top-back"></div>
      <div>
        <div>
          <div className="flex p-5">
            <div className=" p-5 overflow-y-auto ... overflow-dashboard-left">
              <div className="font-bold">overview</div>
              <div className="ml-3 mt-3">
                <div
                  key={1}
                  className={active === "1" ? "active" : undefined}
                  id={"1"}
                  onClick={handleClick}
                >
                  Analytics
                </div>
                <div
                  key={1}
                  className={active === "2" ? "active" : undefined}
                  id={"2"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Subscription
                </div>
              </div>

              <div className="font-bold mt-5">Contracts</div>
              <div className="ml-3">
                <div
                  key={3}
                  className={active === "3" ? "active" : undefined}
                  id={"3"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  SignatureSeries
                </div>
                <div
                  key={4}
                  className={active === "4" ? "active" : undefined}
                  id={"4"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  FusionSeries
                </div>
                <div
                  key={5}
                  className={active === "5" ? "active" : undefined}
                  id={"5"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  DynamicRealms
                </div>
                <div
                  key={6}
                  className={active === "6" ? "active" : undefined}
                  id={"6"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  EternumPass
                </div>
                <div
                  key={7}
                  className={active === "7" ? "active" : undefined}
                  id={"7"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Instagen
                </div>
              </div>
              <div className="border-bottom-das"></div>
              <div className="font-bold mt-5">Settings</div>
              <div className="ml-3">
                <div
                  key={8}
                  className={active === "8" ? "active" : undefined}
                  id={"8"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Roles
                </div>
                <div
                  key={9}
                  className={active === "9" ? "active" : undefined}
                  id={"9"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  TradeHub
                </div>
                <div
                  key={10}
                  className={active === "10" ? "active" : undefined}
                  id={"10"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Gateway
                </div>
                <div
                  key={11}
                  className={active === "11" ? "active" : undefined}
                  id={"11"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Frontend
                </div>
                <div
                  key={12}
                  className={active === "12" ? "active" : undefined}
                  id={"12"}
                  onClick={handleClick}
                  style={{ marginTop: "20px" }}
                >
                  Metaverse
                </div>
              </div>
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
        </div>
      </div>
    </Layout>
  );
}
