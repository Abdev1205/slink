import formatDate from '@/utils/formatDate';
import statusFormatter from '@/utils/StatusFormatter';
import Link from 'next/link'
import React, { useState } from 'react'
import { MdDeleteForever, MdEdit, MdOutlineContentCopy, MdVisibility } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import GradientLinkIcon from '../CustomIcons/GradientLinkIcon';





const UrlCards = ({ data, setUpdateUrlId = () => { }, setShowUpdateModal = () => { }, setDeleteUrlId = () => { }, setShowDeleteModal = () => { } }) => {
  const [isCopied, setIsCopied] = useState(-1);
  const copyToClipboard = (link, index) => {
    navigator.clipboard.writeText(link);
    setIsCopied(index);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(-1);
    }, 2000);
  };
  return (
    <div className=' flex flex-col gap-[.5rem] justify-between border-2 border-[#181E29] bg-[#0e131d] p-[1.2rem] rounded-md md_phone:min-w-[20rem] lg_tab:w-[22rem] lg:w-[25rem] md_phone:w-[20rem] w-[100%]   ' >
      <div className='flex items-center justify-between gap-[.4rem] mx-[.3rem] ' >
        <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/redirect/${data.shortenedUrl}`} className="flex gap-[.3rem] items-center text-white/50 hover:underline underline-offset-3 decoration-pink-500  min-w-[10rem] ">
          <GradientLinkIcon className=" w-[1rem] " />
          <span className='underline hero-heading underline-offset-1 line-clamp-1 ' >{`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/${data.shortenedUrl}`}</span>
        </Link>

        <div className='relative flex ' >
          <div onClick={() => {
            let copiedUrl = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/redirect/${data.shortenedUrl}`;
            copyToClipboard(copiedUrl, data._id);
          }} className=' text-[#d5e3ff67] bg-[#232a37] hover:text-black hover:bg-white active:scale-[.9] cursor-pointer duration-300  rounded-full flex size-[1.9rem] justify-center items-center ' >
            <MdOutlineContentCopy />
          </div>
          {isCopied == data._id && (
            <div className="absolute top-[-1.3rem] left-[-.5rem] text-[#aeb0b4] text-[.7rem]  ">
              Copied!
            </div>
          )}
        </div>

      </div>
      <div className='flex items-center justify-between mx-[.3rem] ' >
        <Link href={`${data.originalUrl}`} className="flex gap-[.3rem] items-center text-white/25 hover:underline underline-offset-3 min-w-[10rem]  ">
          <LuExternalLink className="" />
          <span className=' line-clamp-1' >{`${data.originalUrl}`}</span>
        </Link>

        <div className='relative flex ' >
          <div onClick={() => {
            let copiedUrl = `${data.originalUrl}`;
            copyToClipboard(copiedUrl, data._id);
          }} className=' text-[#d5e3ff67] bg-[#232a37] hover:text-black hover:bg-white active:scale-[.9] cursor-pointer duration-300  rounded-full flex size-[1.9rem] justify-center items-center ' >
            <MdOutlineContentCopy />
          </div>
          {isCopied == data._id && (
            <div className="absolute top-[-1.3rem] left-[-.5rem] text-[#aeb0b4] text-[.7rem]  ">
              Copied!
            </div>
          )}
        </div>

      </div>

      <div className='flex items-center justify-between px-[.3rem] my-[.4rem] ' >
        <div className='flex items-center text-white/25 gap-[.3rem]' >
          <MdVisibility />
          <h2>{data.totalVisitCount}</h2>

        </div>
        <div className='flex items-center text-white/25 text-[.9rem] gap-[.3rem]' >
          <MdCalendarMonth />
          <h2>{formatDate(data.createdAt)}</h2>

        </div>

      </div>


      <div className='flex justify-between border-t-[1px] px-[.3rem] border-gray-800  pt-[1rem] ' >

        <div>
          {statusFormatter(data.status)}
        </div>

        <div className='flex gap-[.4rem] ' >
          <button
            onClick={() => {
              setUpdateUrlId(data._id);
              setShowUpdateModal(true);
            }}
            className=" text-[#d5e3ff67] bg-[#232a37]  rounded-full flex size-[1.9rem] justify-center items-center  "
          >
            <MdEdit className=" text-[1rem] " />
          </button>
          <button
            onClick={() => {
              setDeleteUrlId(data._id);
              setShowDeleteModal(true);
            }}
            className=" text-[#FD001EA8] rounded-full fir-delete-bg  flex size-[1.9rem] justify-center items-center  "
          >
            <MdDeleteForever className=" text-[1.02rem] " />
          </button>
        </div>
      </div>


    </div>
  )
}

export default UrlCards
