// import Layout from '@/Components/Layout'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

export default function Step1() {
  
    return (
    //     <Layout
    //     title="Step one"
    //     description="Used to deploy contract"
    //   >
<div>
    <div className='card p-5 font-bold'>Step 1 : Setup Roles & marketplace</div>
    <div className='card'>
    <div className='flex p-2 justify-content-around'>
        <div>Enter marketplace Name</div>
        <div>Enter marketplace fee</div>
    </div>
    <div className='flex p-2 justify-content-around '>
        <div>
            <InputText id="marketName"  className='p-2' type="text" style={{width:"100%"}}/>
        </div>
        <div>
            <InputText className='p-2' type="number"/>
        </div>
    </div>
    <div className='text-center mt-5'>
    <Button label="deploy contract" severity="Primary" rounded />

    </div>
    </div>
</div>

        // {/* </Layout> */}
  )
}
