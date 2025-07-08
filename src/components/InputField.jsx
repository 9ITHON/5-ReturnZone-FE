import React from 'react';

export default function InputField({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = 'text', 
  icon: Icon, 
  error = false, 
  disabled = false 
}) {
  return (
    <div className="mb-2">
      <label className="text-base font-semibold mb-2 block">{label}</label>
      <div className={`flex items-center border rounded-md px-3 py-3 focus-within:ring-2 ${
        error 
          ? 'border-red-500 focus-within:ring-red-500' 
          : 'border-[#D9D9D9] focus-within:ring-[#B197FC]'
      } ${disabled ? 'bg-gray-100' : ''}`}>
        {Icon && <Icon className={`w-5 h-5 mr-2 ${disabled ? 'text-gray-400' : 'text-[#A3A3A3]'}`} />}
        <input
          type={type}
          className={`flex-1 outline-none text-base bg-transparent ${
            disabled ? 'cursor-not-allowed text-gray-500' : ''
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
} 