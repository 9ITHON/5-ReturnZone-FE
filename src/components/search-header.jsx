import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LArrow from '../assets/좌측꺽쇠.svg';
import InputXIcon from '../assets/인풋x.svg'

// 값, 입력감지, 값 초기화, 설명란, 키입력 감지
export default function SearchHeader({ value, onChange, onClear, placeholder, onKeyDown }) {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    //뒤로가기
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className="flex justify-center items-center px-[24px] py-[6px]">
            <button onClick={handleBack}>
                <img src={LArrow} alt="뒤로가기" />
            </button>
            <div className="relative">
                <input
                    type="text"
                    onChange={onChange} onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    value={value}
                    className="w-[262px] h-[44px] border border-[#B8B8B8] rounded px-[12px] py-[18px]"
                />
                {value && (
                    <button
                        onClick={onClear}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        aria-label="입력 삭제"
                    >
                        <img src={InputXIcon} alt="삭제" className="w-5 h-5" />
                    </button>
                )}
            </div>
            <button
                onClick={handleBack}
                className="font-medium text-[16px] text-[#111111] py-[10px] pl-[12px]"
            >
                닫기
            </button>
        </div>
    );
}