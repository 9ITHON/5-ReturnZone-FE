import { useNavigate } from "react-router-dom";

export default function MyPageAccount({ userInfo }) {
    const navigate = useNavigate();
    // 수정 페이지 이동
    const handleModify = () => {
        navigate('/MyPageModify');
    }
    return (
        <div className="relative py-[12px]">
            <div className="flex flex-col gap-[8px] text-[#111111] text-[18px] font-medium">
                <p className="text-[16px]">등록한 계좌 정보</p>
                <div className="flex flex-col gap-[2px]">
                    <p>{userInfo.bankName || "등록 계좌가 없습니다"}</p>
                    <p>{userInfo.accountNumber} {userInfo.accountHolder}</p>
                </div>
            </div>
            <button onClick={handleModify}
                className="h-[42px] w-[84px] rounded-[56px] bg-[#F2F2F2] py-[12px] px-[16px] text-[#111111] text-[14px] font-medium absolute bottom-[12px] right-0" >수정하기</button>
        </div>
    )
}