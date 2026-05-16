"use client";
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Sidebar = () => {

    const path = usePathname();
  return (
      <section className='sticky left-0 top-0 flex flex-col justify-between h-screen w-fit bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
          <div className='flex flex-1 flex-col gap-6'>
              {sidebarLinks.map((link) => {
                  const active = path === link.route ;
                  return (
                      <Link
                          href={link.route}
                          key={link.label}
                          className={`${active ? "bg-blue-1" : ""} flex gap-4 p-4 items-center rounded-lg justify-start`}>
                          <Image
                              src={link.imgURL}
                              alt={link.label}
                              width={24}
                              height={24} />
                          <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                      </Link>
                  )
              })}
          </div>
          
    </section>
  )
}

export default Sidebar;