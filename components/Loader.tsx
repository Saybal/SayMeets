import React from 'react'
import Lottie from "lottie-react";
import loader_circle from "@/constants/Loading circles.json";

const Loader = () => {
  return (
      <div className='flex items-center justify-center h-screen w-full'>
          <Lottie
                className='w-10 sm:w-20 md:w-25'
                animationData={loader_circle}
                loop={true}
            />
    </div>
  )
}

export default Loader