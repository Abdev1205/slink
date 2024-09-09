'use client'

import TextFields from '@/components/input/InputFields/TextFields';
import useSession from '@/hooks/useSession';
import Image from 'next/image';
import React, { useState } from 'react'
import { LuLogOut } from 'react-icons/lu';
import { FaUser } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import formatDate from '@/utils/formatDate';
import { PiUserCircleFill } from 'react-icons/pi';
import { RiShieldUserFill } from "react-icons/ri";





const ProfilePage = () => {
  // State management for profile fields
  const { user, logout } = useSession()

  return (
    <div className='flex items-center justify-center h-[calc(100vh-5rem)] ' >


      <div className=' relative flex flex-col   justify-between  bg-[#181E29]   border-[1px] border-[#353C4A] rounded-md px-[2.5rem] pt-[2.5rem] pb-[1.5rem] text-textSecondary ' >

        <div className='relative flex items-center justify-between mt-[-2.5rem] ' >
          <Image
            src={user?.profilePicture}
            width={100}
            height={100}
            className={` ${!user?.profilePicture ? " hidden " : ""} absolute mx-auto rounded-full w-[8rem] border-pink-900 border-[2px] `}
            alt='Profile Pic'
          />
          <PiUserCircleFill className={` ${!user?.profilePicture ? "  " : "hidden"} absolute primary-button-bg overflow-clip mx-auto rounded-full text-[6rem]  text-white  `} />

          <button onClick={logout} className=' absolute right-[-2rem] top-[1rem] active:scale-95 duration-300 bg-[#e2eaf8] hover:bg-opacity-100 bg-opacity-55 text-black  flex justify-center items-center gap-[.2rem] px-[.8rem] py-[.6rem] rounded-full font-nunito font-[500] text-[.7rem]    mx-auto ' >
            <LuLogOut className=' text-[.7rem] ' />
            Log Out
          </button>

        </div>
        <div className=' relative flex flex-col  mt-[5rem] gap-[1rem] mx-auto text-white ' >
          <div className='mx-auto flex flex-col gap-[1rem] ' >
            <div className=' flex items-center gap-[1rem] opacity-65 ' >
              <div className='flex items-center gap-[.5rem] ' >
                <FaUser />
                <div>Name</div>
                <div>:</div>
              </div>
              <h2 >{user?.name}</h2>
            </div>
            <div className=' flex items-center gap-[1rem] opacity-65 ' >
              <div className='flex items-center gap-[.5rem] ' >
                <MdMail />
                <div>Email</div>
                <div>:</div>
              </div>
              <h2 >{user?.email}</h2>
            </div>
            <div className=' flex items-center gap-[.5rem] opacity-65 ' >
              <div className='flex items-center gap-[.5rem] ' >
                <MdCalendarMonth />
              </div>
              <h2 >{"Joined on " + formatDate(user?.joinedAt)}</h2>
            </div>
          </div>



        </div>

      </div>
    </div>
  );
};

export default ProfilePage
