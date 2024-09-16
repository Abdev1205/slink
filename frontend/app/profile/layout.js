import LandingNavbar from '@/components/navbar/LandingNavbar'
import { CircleBg, CubesBg, Grillbg } from '@/public/assetsManager'
import React from 'react'
import Image from 'next/image'
import AuthLayer from '@/Layers/AuthLayer'
import DashboardNavbar from '@/components/navbar/DashboardNavbar'

const ProfileLayout = ({ children }) => {
  return (
    <AuthLayer>
      <div className='relative flex flex-col overflow-clip w-[100%] h-[100vh] bg-[#0B101B] ' >
        <Image
          src={Grillbg}
          alt='bg'
          className='absolute w-full opacity-[.35] z-[15] no-select '
        />
        <Image
          src={CubesBg}
          alt='bg'
          className=' absolute w-full opacity-[.55]  z-[5] no-select '
        />
        <Image
          src={CircleBg}
          alt='bg'
          className=' absolute w-full  z-[5] no-select '
        />
        <div className=' z-[55] lg:px-[4rem] sm:px-[2rem] px-[1rem]  ' >
          <DashboardNavbar />
        </div>
        <div className=' z-[50] ' >

          {children}
        </div>
      </div>
    </AuthLayer>
  )
}

export default ProfileLayout
