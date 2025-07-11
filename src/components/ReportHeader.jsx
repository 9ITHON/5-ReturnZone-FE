import React from "react";

const ReportHeader = () => (
  <div className="flex justify-between items-center w-[390px] overflow-hidden px-6 py-1.5 bg-white">
    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 pr-3 py-2.5">
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
          preserveAspectRatio="none"
        >
          <path
            d="M16.0107 19.9785L8.01074 11.9785L16.0107 3.97852"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <p className="flex-grow-0 flex-shrink-0 text-[22px] font-semibold text-left text-[#111]">
        유저1
      </p>
    </div>
    <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
        preserveAspectRatio="none"
      >
        <path
          d="M12 16.75C12.4142 16.75 12.75 17.0858 12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5C11.25 17.0858 11.5858 16.75 12 16.75ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25ZM12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5C12.75 6.91421 12.4142 7.25 12 7.25C11.5858 7.25 11.25 6.91421 11.25 6.5C11.25 6.08579 11.5858 5.75 12 5.75Z"
          stroke="#111111"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  </div>
);

export default ReportHeader; 