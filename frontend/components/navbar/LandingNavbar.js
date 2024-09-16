'use client'

import useSession from "@/hooks/useSession"
import { SlinkLogoImage } from "@/public/assetsManager"
import Image from "next/image"
import SecondaryButton from "../button/SecondaryButton"
import { MdLogin } from "react-icons/md";
import PrimaryButton from "../button/PrimaryButton"
import { useRouter } from "nextjs-toploader/app"
import { Suspense } from "react"




const LandingNavbar = () => {
  const { loading, loggedIn, logout, user } = useSession()
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

      <Suspense
        fallback={
          <div className=" bg-[#d58720] w-[10rem] h-full " >

          </div>
        }
      >
        {loading ? (
          <div className=" bg-[#0E131E] w-[10rem] h-full " >

          </div>
        ) : loggedIn ? (
          <PrimaryButton text="Dashboard" styles=" text-white text-opacity-[10] " exec={() => router.push('/dashboard')} />
        ) : (
          <div className=" flex gap-[1.5rem] " >
            <SecondaryButton text="Login" styles="phone:flex hidden" icon={<MdLogin />} exec={() => router.push('/login')} />
            <PrimaryButton text="Register" styles=" text-white text-opacity-[10]  " exec={() => router.push('/register')} />
          </div>

        )
        }
      </Suspense>


    </div>
  )
}

export default LandingNavbar
