import React from "react";

const OPTIONS = [
  { key: "all", label: "전체" },
  { key: "lost", label: "분실" },
  { key: "found", label: "주인" },
];

const AllFilterModal = ({ open, selected, onSelect, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[390px] bg-white rounded-t-xl pb-6 pt-2 px-0 animate-slideup"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full flex flex-col divide-y divide-gray-100">
          {OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`w-full text-left px-6 py-4 text-[16px] font-medium transition rounded-none focus:outline-none ${
                selected === opt.key
                  ? "font-bold text-blue-600 bg-blue-50"
                  : "text-[#111] bg-white"
              }`}
              onClick={() => onSelect(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFilterModal; 