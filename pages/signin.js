import React from 'react'

import { SocialIcon } from 'react-social-icons';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function SignIn() {
  return (
//     <Layout
//     title="Sign In"
//     description="Used to Sign in"
//   >
    <div>
      <div className='text-center'>
      <div className='text-center mt-10 '>
        <div className='font-bold text-3xl'>Sign In</div>
        <div className='text-2xl mt-3 '>continue with</div>
        </div>
        <div className='flex justify-center gap-x-10 mt-5 border-b-2 border-indigo-500 ... p-5'>
<div><SocialIcon url="https://google.com" /></div>
<div><SocialIcon url="https://facebook.com" /></div>
<div><SocialIcon network="twitter" url="https://tweeter.com" /></div>
<div><SocialIcon url="https://discord.com" /></div>

        </div>
        <div className='border-b-2 border-indigo-500 ... p-5'>
          <div>Email</div>
          <div className='mt-3'>
            <InputText className='rounded-full p-3.5 w-5/12' placeholder='Email'/>
          </div>
          <div className='mt-5'>
           <Button label="continue With Email" severity="Primary" rounded />

          </div>
        </div>
        <div className='mt-5'>EXTERNAL WALLET</div>
        <div className='mt-3'>
          <Button label="Connect with wallet" severity="Primary" rounded />

        </div>
        </div>
    </div>
    // {/* </Layout> */}
  )
}
