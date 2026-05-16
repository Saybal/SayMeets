import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileMenuBar from './MobileMenuBar'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
        <Image 
          src='/icons/logo.svg'
          alt='logo'
          width={32}
          height={32}
          className='max-sm:10' />
        
        <p className='text-[26px] text-white font-extrabold max-sm:hidden'>
          SayMeets
        </p>
      </Link>

      <div className='flex justify-between gap-5'>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
        </header>
        <MobileMenuBar/>
      </div>
    </nav>
  )
}

export default Navbar