import Stream_Video_Provider from '@/providers/StreamVideoClient';
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

  export const metadata: Metadata = {
    title: "SayMeets",
    description: "A video calling App",
    icons: {
      icon: '/icons/saymeets-icon.svg'
    }
  };

const RootLayout = ({ children }: { children: ReactNode }) => {
  
  return (
    <main>
      <Stream_Video_Provider>
        {children}
      </Stream_Video_Provider>
    </main>
  )
}

export default RootLayout;