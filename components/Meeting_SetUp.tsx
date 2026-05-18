'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { AiFillAudio } from 'react-icons/ai'
import { FaVideo } from 'react-icons/fa6'

type Props = {
  setSetup: (value: boolean) => void;
}

const Meeting_SetUp = ({setSetup} : Props) => {

  const [toggleCamera_Mic, setToggleCamera_Mic] = useState<boolean>(false)

  const call = useCall();

  if (!call) {
    throw new Error("Call object is not available");
  }

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
   <div className="flex min-h-screen w-full flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-4 py-8 md:px-8 text-white">

  {/* Video Preview */}
  <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-500">
        <VideoPreview className="rounded-2xl w-full h-auto" />
        <div className='flex items-center justify-center gap-3'>
          <Button className="bg-red-500 rounded-full">
          <AiFillAudio />
          </Button>
          <Button className="bg-red-500 rounded-full">
            <FaVideo />
          </Button>
        </div>
  </div>

  {/* Content */}
  <div className="flex w-full max-w-xl flex-col items-center lg:items-start justify-center text-center lg:text-left">

    <h1
      className="
        text-3xl
        sm:text-4xl
        md:text-5xl
        lg:text-6xl
        font-bold
        leading-tight
      "
    >
      Meeting Setup
    </h1>

    <p
      className="
        mt-3
        text-sm
        sm:text-base
        md:text-lg
        text-gray-300
      "
    >
      Prepare for your meeting. Lets get started!
    </p>

    {/* Controls */}
    <div className="mt-6 flex w-full flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">

      <Button
        className="
          w-full
          sm:w-auto
          bg-blue-1
          px-5
          py-6
          text-sm
          sm:text-base
          font-semibold
          text-white
          rounded-xl
          cursor-pointer
          hover:bg-blue-700
        "
        onClick={() =>
          setToggleCamera_Mic((prev) => !prev)
        }
      >
        {toggleCamera_Mic
          ? "Turn On Camera and Microphone"
          : "Turn Off Camera and Microphone"}
          </Button>
          <DeviceSettings/>

          <Button className="rounded-md px-4 py-2.5 bg-green-500 cursor-pointer"
            onClick={() => {
              call.join();
              setSetup(true)
          }}>Join Meeting</Button>

    </div>

  </div>
</div>
  )
}

export default Meeting_SetUp