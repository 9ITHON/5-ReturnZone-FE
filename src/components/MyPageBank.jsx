import { useEffect, useRef } from "react";
import NH from "../assets/농협은행.svg";
import KB from "../assets/국민은행.svg";
import IBK from "../assets/기업은행.svg";
import SHINHAN from "../assets/신한은행.svg";
import WOORI from "../assets/우리은행.svg";
import HANA from "../assets/하나은행.svg";
import KAKAO from "../assets/카카오뱅크.svg";
import TOSS from "../assets/토스뱅크.svg";
import Under from '../assets/내리기.svg'

const bankList = [
    { name: "NH농협", logo: NH },
    { name: "국민", logo: KB },
    { name: "기업", logo: IBK },
    { name: "신한", logo: SHINHAN },
    { name: "우리", logo: WOORI },
    { name: "하나", logo: HANA },
    { name: "카카오", logo: KAKAO },
    { name: "토스뱅크", logo: TOSS },
];

export default function MyPageBank({ onClose, onSelect }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div className="w-[390px] fixed inset-0 z-50 flex justify-center items-end bg-[#11111180]">
            <div ref={modalRef} className="bg-white rounded-xl h-[364px]">
                <div className="w-full p-[10px] flex justify-center items-center">
                    <img src={Under} alt="---"/>
                </div>
                <p className="py-[11px] px-[24px] text-center text-[18px] font-bold">은행 선택</p>
                <div className="grid grid-cols-2 gap-[10px]">
                    {bankList.map((bank) => (
                        <button
                            key={bank.name}
                            onClick={() => onSelect(bank.name)}
                            className="flex items-center gap-[8px] py-[11px] px-[24px] cursor-pointer w-[195px] h-[58px]"
                        >
                            <img src={bank.logo} alt={bank.name} />
                            <span className="text-[18px] text-[#111111] font-medium">{bank.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
