import { useNavigate } from "react-router-dom";
import XButton from '../assets/x버튼.svg'

export default function RegisterHeader ({title}){
    const navigate = useNavigate();
    // 브라우저에서 이전 페이지로 이동
    const handleBack = () => {
    navigate(-1); 
  };

  return(
    <div className="w-full h-[56px] flex items-center px-[24px] relative">
        <img src={XButton} alt="x버튼" onClick={handleBack} className=" cursor-pointer"/>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[#111111] font-medium text-[20px]">{title}</h1>
    </div>
  )
}