'use client'

import PrimaryButton from '@/components/button/PrimaryButton'
import ShareLink from '@/components/modals/ShareLink'
import LandingNavbar from '@/components/navbar/LandingNavbar'
import ToggleSwitch from '@/components/toggleSwitch/ToggleSwitch'
import useSession from '@/hooks/useSession'
import { CircleBg, CubesBg, DotBg, Grillbg, HeroLinkList } from '@/public/assetsManager'
import api from '@/utils/axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import { FiLink } from "react-icons/fi";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { toast } from 'react-toastify'
import { Tooltip } from 'react-tooltip'





const LandingPage = () => {
  const [guestSwitchOn, setGuestSwitchOn] = useState(true);
  const { loading, user, loggedIn } = useSession();
  const [shareLinkOpen, setShareLinkOpen] = useState(false);
  const router = useRouter();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortLink, setShortLink] = useState("");

  const handleOriginalUrl = (e) => {
    setOriginalUrl(e.target.value);
  }

  const handleGenerateShortLink = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/api/shorten/url`, { url: originalUrl, guest: !loggedIn }, { withCredentials: true });
      if (res.data?.shortenedUrl) {
        setShortLink(res.data?.shortenedUrl);
        setShareLinkOpen(true);
        setOriginalUrl("")
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    // setShareLinkOpen(true);
  }

  return (

    <div className='relative flex flex-col overflow-clip w-[100%] h-[100vh] bg-[#0B101B]  ' >
      <Image
        src={Grillbg}
        alt='bg'
        className='absolute w-full opacity-[.35]  z-[15] no-select '
      />
      <Image
        src={CubesBg}
        alt='bg'
        className=' absolute w-full opacity-[.55]  z-[5] no-select '
      />
      <Image
        src={CircleBg}
        alt='bg'
        className=' absolute w-full my-auto  z-[5] no-select '
      />
      {/* <Image
        src={DotBg}
        alt='bg'
        className=' absolute w-full opacity-15  z-[3] '
      /> */}
      <ShareLink
        visible={shareLinkOpen}
        onClose={() => setShareLinkOpen(false)}
        focusMode={true}
        url={shortLink}
      />
      <div className=' z-[50] lg:px-[4rem] sm:px-[2rem] px-[1rem]  ' >
        <LandingNavbar />
      </div>

      <div className=' flex flex-col justify-center md:h-[calc(100vh-20rem)] h-[calc(100vh-10rem)]  items-center w-[100%] z-[50]  ' >
        <h2 className='font-[900] sm:text-[3.4rem] phone:text-[2.8rem] text-[2.4rem] text-center hero-heading w-fit font-montserrat ' >Shorten Your Loooong Links :)</h2>
        <p className=' text-[#C9CED6] sm:w-[30rem] w-[90%] text-center phone:text-[1rem] text-[.9rem] ' >Slink is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>

        <form onSubmit={(e) => handleGenerateShortLink(e)} className=' rounded-full mt-[3rem] sm:w-[40rem] md_phone:w-[30rem] w-[95%] sm:h-[4rem] h-[3.4rem] border-2 border-[#353C4A] flex justify-between gap-[.5rem] text-white  items-center bg-[#181E29] sm:pl-[1.5rem] pl-[1rem] sm:pr-[1rem] pr-[.4rem] ' >
          <FiLink className=' text-[#C9CED6] sm:text-[1.4rem] text-[2rem] ' />
          <input type="text" placeholder=' Enter Your Link here ' value={originalUrl} onChange={(e) => handleOriginalUrl(e)} className='w-full h-full px-[.8rem] bg-transparent border-none outline-none text-[#C9CED6] ' />
          <PrimaryButton text='Shorten Now!' type='submit' styles=' text-nowrap ' />
        </form>
        <div className={` ${!loading && !user ? " flex " : "hidden"}  text-[#C9CED6] gap-[.5rem] items-center sm:mt-[.5rem] mt-[2rem] sm:flex-row flex-col `} >
          <p className=' phone:text-[1rem] text-[.9rem] text-center ' >Your are not logged in so link will be stored publicly</p>
          <div className='flex items-center gap-[.3rem] ' >
            <ToggleSwitch switchOn={guestSwitchOn} setSwitchOn={setGuestSwitchOn} disabled={true} label={`Guest Mode ${guestSwitchOn ? "On" : "Off"}`} labelStyle={` text-[#C9CED6]  `} />
            <Tooltip id='guest-mode-tooltip' style={{ width: "15rem" }} />
            <RxQuestionMarkCircled data-tooltip-id="guest-mode-tooltip" data-tooltip-content="Your link will stored publicly and will active for 24 hrs. If you want to use the slink effciently so just login with google " data-tooltip-variant="dark" />
          </div>
        </div>
      </div>

      <Suspense fallback={
        <div className='absolute bottom-0 z-[50] px-[4rem] bg-[#0E131E]    ' >

        </div>
      } >
        <div className='   md:flex hidden z-[50] lg:px-[4rem] mx-auto    ' >
          <Image
            src={HeroLinkList}
            alt='hero-link-list'
            className=' mb-[-12rem]  pointer-events-none select-none  '
          />
        </div>
      </Suspense>

    </div>
  )
}

export default LandingPage
