'use client'

import React, { useEffect, useState } from 'react'
import Modal from '.'
import TextFields from '../input/InputFields/TextFields'
import api from '@/utils/axios';
import { FaLink, FaLinkSlash } from 'react-icons/fa6';
import { MdClose, MdOutlineLinkOff } from 'react-icons/md';
import PrimaryButton from '../button/PrimaryButton';
import DeleteLottieAnimation from '../Animation/DeleteLottieAnimation';
import { toast } from 'react-toastify';

const DeleteLink = ({ visible, onClose = () => { }, callback = () => { }, focusMode = false, urlId = "" }) => {

  const hadleDeleteLink = async () => {
    if (urlId) {
      try {
        const res = await api.delete(`api/shorten/url/${urlId}/delete`, { withCredentials: true })
        toast.success(res?.data?.message)
        onClose()
        callback()
      } catch (error) {
        toast.error(error.response.data.message || error.response.data);
      }
    }
  }


  return (
    <Modal visible={visible} onClose={onClose} callback={callback} focusMode={focusMode} >
      <div className='primary-button-bg flex flex-col justify-center shadow-xl shadow-[pink-500] rounded-md gap-[1rem] items-center w-[28rem] h-[27rem] share-modal' >
        <div onClick={() => onClose()} className='absolute top-[-3rem] right-[-3rem] text-white bg-gray-700 hover:bg-white hover:text-black duration-300 cursor-pointer size-[2.5rem] rounded-full flex justify-center items-center text-[1.2rem] ' >
          <MdClose />

        </div>

        <div className={`bg-[#181E29] w-[calc(100%-.06rem)] relative h-[calc(100%-.1rem)] rounded-md px-[2.5rem] py-[2.5rem] flex flex-col items-center justify-center gap-[2.5rem]`} >

          <DeleteLottieAnimation />
          <div className="  flex flex-col gap-[1rem] w-[100%] mt-[0rem]  ">
            <p className=" font-inter font-[500] text-[.9rem] text-white/75 text-center my-[1rem] ">
              Are you sure want to delete this Links
            </p>
            <button
              onClick={() => hadleDeleteLink()}
              className={` 
              flex gap-[.8rem] justify-center items-center bg-[#DC2626] py-[.6rem] text-white rounded-md mt-[0rem] `}
            >
              {" "}
              {"Delete Link"}

            </button>
            {/* <button className=' rounded-md  px-[1rem] py-[.6rem] bg-[#DC2626] text-white font-inter  ' >Delete</button> */}
            <button
              onClick={() => onClose()}
              className=" rounded-md mt-[.5rem]  py-[.6rem] border-[1px] border-gray-700 hover:bg-white hover:text-black duration-300 text-white/75 "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteLink
