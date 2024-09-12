import formatDate from '@/utils/formatDate';
import statusFormatter from '@/utils/StatusFormatter';
import Link from 'next/link';
import React, { useState } from 'react'
import { MdEdit, MdDeleteForever, MdOutlineContentCopy } from "react-icons/md";
import UpdateLinks from '../modals/UpdateLinks';



const UrlTable = ({ urls }) => {
  const [isCopied, setIsCopied] = useState(-1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateUrlId, setUpdateUrlId] = useState(null);
  console.log("url in table", urls)
  const copyToClipboard = (link, index) => {
    navigator.clipboard.writeText(link);
    setIsCopied(index);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(-1);
    }, 2000);
  };


  return (
    <div className="overflow-x-auto">
      <UpdateLinks
        visible={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        callback={() => { }}
        focusMode={true}
        urlId={updateUrlId}
      />
      <table className="min-w-full table-auto -collapse">
        <thead>
          <tr className=" bg-[#181E29] text-[#C9CED6] text-left ">
            <th className="px-4 py-[1rem] font-openSans font-[500] text-[.95rem] rounded-tl-lg  ">Shortened URL</th>
            <th className="px-4 py-[1rem] font-openSans font-[500] text-[.95rem]  ">Original URL</th>
            <th className="px-4 py-[1rem] font-openSans font-[500] text-[.95rem]  ">Visits</th>
            <th className="px-4 py-[1rem] font-openSans font-[500] text-[.95rem]  ">Status</th>
            <th className="px-4 py-[1rem] font-openSans font-[500] text-[.95rem]  ">Created At</th>
            <th className="px-4 py-[1rem] font-openSans font-[500] text-[.95rem] rounded-tr-lg  ">Action</th>
          </tr>
        </thead>
        <tbody className=' bg-[#0C111B] ' >
          {urls.length > 0 ? (
            urls.map((url, index) => (
              <tr key={url._id} className=" text-[#C9CED6] font-openSans text-[.85rem] border-b-[1px] hover:bg-[#181e2756] border-[#c9ced60f]  ">
                <td className="px-4 py-[.9rem] flex justify-between w-[19rem] ">
                  <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/${url.shortenedUrl}`} className="opacity-50 ">
                    {`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/${url.shortenedUrl}`}

                  </Link>
                  <div className='relative flex ' >
                    <div onClick={() => {
                      let copiedUrl = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/${url.shortenedUrl}`;
                      copyToClipboard(copiedUrl, index);
                    }} className=' text-[#d5e3ff67] bg-[#232a37] hover:text-black hover:bg-white active:scale-[.9] cursor-pointer duration-300  rounded-full flex size-[1.9rem] justify-center items-center ' >
                      <MdOutlineContentCopy />
                    </div>
                    {isCopied == index && (
                      <div className="absolute top-[-1.3rem] left-[-.5rem] text-[#aeb0b4] text-[.7rem]  ">
                        Copied!
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-[.9rem] ">
                  <Link href={url.originalUrl} className="opacity-50">
                    {url.originalUrl}
                  </Link>
                </td>

                <td className="px-4 py-[.9rem] opacity-50  ">{url.totalVisitCount}</td>
                <td className={`px-4  `}>
                  {statusFormatter(url.status)}
                </td>
                <td className={`px-4 py-[.9rem] opacity-50   `}>
                  {formatDate(url.createdAt)}
                </td>
                <td className="px-4 py-[.9rem] text-center flex gap-[.5rem] ">

                  <button
                    onClick={() => {
                      setUpdateUrlId(url._id);
                      setShowUpdateModal(true);
                    }}
                    className=" text-[#d5e3ff67] bg-[#232a37]  rounded-full flex size-[1.9rem] justify-center items-center  "
                  >
                    <MdEdit className=" text-[1rem] " />
                  </button>
                  <button

                    className=" text-[#FD001EA8] rounded-full fir-delete-bg  flex size-[1.9rem] justify-center items-center  "
                  >
                    <MdDeleteForever className=" text-[1.02rem] " />
                  </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-[.9rem] text-center">No URLs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable
