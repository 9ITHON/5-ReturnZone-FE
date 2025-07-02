import React from 'react';

export default function InputField({ label, placeholder, value, onChange, type = 'text', icon: Icon }) {
  return (
    <div className="mb-2">
      <label className="text-base font-semibold mb-2 block">{label}</label>
      <div className="flex items-center border border-[#D9D9D9] rounded-md px-3 py-3 focus-within:ring-2 focus-within:ring-[#B197FC]">
        {Icon && <Icon className="w-5 h-5 mr-2 text-[#A3A3A3]" />}
        <input
          type={type}
          className="flex-1 outline-none text-base bg-transparent"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
} 