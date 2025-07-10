import React from 'react';

const categories = [
  { label: '전자기기', icon: (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-11 h-11 relative" preserveAspectRatio="none">
      <path d="M19 31L20.6667 27H23.3333L25 31H19Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M13 16C13 14.3431 14.3431 13 16 13H28C29.6569 13 31 14.3431 31 16V24C31 25.6569 29.6569 27 28 27H16C14.3431 27 13 25.6569 13 24V16Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ) },
  { label: '지갑', icon: (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-11 h-11 relative" preserveAspectRatio="none">
      <path d="M21 22C21 23.6569 19.6569 25 18 25L13 25L13 19L18 19C19.6569 19 21 20.3431 21 22Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M13 17C13 15.3431 14.3431 14 16 14L28 14C29.6569 14 31 15.3431 31 17L31 27C31 28.6569 29.6569 30 28 30H16C14.3431 30 13 28.6569 13 27L13 17Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ) },
  { label: '가방', icon: (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-11 h-11 relative" preserveAspectRatio="none">
      <path d="M19 19.5C19.2761 19.5 19.5 19.7239 19.5 20C19.5 20.2761 19.2761 20.5 19 20.5C18.7239 20.5 18.5 20.2761 18.5 20C18.5 19.7239 18.7239 19.5 19 19.5ZM25 19.5C25.2761 19.5 25.5 19.7239 25.5 20C25.5 20.2761 25.2761 20.5 25 20.5C24.7239 20.5 24.5 20.2761 24.5 20C24.5 19.7239 24.7239 19.5 25 19.5Z" stroke="#111111" fill="none" />
      <path d="M25.0001 17V16C25.0001 14.3431 23.6569 13 22.0001 13C20.3432 13 19.0001 14.3431 19.0001 16V17M17.3196 30H26.6806C29.0106 30 30.8475 28.0164 30.6688 25.6932L30.2131 19.7699C30.0929 18.2069 28.7896 17 27.222 17H16.7782C15.2105 17 13.9072 18.2069 13.787 19.7699L13.3314 25.6932C13.1526 28.0164 14.9895 30 17.3196 30Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ) },
  { label: '소지품', icon: (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-11 h-11 relative" preserveAspectRatio="none">
      <path d="M25.6799 24.587C29.1699 24.587 31.9999 21.769 31.9999 18.293C31.9999 14.817 29.1699 12 25.6799 12C22.1899 12 19.3629 14.818 19.3629 18.293C19.3629 19.903 20.0969 21.074 20.0969 21.074L12.4549 28.684C12.1119 29.026 11.6319 29.914 12.4549 30.734L13.3369 31.612C13.6799 31.905 14.5419 32.315 15.2469 31.612L16.2769 30.588C17.3049 31.612 18.4809 31.027 18.9219 30.441C19.6559 29.417 18.7749 28.392 18.7749 28.392L19.0689 28.099C20.4789 29.505 21.7139 28.685 22.1549 28.099C22.8899 27.075 22.1549 26.05 22.1549 26.05C21.8609 25.465 21.2729 25.465 22.0079 24.733L22.8899 23.855C23.5949 24.44 25.0449 24.587 25.6819 24.587H25.6799Z" stroke="#111111" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M27.8851 18.2941C27.8837 18.8775 27.6508 19.4364 27.2375 19.848C26.8242 20.2596 26.2644 20.4902 25.6811 20.4891C25.0977 20.4902 24.5379 20.2596 24.1246 19.848C23.7113 19.4364 23.4784 18.8775 23.4771 18.2941C23.4776 18.0052 23.535 17.7193 23.646 17.4525C23.7571 17.1858 23.9196 16.9436 24.1242 16.7397C24.3289 16.5358 24.5717 16.3742 24.8388 16.2641C25.106 16.154 25.3921 16.0976 25.6811 16.0981C25.97 16.0976 26.2561 16.154 26.5233 16.2641C26.7904 16.3742 27.0332 16.5358 27.2379 16.7397C27.4425 16.9436 27.605 17.1858 27.7161 17.4525C27.8271 17.7193 27.8845 18.0052 27.8851 18.2941Z" stroke="#111111" strokeWidth="1.5" fill="none" />
    </svg>
  ) },
  { label: '의류', icon: (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-11 h-11 relative" preserveAspectRatio="none">
      <path d="M30.3798 13.46L25.9998 12C25.9998 13.0609 25.5784 14.0783 24.8282 14.8284C24.0781 15.5786 23.0607 16 21.9998 16C20.9389 16 19.9215 15.5786 19.1714 14.8284C18.4212 14.0783 17.9998 13.0609 17.9998 12L13.6198 13.46C13.1672 13.6108 12.7834 13.9184 12.5377 14.3273C12.2919 14.7363 12.2005 15.2196 12.2798 15.69L12.8598 19.16C12.8979 19.3949 13.0185 19.6085 13.1999 19.7625C13.3814 19.9165 13.6118 20.0007 13.8498 20H15.9998V30C15.9998 31.1 16.8998 32 17.9998 32H25.9998C26.5302 32 27.0389 31.7893 27.414 31.4142C27.7891 31.0391 27.9998 30.5304 27.9998 30V20H30.1498C30.3878 20.0007 30.6182 19.9165 30.7997 19.7625C30.9811 19.6085 31.1017 19.3949 31.1398 19.16L31.7198 15.69C31.7991 15.2196 31.7077 14.7363 31.4619 14.3273C31.2162 13.9184 30.8324 13.6108 30.3798 13.46Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ) },
  { label: '서류', icon: (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-11 h-11 relative" preserveAspectRatio="none">
      <path d="M24 12V18H30M26 23H18M26 27H18M20 19H18M24.5 12H16C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V30C14 30.5304 14.2107 31.0391 14.5858 31.4142C14.9609 31.7893 15.4696 32 16 32H28C28.5304 32 29.0391 31.7893 29.4142 31.4142C29.7893 31.0391 30 30.5304 30 30V17.5L24.5 12Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ) },
  { label: '반려동물', icon: (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-11 h-11 relative" preserveAspectRatio="none">
      <path d="M22 20C18.833 20 16.157 22.7655 15.293 26.3175C14.913 27.8795 15.486 29.5375 16.8925 30.3165C18.0075 30.934 19.666 31.5 22 31.5C24.334 31.5 25.993 30.934 27.108 30.3165C28.5145 29.5375 29.087 27.8795 28.707 26.3175C27.843 22.765 25.167 20 22 20ZM11.5 19.222C11.5 20.603 12.395 22 13.5 22C14.605 22 15.5 20.603 15.5 19.222C15.5 17.841 14.605 17 13.5 17C12.395 17 11.5 17.8415 11.5 19.222ZM32.5 19.222C32.5 20.603 31.605 22 30.5 22C29.395 22 28.5 20.603 28.5 19.222C28.5 17.841 29.395 17 30.5 17C31.605 17 32.5 17.8415 32.5 19.222ZM16.75 14.722C16.75 16.103 17.645 17.5 18.75 17.5C19.855 17.5 20.75 16.103 20.75 14.722C20.75 13.341 19.855 12.5 18.75 12.5C17.645 12.5 16.75 13.3415 16.75 14.722ZM27.25 14.722C27.25 16.103 26.355 17.5 25.25 17.5C24.145 17.5 23.25 16.103 23.25 14.722C23.25 13.341 24.145 12.5 25.25 12.5C26.355 12.5 27.25 13.3415 27.25 14.722Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ) },
  { label: '기타', icon: (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-11 h-11 relative" preserveAspectRatio="none">
      <path d="M22 26.75C22.4142 26.75 22.75 27.0858 22.75 27.5C22.75 27.9142 22.4142 28.25 22 28.25C21.5858 28.25 21.25 27.9142 21.25 27.5C21.25 27.0858 21.5858 26.75 22 26.75ZM22 21.25C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4142 22.4142 22.75 22 22.75C21.5858 22.75 21.25 22.4142 21.25 22C21.25 21.5858 21.5858 21.25 22 21.25ZM22 15.75C22.4142 15.75 22.75 16.0858 22.75 16.5C22.75 16.9142 22.4142 17.25 22 17.25C21.5858 17.25 21.25 16.9142 21.25 16.5C21.25 16.0858 21.5858 15.75 22 15.75Z" stroke="#111111" strokeWidth="1.5" fill="none" />
    </svg>
  ) },
];

const DownArrowIcon = (
  <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M13 1L7 7L1 1" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const CategoryFilter = ({ onCategorySelect, selectedCategory }) => (
  <div className="flex flex-col justify-start items-center w-[390px] overflow-hidden gap-2.5 pb-[34px] rounded-tl-2xl rounded-tr-2xl bg-white">
    <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1">
      <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5">
        <div className="flex-grow-0 flex-shrink-0 w-[30px] h-1 rounded-[5px] bg-[#111]/50" />
      </div>
      <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative overflow-hidden gap-2 px-6">
        <p className="flex-grow w-[342px] text-lg font-bold text-center text-[#111]">카테고리 설정</p>
      </div>
      {categories.map((cat) => (
        <div
          key={cat.label}
          className={`flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative overflow-hidden gap-2 px-6 cursor-pointer ${selectedCategory === cat.label ? 'bg-[#f5faff]' : ''}`}
          onClick={() => onCategorySelect?.(cat.label)}
        >
          {cat.icon}
          <p className="flex-grow w-[238px] text-base font-medium text-left text-[#111]">{cat.label}</p>
          {selectedCategory === cat.label && (
            <div className="flex-grow-0 flex-shrink-0 w-[14px] h-[8px] relative overflow-hidden">{DownArrowIcon}</div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default CategoryFilter; 