import React from 'react'
import Layout from "../Components/Layout";

import { SocialIcon } from 'react-social-icons';

export default function SignIn() {
  return (
    <Layout
    title="Sign In"
    description="Used to Sign in"
  >
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
            <input className='rounded-full p-3.5 w-5/12' placeholder='Email'></input>
          </div>
          <div className='mt-5'>
           <button className='bg-blue-500 rounded-full text-white p-2.5 w-5/12'>continue With Email</button>
          </div>
        </div>
        <div className='mt-5'>EXTERNAL WALLET</div>
        <div className='mt-3'>
          <button className='bg-blue-500 rounded-full text-white p-2.5 w-5/12'>Connect with wallet</button>
        </div>
        </div>
    </div>
    </Layout>
  )
}
