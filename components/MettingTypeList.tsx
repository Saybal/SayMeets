import React from 'react'
import { BsFillRecordCircleFill } from 'react-icons/bs'
import { FaCalendarPlus } from 'react-icons/fa'
import { FaPlus, FaUserPlus } from 'react-icons/fa6'

const MettingTypeList = () => {
  return (
      <section className='flex items-center justify-center gap-6'>
        <div className='flex flex-col items-center gap-2 cursor:pointer'>
          <div className='w-16 h-16 rounded-xl bg-[#FF8C00] flex items-center justify-center text-white text-2xl md:text-3xl font-bold'><FaPlus /></div>
              <span className='text-center text-sm sm:text-lg'>Instant Meeting</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor:pointer'>
              <div className='w-16 h-16 rounded-xl bg-[#568203] flex items-center justify-center text-white text-2xl md:text-3xl font-bold'><FaCalendarPlus /></div>
              <span className='text-center text-sm sm:text-lg'>Schedule Meeting</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor:pointer'>
              <div className='w-16 h-16 rounded-xl bg-[#0D98BA] flex items-center justify-center text-white text-2xl md:text-3xl font-bold'><FaUserPlus /></div>
              <span className='text-center text-sm sm:text-lg'>Join Meeting</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor:pointer'>
              <div className='w-16 h-16 rounded-xl bg-[#00CCFF] flex items-center justify-center text-white text-2xl md:text-3xl font-bold'><BsFillRecordCircleFill /></div>
              <span className='text-center text-sm sm:text-lg'>View Records</span>
        </div>
    </section>
  )
}

export default MettingTypeList