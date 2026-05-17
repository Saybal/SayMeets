import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileMenuBar from './MobileMenuBar'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { SiGooglemeet } from 'react-icons/si'

const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link
  href="/"
  className="flex items-center gap-2 sm:gap-3 shrink-0"
>
  <div className="rounded-xl bg-blue-1 p-2 sm:p-2.5 md:p-3 shadow-lg">
    <SiGooglemeet className="text-lg sm:text-xl md:text-2xl text-white" />
  </div>

  <p
    className="
      text-lg
      sm:text-2xl
      md:text-[26px]
      font-extrabold
      text-white
      whitespace-nowrap
    "
  >
    SayMeets
  </p>
</Link>

      <div className='flex justify-between gap-5'>

        <Show when="signed-in">
              <UserButton />
            </Show>
        
        <MobileMenuBar/>
      </div>
    </nav>
  )
}

export default Navbar