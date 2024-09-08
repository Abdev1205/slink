'use client'

import PrimaryButton from '@/components/button/PrimaryButton'
import LandingNavbar from '@/components/navbar/LandingNavbar'
import ToggleSwitch from '@/components/toggleSwitch/ToggleSwitch'
import useSession from '@/hooks/useSession'
import { CircleBg, CubesBg, DotBg, Grillbg, HeroLinkList } from '@/public/assetsManager'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import { FiLink } from "react-icons/fi";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Tooltip } from 'react-tooltip'




const LandingPage = () => {
  const [guestSwitchOn, setGuestSwitchOn] = useState(true);
  const router = useRouter();

  return (

    <div className='relative flex flex-col overflow-clip w-[100%] h-[100vh] bg-[#0B101B]  ' >
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
      {/* <Image
        src={DotBg}
        alt='bg'
        className=' absolute w-full opacity-15  z-[3] '
      /> */}
      <div className=' z-[50] px-[4rem]  ' >
        <LandingNavbar />
      </div>

      <div className=' flex flex-col justify-center h-[calc(100vh-20rem)]  items-center w-[100%] z-[50]  ' >
        <h2 className='font-[900] text-[3.4rem]  hero-heading w-fit font-montserrat ' >Shorten Your Loooong Links :)</h2>
        <p className=' text-[#C9CED6] w-[30rem] text-center ' >Slink is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>

        <form className=' rounded-full mt-[3rem] w-[40rem] h-[4rem] border-2 border-[#353C4A] flex justify-between gap-[.5rem] text-white  items-center bg-[#181E29] pl-[1.5rem] pr-[1rem] ' >
          <FiLink className=' text-[#C9CED6] text-[1.4rem] ' />
          <input type="text" placeholder=' Enter Your Link here ' className='w-full h-full px-[.8rem] bg-transparent border-none outline-none text-[#C9CED6] ' />
          <PrimaryButton text='Shorten Now!' type='submit' styles=' text-nowrap ' />
        </form>
        <div className='flex text-[#C9CED6] gap-[.5rem] items-center mt-[.5rem]  ' >
          <p>Your are not logged in so link will be stored publicly</p>
          <ToggleSwitch switchOn={guestSwitchOn} setSwitchOn={setGuestSwitchOn} label={`Guest Mode ${guestSwitchOn ? "On" : "Off"}`} />
          <Tooltip id='guest-mode-tooltip' style={{ width: "15rem" }} />
          <RxQuestionMarkCircled data-tooltip-id="guest-mode-tooltip" data-tooltip-content="Your link will stored publicly and will active for 24 hrs. If you want to use the slink effciently so just login with google " data-tooltip-variant="dark" />
        </div>
      </div>

      <Suspense fallback={
        <div className='absolute bottom-0 z-[50] px-[4rem] bg-[#0E131E]    ' >

        </div>
      } >
        <div className=' absolute bottom-0 z-[50] px-[4rem]    ' >
          <Image
            src={HeroLinkList}
            alt='hero-link-list'
            className=' mb-[-12rem] no-select '
          />
        </div>
      </Suspense>

    </div>
  )
}

export default LandingPage
