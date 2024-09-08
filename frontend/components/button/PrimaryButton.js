import React from 'react'

const PrimaryButton = ({ text = "", styles = "", exec = () => { }, icon, ...props }) => {
  return (
    <button  {...props} onClick={() => exec()} className={`  flex justify-center items-center gap-[.3rem] rounded-full  primary-button-bg px-[1.5rem] py-[.5rem] active:scale-[.9] duration-300   ${styles} `} >
      {text}
      {icon && icon}
    </button>
  )
}

export default PrimaryButton
