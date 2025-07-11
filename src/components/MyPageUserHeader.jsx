import { useNavigate } from "react-router-dom"

import LArrow from '../assets/좌측꺽쇠.svg'

export default function MyPageUserHeader ({label}){
    const navigator = useNavigate();
    const handleBack = () => {
        navigator(-1);
    }
    return(
        <div className="flex items-center h-[56px] w-full py-[6px] px-[24px]">
            <button onClick={handleBack}> <img src={LArrow} alt="뒤로가기" className="cursor-pointer flex items-center" /></button>
            <p className="text-[#11111] text-[20px] font-semibold">{label}</p>
        </div>
    )
}