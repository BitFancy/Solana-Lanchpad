import React from 'react'
import Layout from '../Components/Layout'
import { Button } from 'primereact/button'
import Link from 'next/link'

export default function SubscriptionDashboard() {
  return (
   <Layout>
     <div style={{marginTop:'100px'}}>
     <div className="font-bold text-3xl p-5 text-center">Buy Subscription Details</div>
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
                      <div>Plan: Basic</div>
                    </div>
                  </div>
                  <Link href='/step1'>
                  <div>
                    <Button label="Setup"></Button>
                  </div>
                  </Link>
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
                      <div>Plan: Pro</div>
                    </div>
                  </div>
                  <div>
                    <Link href='/getAllSignatureseries'>
                  <div >
                    <Button style={{width:'100%'}} label="View"></Button>
                  </div>
                  </Link>

                  <Link href='/accessMasterRole' >
                  <div className='mt-5'>
                    <Button style={{width:'100%'}}   label="Manage"></Button>
                  </div>
                  </Link>
                  </div>
                  
                </div>
              
               
              </div>
   </Layout>
  )
}
