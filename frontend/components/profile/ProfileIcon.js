'use client'

import useSession from '@/hooks/useSession'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const ProfileIcon = () => {
  const { user, loading, logout } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

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
        src={user?.profilePicture}
        width={100}
        height={100}
        className='absolute mx-auto rounded-full w-[2.5rem] border-[1px] border-[#7a7c80] cursor-pointer'
        alt='Profile Pic'
        onClick={toggleMenu} // Toggle menu on image click
      />
      {/* <h2>Abhay</h2> */}
      {/* Context menu */}
      {menuOpen && (
        <div ref={menuRef} className='absolute top-[3rem] right-0 w-[10rem] bg-gray-900 border-[1px] border-[#353c4abd] rounded-md shadow-lg'>
          <ul className='text-sm text-white '>
            <li
              className='px-4 py-2 text-center cursor-pointer hover:bg-gray-800'
              onClick={handleViewProfile}
            >
              View Profile
            </li>
            <li
              className='px-4 py-2 text-center cursor-pointer hover:bg-gray-800'
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default ProfileIcon
