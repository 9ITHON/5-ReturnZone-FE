import { useEffect, useState } from "react";
import { GetMyPage } from "../utils/GetMyPage";
import { formatNumber } from "../utils/formatNumber";
import { getUserId } from '../services/apiService';

export default function MyPageUserCard() {
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetMyPage(); // userId 인자 제거
                setUserInfo(data);
            } catch (e) {
                console.error("유저 정보 로딩 실패:", e);
            }
        };

        fetchData();
    }, []);

    if (!userInfo) {
        return <div>유저 정보를 확인 중 입니다.</div>;
    }

    return (
        <div className="h-[80px] flex gap-[12px] items-center">
            <div>
                <img className="rounded-full h-[72px] w-[72px] object-cover" src={userInfo.imageUrl} alt="프로필" />
            </div>
            <div className="flex flex-col gap-[2px]">
                <p className="text-[#111111] text-[18px] font-bold">{userInfo.nickname}</p>
                <div>
                    <p className="text-[#808080] text-[14px] font-normal">보유 포인트</p>
                    <p className="text-[#111111] text-[16px] font-semibold">{formatNumber(userInfo.point)}원</p>
                </div>
            </div>
        </div>
    )
}