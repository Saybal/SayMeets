import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileMenuBar from './MobileMenuBar'

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
        <MobileMenuBar/>
      </div>
    </nav>
  )
}

export default Navbar