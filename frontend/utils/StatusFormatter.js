import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { MdOutlineLinkOff } from "react-icons/md";



const statusFormatter = (status = "") => {
  status = status.toLowerCase();
  if (status == "active") {
    return (
      <div className="flex max-w-[5.5rem] gap-[.3rem] justify-between items-center capitalize text-green-500 " >
        {status}
        <div className=" size-[1.8rem] flex justify-center items-center  rounded-full bg-[#1eb03648] "  >
          <FaLink className=" text-[1rem]  " />
        </div>
      </div>
    )
  }
  else if (status == "inactive") {
    return (
      <div className="flex  max-w-[5.5rem] gap-[.3rem] justify-between items-center capitalize text-[#B0901E] " >
        {status}
        <div className=" size-[1.8rem] flex justify-center items-center  rounded-full bg-[#b0901e61] "  >
          <MdOutlineLinkOff className=" text-[1rem]  " />
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="flex max-w-[5.5rem] gap-[.3rem] justify-between items-center capitalize text-red-500 " >
        {status}
        <div className=" size-[1.8rem] flex justify-center items-center  rounded-full bg-[#ff443a48] "  >
          <FaLinkSlash className=" text-[1rem]  " />
        </div>
      </div>
    )
  }
}

export default statusFormatter;