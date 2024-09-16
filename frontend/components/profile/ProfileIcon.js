'use client'

import useSession from '@/hooks/useSession'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { FaCircleUser } from "react-icons/fa6";
import { PiUserCircleCheckFill, PiUserCircleGearFill, PiUserCircleFill } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from 'nextjs-toploader/app';


const ProfileIcon = () => {
  const { user, loading, logout } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleViewProfile = () => {
    setMenuOpen(false);
    router.push('/profile');
  };


  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    console.log('Logout clicked');
  };
  return (
    <div className='relative flex items-center justify-center w-full '>
      <Image
        src={user?.profilePicture || ""}
        width={100}
        height={100}
        className={` ${!user?.profilePicture ? " hidden " : ""}  mx-auto rounded-full w-[2.5rem] border-[1px] border-[#7a7c80] cursor-pointer`}
        alt='Profile Pic'
        onClick={toggleMenu}
      />
      <PiUserCircleFill onClick={toggleMenu} className={` ${!user?.profilePicture ? "  " : "hidden"} rounded-full text-[2.5rem] text-white primary-button-bg  cursor-pointer`} />
      {/* <h2>Abhay</h2> */}
      {/* Context menu */}
      {menuOpen && (
        <div ref={menuRef} className='absolute top-[3rem] right-0 w-fit bg-gray-900 border-[1px] border-[#353c4abd] rounded-md shadow-lg'>
          <ul className='text-sm text-white '>
            <li
              className='flex items-center px-4 opacity-[.7] py-2 gap-[.5rem] text-nowrap cursor-pointer hover:bg-gray-800'
              onClick={handleViewProfile}
            >
              <PiUserCircleGearFill className=' text-[1.2rem] ' />
              View Profile
            </li>
            <li
              className='px-4 py-2  cursor-pointer opacity-[.7] flex items-center text-nowrap gap-[.5rem] hover:bg-gray-800'
              onClick={handleLogout}
            >
              <LuLogOut className=' text-[1.1rem] ' />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default ProfileIcon
