import React from 'react';
import checkIcon from '../assets/자동 로그인.svg';
import checkedIcon from '../assets/자동 로그인 완료.svg';

export default function CheckBox({ checked, onChange }) {
  return (
    <label className="flex items-center cursor-pointer select-none gap-2">
      <img
        src={checked ? checkedIcon : checkIcon}
        alt="자동 로그인 상태"
        className="w-[117px] h-[44px]"
      />
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
}

