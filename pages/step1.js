import Layout from '@/Components/Layout'
import React from 'react'

export default function Step1() {
  
    return (
        <Layout
        title="Step one"
        description="Used to deploy contract"
      >
<div>
    <div className='border-b-2 border-indigo-500 ... p-5 font-bold'>Step 1 : Setup Roles & marketplace</div>
    <div className='flex p-2 justify-around'>
        <div>Enter marketplace Name</div>
        <div>Enter marketplace fee</div>
    </div>
    <div className='flex p-2 justify-around'>
        <div>
            <input className='p-2' type="text"></input>
        </div>
        <div>
            <input className='p-2' type="number"></input>
        </div>
    </div>
    <div className='text-center mt-5'>
    <button className='bg-blue-500 rounded-full text-white p-2.5 w-1/4'>deploy contract</button>
    </div>
</div>

        </Layout>
  )
}