import React from 'react';
import logo from '../assets/logo.svg';

export default function Logo() {
  return (
    <div className="flex flex-row items-center justify-center gap-2 my-6">
      <img src={logo} alt="ReturnZone Logo" className="h-12" />
    </div>
  );
} 