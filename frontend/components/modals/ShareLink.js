import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation.js';
import Link from 'next/link';
import Image from 'next/image';
import Modal from './index.js';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { WhatsappImage, FacebookImage, InstagramImage, TwitterImage, LinkedinImage } from '@/public/assetsManager.js';
import { MdClose, MdOutlineContentCopy } from "react-icons/md";


const ShareLink = ({ visible, onClose = () => { }, callback = () => { }, focusMode = false, url = "" }) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [shareLink, setShareLink] = useState(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/${url}`)

  // Update shareLink whenever url or process.env.NEXT_PUBLIC_FRONTEND_BASE_URL changes
  useEffect(() => {
    setShareLink(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/${url}`);
  }, [url]);

  const copyToClipboard = () => {
    setShareLink(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/${url}`)
    navigator.clipboard.writeText(shareLink);
    setIsCopied(true);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Modal visible={visible} onClose={onClose} callback={callback} focusMode={focusMode}
    >
      <div className=' primary-button-bg flex flex-col justify-center shadow-xl shadow-[pink-500] rounded-md gap-[1rem] items-center min-w-[10rem] h-[16rem] share-modal ' >
        <div onClick={() => onClose()} className='absolute top-[-3rem] right-[-3rem] text-white bg-gray-700 hover:bg-white hover:text-black duration-300 cursor-pointer size-[2.5rem] rounded-full flex justify-center items-center text-[1.2rem] ' >
          <MdClose />

        </div>
        <div className=' bg-[#181E29] w-[calc(100%-.06rem)]   h-[calc(100%-.1rem)] rounded-md px-[2.5rem] py-[2.5rem] flex flex-col items-center justify-center gap-[2.5rem] ' >
          <div className=' relative  flex justify-between h-[3rem] w-[100%] px-[.3rem] ' >
            <div className=' bg-[#8C8C9A1F] flex items-center  text-white opacity-55 rounded-full  px-[1rem] h-full w-full pr-[6rem] ' >
              {shareLink}
            </div>
            <button onClick={copyToClipboard} className=' active:scale-95 duration-300 primary-button-bg text-white absolute right-[4px] flex justify-center items-center w-[3rem] h-[100%] rounded-full  ' >
              <MdOutlineContentCopy className='w-[1.2rem] h-[1.5rem] text-white ' />
            </button>
            <div className='absolute text-white text-opacity-[.7] right-[1rem] top-[3.5rem] text-[.7rem] ' >
              {isCopied ? "Copied" : "Copy"}
            </div>
          </div>
          <div className=' flex flex-col text-white opacity-70 justify-center items-center gap-[.6rem] ' >
            <h2>Share to your favourite apps</h2>
            <div className=' flex justify-center items-center  gap-[1rem]  ' >
              <FacebookShareButton
                url={shareLink}
                quote="Checkout Slink it is Amazing tool to shorten Url"
                hashtag="#slink"

              >
                <Image
                  src={FacebookImage}
                  width={200}
                  height={200}
                  alt='social'
                  className=' w-[2rem] hover:scale-[1.1] duration-300 '
                />
              </FacebookShareButton>

              <WhatsappShareButton
                url={shareLink}
                title="Checkout Slink it is Amazing tool to shorten Url"
                separator=" "
                hashtag="#slink"
              >
                <Image
                  src={WhatsappImage}
                  width={200}
                  height={200}
                  alt='social'
                  className=' w-[2rem] hover:scale-[1.1] duration-300 '
                />
              </WhatsappShareButton>

              <LinkedinShareButton
                url={shareLink}
                title="Checkout Slink it is Amazing tool to shorten Url"
                hashtag="#slink"
              >
                <Image
                  src={LinkedinImage}
                  width={200}
                  height={200}
                  alt='social'
                  className=' w-[2rem] hover:scale-[1.1] duration-300 '
                />
              </LinkedinShareButton>

              <TwitterShareButton
                url={shareLink}
                title="Checkout Slink it is Amazing tool to shorten Url"
                hashtags={['#slink']}
              >
                <Image
                  src={TwitterImage}
                  width={200}
                  height={200}
                  alt='social'
                  className=' w-[2rem] hover:scale-[1.1] duration-300 '
                />
              </TwitterShareButton>


            </div>
          </div>
        </div>
      </div>
    </Modal>


  )
}

export default ShareLink
