'use client'
import { useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const Meeting_SetUp = () => {

  const [toggleCamera_Mic, setToggleCamera_Mic] = useState<boolean>(false)

  const call = useCall();

  useEffect(() => {
    if (toggleCamera_Mic) {
      call?.camera.disable();
      call?.microphone.disable();
    }
    else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [toggleCamera_Mic, call?.camera, call?.microphone]);
  
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Meeting SetUp</h1>
      <VideoPreview/>
    </div>
  )
}

export default Meeting_SetUp