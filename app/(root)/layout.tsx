import Stream_Video_Provider from '@/providers/StreamVideoClient';
import React, { ReactNode } from 'react'

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <main>
      <Stream_Video_Provider>
        {children}
      </Stream_Video_Provider>
    </main>
  )
}

export default RootLayout;