import React, { useEffect, useState } from 'react'
import Modal from '.'
import TextFields from '../input/InputFields/TextFields'
import api from '@/utils/axios';
import { FaLink, FaLinkSlash } from 'react-icons/fa6';
import { MdClose, MdOutlineLinkOff } from 'react-icons/md';
import PrimaryButton from '../button/PrimaryButton';


const UpdateLinks = ({ visible, onClose = () => { }, callback = () => { }, focusMode = false, urlId = "" }) => {
  const [urlData, setUrlData] = useState(null)
  const [originalUrl, setOriginalUrl] = useState();
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  console.log("urlId", urlId);
  const getUrlData = async () => {
    try {
      const res = await api.get(`/api/shorten/url/${urlId}`, { withCredentials: true });
      console.log("url data in modal ", res.data);
      setUrlData(res.data);
      setOriginalUrl(res.data.originalUrl);
      setShortUrl(res.data.shortenedUrl);
      setStatus(res.data.status);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (urlId) {
      getUrlData();
    }
  }, [urlId]);


  return (
    <Modal visible={visible} onClose={onClose} callback={callback} focusMode={focusMode} >
      <div className='primary-button-bg flex flex-col justify-center shadow-xl shadow-[pink-500] rounded-md gap-[1rem] items-center w-[28rem] h-[28rem] share-modal' >
        <div onClick={() => onClose()} className='absolute top-[-3rem] right-[-3rem] text-white bg-gray-700 hover:bg-white hover:text-black duration-300 cursor-pointer size-[2.5rem] rounded-full flex justify-center items-center text-[1.2rem] ' >
          <MdClose />

        </div>
        <div className={`bg-[#181E29] w-[calc(100%-.06rem)]   h-[calc(100%-.1rem)] rounded-md px-[2.5rem] py-[2.5rem] flex flex-col items-center justify-center gap-[2.5rem]`} >
          <TextFields
            value={originalUrl}
            label='Original URL'
            placeholder='Original URL'
            required={true}
            type='text'
          />
          <TextFields
            value={shortUrl}
            label='Shortened URL'
            placeholder='Shortened URL'
            required={true}
            type='text'
          />
          <div className=' flex gap-[1rem] w-full ' >

            <div onClick={() => setStatus('active')} className={` ${status == 'active' ? " bg-[#1eb03648]  border-green-500 scale-[1.05] " : "active-status border-transparent  "} duration-300 border-[1px] flex relative gap-[.5rem]   px-[.8rem] py-[.2rem] justify-between items-center capitalize text-green-500 rounded-md cursor-pointer `}>
              {'Active'}
              <div className="flex items-center justify-center "  >
                <FaLink className=" text-[1rem]  " />
              </div>
            </div>

            <div onClick={() => setStatus('inactive')} className={` ${status == 'inactive' ? " bg-[#b0901e61] scale-[1.05]  border-[#cca722] " : "inactive-status border-transparent  "} duration-300 border-[1px] flex relative gap-[.5rem] text-[#B0901E]   px-[.8rem] py-[.2rem] justify-between items-center capitalize  rounded-md cursor-pointer `}>
              {'Inactive'}
              <div className="flex items-center justify-center "  >
                <MdOutlineLinkOff className=" text-[1rem]  " />
              </div>
            </div>

            <div onClick={() => setStatus('expired')} className={` ${status == 'expired' ? " bg-[#f24e4532]  border-red-500 scale-[1.05]   " : "expired-status border-transparent  "} duration-300 border-[1px] flex relative gap-[.5rem] text-red-600  px-[.8rem] py-[.2rem] justify-between items-center capitalize  rounded-md cursor-pointer `}>
              {'Expired'}
              <div className="flex items-center justify-center "  >
                <FaLinkSlash className=" text-[1rem]  " />
              </div>
            </div>

          </div>

          <div className='flex justify-center w-full ' >

            <PrimaryButton text='Update Url' exec={() => { }} styles={` w-[10rem] rounded-full  text-white/60 roun   `} />
          </div>

        </div>

      </div>
    </Modal>
  )
}

export default UpdateLinks
