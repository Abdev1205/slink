'use client'

import LandingNavbar from '@/components/navbar/LandingNavbar'
import React from 'react'
import { CircleBg, CubesBg, DotBg, Grillbg, HeroLinkList } from '@/public/assetsManager'
import Image from 'next/image'

const LoginLayout = ({ children }) => {
  return (
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
      <div className=' z-[55] px-[4rem]  ' >
        <LandingNavbar />
      </div>
      <div className=' z-[50] ' >

        {children}
      </div>
    </div>
  )
}

export default LoginLayout
