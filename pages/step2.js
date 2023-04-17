import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

export default function Step2() {
  
    return (
    //     <Layout
    //     title="Step one"
    //     description="Used to deploy contract"
    //   >
<div>
    <div className='card p-5 font-bold'>Step 2 : Deploy Edition/Collection/AIREX/Subscription Nfts/Phygital NFTs </div>
    <div className='card'>
    <div className='text-center mt-5'>
    <div>Enter Collection name</div>
    <div className='mt-3'>
        <InputText className='p-2' type="text"/>
    </div>
    <div className='mt-3'>Enter Collection Symbol</div>
    <div className='mt-2'>
        <InputText className='p-2' type="text"/>
    </div>
    <div className='mt-3'>Enter Marketplace address</div>
    <div className='mt-2'>
        <InputText className='p-2' type="text"/>
    </div>
    <div className='mt-5'>
        <InputText className='p-2' placeholder='previous address'/>
    </div>
    </div>

    <div className='text-center mt-5'>
    <Button label="deploy contract" severity="Primary" rounded/>

    </div>
    </div>
</div>

        // {/* </Layout> */}
  )
}
