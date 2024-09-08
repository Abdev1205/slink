import React from 'react';

const ToggleSwitch = ({ switchOn = true, setSwitchOn = () => { }, label = "Switch", ...props }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={switchOn}
        onChange={() => setSwitchOn(!switchOn)}
        className="sr-only peer"
      />
      <div
        className={`w-9 h-5 rounded-full flex items-center transition-colors duration-300 ease-in-out ${switchOn ? 'bg-gradient-to-r from-[#144EE3] to-[#F42A8B]' : 'bg-gray-200'
          }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${switchOn ? 'translate-x-[1.1rem] ' : 'translate-x-0'
            }`}
        />
      </div>
      <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">{label}</span>
    </label>
  );
};

export default ToggleSwitch;
