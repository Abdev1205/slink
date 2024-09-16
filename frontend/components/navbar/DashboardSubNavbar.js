'use client'

import Link from 'next/link'
import React from 'react'
import { ActiveNarbarImage } from '@/public/assetsManager'
import Image from 'next/image'
import { MdHistory } from "react-icons/md";
import { IoStatsChartSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';



const linkData = [
  { title: 'History', href: '/dashboard', icon: <MdHistory /> },
  { title: 'Stats', href: '/dashboard/stats', icon: <IoStatsChartSharp /> },
]

const DashboardSubNavbar = () => {
  const pathname = usePathname();
  return (
    <div className={` flex relative justify-center gap-[2rem] w-full h-[3.5rem] bg-[#181E29]   `} >
      {linkData.map((link, index) => (
        <Link href={link.href} key={index} className={` ${pathname == link.href ? " border-b-blue-700 " : "  "} flex gap-[.3rem] w-[6rem] border-[2px] border-transparent justify-center items-center  text-white/70  hover:text-white/100 transition-all duration-300 mt-[.7rem]   `} >
          <div className={` ${pathname == link.href ? " flex " : " hidden "} absolute top-0 `} >
            <Image
              src={ActiveNarbarImage}
              alt='active-navbar-image'
              className=' w-[6rem] '
            />
          </div>
          {link.icon}
          {link.title}
        </Link>
      ))}
    </div>
  )
}

export default DashboardSubNavbar
