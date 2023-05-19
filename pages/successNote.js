import Image from 'next/image'
import { Button } from 'primereact/button'
import React from 'react'

export default function SuccessNote() {
  
    return (
    //     <Layout
    //     title="Success note of the storefront deployment"
    //     description="Used to show the congratulations message"
    //   >
<div>
    <div className='text-center'>
    <div className='flex justify-center mt-10 gap-10'>
        <div className='font-bold text-3xl'>Congratulations</div>
        <div>
            <Image className='congra-img' src="/congra.png"/>
        </div>

    </div>
    <div className='mt-10 font-bold text-2xl'>your Storefront has been successfully 
Settled!</div>
<div className='mt-5'>
    <Button label="Update Marketplace" severity="Primary" rounded />
    </div>
<div className='mt-5'>
    
    <Button label="Skip continue to dashboard" severity="Primary" rounded/>

    </div>

</div>
    </div>

        // </Layout>
  )
}