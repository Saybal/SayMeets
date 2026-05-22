

"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import React, { useEffect, useState } from "react";

import { Button } from "./ui/button";

import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { FaVideo, FaVideoSlash } from "react-icons/fa6";
import { Settings2 } from "lucide-react";

type Props = {
  setSetup: (value: boolean) => void;
};

const Meeting_SetUp = ({ setSetup }: Props) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const call = useCall();

  if (!call) {
    throw new Error("Call object is not available");
  }

  // MIC CONTROL
  useEffect(() => {
    if (isMicOn) {
      call.microphone.enable();
    } else {
      call.microphone.disable();
    }
  }, [isMicOn, call]);

  // CAMERA CONTROL
  useEffect(() => {
    if (isCameraOn) {
      call.camera.enable();
    } else {
      call.camera.disable();
    }
  }, [isCameraOn, call]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-dark-1 px-4 py-10 text-white">
      <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md lg:flex-row">
        {/* LEFT SIDE - VIDEO */}
        <div className="relative flex w-full items-center justify-center bg-black/40 p-4 lg:w-[58%]">
          {/* Video Preview */}
          <div className="relative w-full overflow-hidden rounded-3xl border border-white/10">
            <VideoPreview className=" w-full object-cover " />

            {/* Top Gradient */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />

            {/* Bottom Controls */}
            
              {/* Mic + Camera Toggle */}
              <div
              className="
                absolute
                bottom-6
                left-1/2
                flex
                -translate-x-1/2
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                bg-black/45
                px-4
                py-3
                backdrop-blur-xl
              "
            >
              {/* MIC BUTTON */}
              <Button
                size="icon"
                onClick={() => setIsMicOn((prev) => !prev)}
                className={`
                  h-12
                  w-12
                  rounded-full
                  transition-all
                  duration-300
                  cursor-pointer
                  ${
                    isMicOn
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-red-500 hover:bg-red-600'
                  }
                `}
              >
                {isMicOn ? (
                  <AiFillAudio className="size-5 text-white" />
                ) : (
                  <AiOutlineAudioMuted className="size-5 text-white" />
                )}
              </Button>

              {/* CAMERA BUTTON */}
              <Button
                size="icon"
                onClick={() => setIsCameraOn((prev) => !prev)}
                className={`
                  h-12
                  w-12
                  rounded-full
                  transition-all
                  duration-300
                  cursor-pointer
                  ${
                    isCameraOn
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-red-500 hover:bg-red-600'
                  }
                `}
              >
                {isCameraOn ? (
                  <FaVideo className="size-5 text-white" />
                ) : (
                  <FaVideoSlash className="size-5 text-white" />
                )}
              </Button>

              {/* SETTINGS */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  transition-all
                  duration-300
                  hover:bg-white/20
                  cursor-pointer
                "
              >
                <DeviceSettings />
                </div>
                
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-[42%] lg:px-14">
          {/* Small Label */}
          <div className="mb-5 flex items-center gap-2 text-sm text-blue-300">
            <Settings2 className="size-4" />
            <span>Ready to join</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Your Meeting
            <span className="block text-blue-400">Starts Here</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-7 text-gray-300 sm:text-lg">
            Check your camera, microphone, and device settings before entering
            the meeting. Once you're ready, join instantly with a single click.
          </p>

          {/* Join Button */}
          <div className="mt-10">
            {/* <Button
              className="
                h-14
                w-full
                rounded-2xl
                bg-green-500
                text-base
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-green-600
                sm:w-[220px]
              "
              onClick={() => {
                call.join();
                setSetup(true);
              }}
            >
              Join Meeting
            </Button> */}
            {/* JOIN BUTTON */}
          <Button
              className="
            cursor-pointer
              h-14
              w-full
              rounded-2xl
              bg-blue-500
              text-base
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-blue-600
              hover:scale-[1.02]
              sm:w-[230px]
            "
            onClick={() => {
              call.join()
              setSetup(true)
            }}
          >
            Join Meeting
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meeting_SetUp;
