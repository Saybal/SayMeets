import { SignIn } from '@clerk/nextjs'
import React from 'react'

const signInpage = () => {
  return (
      <main className='flex h-screen items-center justify-center'>
          <SignIn/>
    </main>
  )
}

export default signInpage;