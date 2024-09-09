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


const DashboardNavbar = () => {
  const router = useRouter();
  return (
    <div className=" flex w-[100%] h-[4.5rem]  justify-between items-center " >

      <div onClick={() => router.push('/')} className="flex cursor-pointer w-fit " >
        <Image
          src={SlinkLogoImage}
          alt="slink-logo"
          className=" w-[6rem]   "
        />

      </div>

      <div className=' flex flex-col justify-center  items-center  z-[50]  ' >

        <form className=' rounded-full  w-[40rem] h-[3.2rem] border-2 border-[#353C4A] flex justify-between gap-[.5rem] text-white  items-center bg-[#181E29] pl-[1.5rem] pr-[.3rem] ' >
          <FiLink className=' text-[#C9CED6] text-[1.4rem] ' />
          <input type="text" placeholder=' Enter Your Link here ' className='w-full h-full px-[.8rem] bg-transparent border-none outline-none text-[#C9CED6] ' />
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
