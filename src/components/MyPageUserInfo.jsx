import { useNavigate } from "react-router-dom"
// 사용자 페이지 메인 카드
import Exchange from '../assets/환전하기.svg'
import Product from '../assets/내가등록한분실물.svg'
import ModifyInfo from '../assets/개인정보수정.svg'
import RArrow from '../assets/인풋꺽쇠.svg'

export default function MyPageUserCard() {
    const navigate = useNavigate();
    // 환전 페이지
    const handleExchange = () => {
        navigate('/MyPageExchange');
    }
    // 수정 페이지
    const handleModify = () => {
        navigate('/MyPageModify');
    }
    // 내가 등록한 분실물
    const handleProduct = () => {
        navigate('/MyPageProduct');
    }

    return (
        <div className=" flex flex-col gap-[6px]">
            <button onClick={handleExchange} className="w-full flex justify-between cursor-pointer">
                <div className="w-[342px] h-[48px] flex justify-between items-center">
                    <div className="flex gap-[8px]">
                        <img src={Exchange} alt="환전" /> <p className="text-[#111111] text-[18px] font-medium">환전하기</p>
                    </div>
                    <img src={RArrow} alt=">" />
                </div>
            </button>
            <button onClick={handleProduct} className="w-full flex justify-between cursor-pointer">
                <div className="w-[342px] h-[48px] flex justify-between items-center">
                    <div className="flex gap-[8px]">
                        <img src={Product} alt="환전" /> <p className="text-[#111111] text-[18px] font-medium">내가 등록한 분실물</p>
                    </div>
                    <img src={RArrow} alt=">" />
                </div>
            </button>
            <button onClick={handleModify} className="w-full flex justify-between cursor-pointer">
                <div className="w-[342px] h-[48px] flex justify-between items-center">
                    <div className="flex gap-[8px]">
                        <img src={ModifyInfo} alt="환전" /> <p className="text-[#111111] text-[18px] font-medium">개인정보 수정</p>
                    </div>
                    <img src={RArrow} alt=">" />
                </div>
            </button>
        </div>
    )
}