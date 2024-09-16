'use client'

import useSession from "@/hooks/useSession"
import { SlinkLogoImage } from "@/public/assetsManager"
import Image from "next/image"
import SecondaryButton from "../button/SecondaryButton"
import { MdLogin } from "react-icons/md";
import PrimaryButton from "../button/PrimaryButton"
import { useRouter } from "nextjs-toploader/app"
import { FiLink } from "react-icons/fi"
import ProfileIcon from "../profile/ProfileIcon"
import { useState } from "react"
import ShareLink from "../modals/ShareLink"
import api from "@/utils/axios"


const DashboardNavbar = () => {
  const [shareLinkOpen, setShareLinkOpen] = useState(false);
  const router = useRouter();
  const { loading, user, loggedIn } = useSession();
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
    <div className=" flex w-[100%] h-[6rem]  justify-between items-center " >
      <ShareLink
        visible={shareLinkOpen}
        onClose={() => setShareLinkOpen(false)}
        focusMode={true}
        url={shortLink}
      />
      <div onClick={() => router.push('/')} className="flex cursor-pointer w-fit " >
        <Image
          src={SlinkLogoImage}
          alt="slink-logo"
          className=" w-[6rem]   "
        />

      </div>

      <div className=' flex flex-col justify-center  items-center  z-[50]  ' >

        <form onSubmit={(e) => handleGenerateShortLink(e)} className=' rounded-full  lg:w-[40rem] w-28rem h-[3.2rem] border-2 border-[#353C4A] sm:flex hidden justify-between gap-[.5rem] text-white  items-center bg-[#181E29] lg:pl-[1.5rem] pl-[.8rem] pr-[.3rem] ' >
          <FiLink className=' text-[#C9CED6] lg:text-[1.4rem] text-[2rem] ' />
          <input type="text" placeholder=' Enter Your Link here ' value={originalUrl} onChange={(e) => handleOriginalUrl(e)} className='w-full h-full px-[.8rem] bg-transparent border-none outline-none text-[#C9CED6] ' />
          <PrimaryButton text='Shorten Now!' type='submit' styles=' text-nowrap py-[.3rem]  ' />
        </form>
      </div>

      <div className=" flex w-[5rem] gap-[1.5rem] relative items-center " >
        <ProfileIcon />
      </div>

    </div>
  )
}

export default DashboardNavbar
