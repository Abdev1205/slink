import React from 'react'

const SecondaryButton = ({ text = "", styles = "", exec = () => { }, icon, ...props }) => {
  return (
    <button {...props} onClick={() => exec()} className={`  bg-[#181E29] text-white flex justify-center items-center gap-[.3rem] border-[1px] border-[#353C4A] active:scale-[.9] duration-300 rounded-full shadow-md px-[1.5rem] py-[.5rem]  ${styles} `} >
      {text}
      {icon && icon}
    </button>
  )
}

export default SecondaryButton;