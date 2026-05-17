import { SignIn } from '@clerk/nextjs'
import React from 'react'
import { SiGooglemeet } from 'react-icons/si';

const signInpage = () => {
  return (
    <main className='flex h-screen items-center justify-center'>
      {/* <div className="flex items-center justify-center gap-3 mb-6">
  
  <div className="bg-blue-1 p-3 rounded-xl">
    <SiGooglemeet className="text-3xl text-white" />
  </div>

  <h1 className="text-3xl font-extrabold text-white">
    SayMeets
  </h1>

</div> */}
          <SignIn/>
    </main>
  )
}

export default signInpage;