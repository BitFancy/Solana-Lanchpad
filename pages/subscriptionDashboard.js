import React from 'react'
import Layout from '../Components/Layout'
import { Button } from 'primereact/button'

export default function SubscriptionDashboard() {
  return (
   <Layout>
     <div style={{marginTop:'100px'}}>
     <div className="font-bold text-3xl p-5">Buy Subscription</div>
      <hr></hr>
     <div className="flex justify-content-between mt-5 align-items-center subscription-back-part p-5">
                  <div className="flex gap-5">
                    <div>
                      <img
                        className="dash-img-size"
                        style={{ width: "100px", height: "100px" }}
                        src="garden.png"
                      ></img>
                    </div>
                    <div className="text-white">
                      <div>My first marketplace</div>
                      {/* <div>{activeSubccriptionMenu?.id}</div> */}
                      <div>Plan: Basic</div>
                    </div>
                  </div>
                  <div>
                    <Button label="Setup"></Button>
                  </div>
                </div>
                <div className="flex justify-content-between mt-5 align-items-center subscription-back-part p-5">
                  <div className="flex gap-5">
                    <div>
                      <img
                        className="dash-img-size"
                        style={{ width: "100px", height: "100px" }}
                        src="garden.png"
                      ></img>
                    </div>
                    <div className="text-white">
                      <div>My first marketplace</div>
                      {/* <div>{activeSubccriptionMenu?.id}</div> */}
                      <div>Plan: Basic</div>
                    </div>
                  </div>
                  <div>
                    <Button label="Setup"></Button>
                  </div>
                </div>
                <div className="flex justify-content-between mt-5 align-items-center subscription-back-part p-5">
                  <div className="flex gap-5">
                    <div>
                      <img
                        className="dash-img-size"
                        style={{ width: "100px", height: "100px" }}
                        src="garden.png"
                      ></img>
                    </div>
                    <div className="text-white">
                      <div>My first marketplace</div>
                      {/* <div>{activeSubccriptionMenu?.id}</div> */}
                      <div>Plan: Basic</div>
                    </div>
                  </div>
                  <div>
                    <Button label="Setup"></Button>
                  </div>
                </div>
                <div className="flex justify-content-between mt-5 align-items-center subscription-back-part p-5">
                  <div className="flex gap-5">
                    <div>
                      <img
                        className="dash-img-size"
                        style={{ width: "100px", height: "100px" }}
                        src="garden.png"
                      ></img>
                    </div>
                    <div className="text-white">
                      <div>My first marketplace</div>
                      {/* <div>{activeSubccriptionMenu?.id}</div> */}
                      <div>Plan: Basic</div>
                    </div>
                  </div>
                  <div>
                    <Button label="Setup"></Button>
                  </div>
                </div>
              </div>
   </Layout>
  )
}
