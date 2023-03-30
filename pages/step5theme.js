import Layout from '@/Components/Layout'
import React from 'react'

export default function Step5theme() {
  
    return (
        <Layout
        title="Step five"
        description="Used to select theme of the metavers"
      >
<div>
    <div className='border-b-2 border-indigo-500 ... p-5 font-bold'>Step 5 : Choose a metaverse theme  </div>
    <div className='flex justify-around mt-5 font-bold'>
        <div>museum</div>
        <div>Garden</div>
        <div>Showroom</div>
        <div>Live Show</div>
    </div>
    <div className='flex justify-around mt-5'>
<div>
    <img src="/musium.png"></img>
</div>
<div>
    <img src="/garden.png"></img>
</div>
<div>
    <img src="/showroom.png"></img>
</div>
<div>
    <img src="/live.png"></img>
</div>
    </div>
</div>

        </Layout>
  )
}