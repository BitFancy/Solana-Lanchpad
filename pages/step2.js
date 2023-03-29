import Layout from '@/Components/Layout'
import React from 'react'

export default function Step2() {
  
    return (
        <Layout
        title="Step one"
        description="Used to deploy contract"
      >
<div>
    <div className='border-b-2 border-indigo-500 ... p-5 font-bold'>Step 2 : Deploy Edition/Collection/AIREX/Subscription Nfts/Phygital NFTs </div>
    <div className='text-center mt-5'>
    <div>Enter Collection name</div>
    <div className='mt-3'>
        <input className='p-2 w-1/4' type="text"></input>
    </div>
    <div className='mt-3'>Enter Collection Symbol</div>
    <div className='mt-2'>
        <input className='p-2 w-1/4' type="text"></input>
    </div>
    <div className='mt-3'>Enter Marketplace address</div>
    <div className='mt-2'>
        <input className='p-2 w-1/4' type="text"></input>
    </div>
    <div className='mt-5'>
        <input className='p-2 w-1/4' placeholder='previous address'></input>
    </div>
    </div>

    <div className='text-center mt-5'>
    <button className='bg-blue-500 rounded-full text-white p-2.5 w-1/4'>deploy contract</button>
    </div>
    <div></div>
</div>

        </Layout>
  )
}