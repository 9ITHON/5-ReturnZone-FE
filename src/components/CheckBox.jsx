import React from 'react';

export default function CheckBox({ label, checked, onChange }) {
  return (
    <label className="flex items-center text-sm cursor-pointer select-none">
      <input
        type="checkbox"
        className="mr-2 accent-black"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

