import React from "react";

const TextFields = ({ value, setValue, label, placeholder, required, disabled = false, type = "text", name = "" }) => {
  return (
    <div className=" flex flex-col gap-[.5rem] w-[100%] text-textSecondary text-opacity-50  ">
      <label htmlFor={label} className="text-white text-opacity-[.7] " >
        {label}{" "}
        <span className={` ${required ? "text-red-600" : "hidden"} `}>*</span>
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        value={value}
        type={type}
        className=" bg-[#8C8C9A1F] focus:bg-[#5956eb24] text-white text-opacity-60 px-[1rem] py-[.5rem] rounded-md outline-none focus:outline-[#e639b858] font-nunito  "
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextFields;
