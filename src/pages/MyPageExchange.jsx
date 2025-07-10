import { useEffect, useState } from "react";
import axios from "axios";

import MyPageAccount from "../components/MyPageAccount";
import MyPageUserHeader from "../components/MyPageUserHeader";
import Button from "../components/button";
import MyPagePoint from "../components/MyPagePoint";
import { GetMyPage } from "../utils/GetMyPage";


export default function MyPageExchange() {
    const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8080";
    const [isLoading, setIsLoading] = useState(false);

    const [userInfo, setUserInfo] = useState(null); // 사용자 정보 가져오기
    // 사용자 정보 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                // 실제 호출
                const data = await GetMyPage(userId);

                // 테스트용 더미 데이터 호출
                // const data = await GetMyPageDummy();
                setUserInfo(data);
            } catch (e) {
                console.error("유저 정보 로딩 실패:", e);
            }
        };

        fetchData();
    }, []);
    // 환전하기 기능
    const handleExchange = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId || userInfo?.point === 0 || isLoading) return;

            setIsLoading(true);

            const response = await axios.post(`${apiBase}/api/v1/mypage/exchange`, null, {
                headers: {
                    "X-USER-ID": userId,
                },
            });

            // 응답 받은 새 포인트 반영
            setUserInfo((prev) => ({
                ...prev,
                point: response.data.point || 0,
            }));
        } catch (e) {
            console.error("환전 요청 실패:", e);
            alert("환전 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!userInfo) {
        return <div>유저 정보를 확인 중 입니다.</div>;
    }
    return (
        <div>
            <MyPageUserHeader label="환전하기" />
            <div className="flex flex-col py-[16px] px-[24px]">
                <div>
                    <MyPageAccount userInfo={userInfo} />
                </div>
                <div className="my-[16px] border-t-[3px] border-[#F2F2F2]" />
                <MyPagePoint userInfo={userInfo} />

            </div>
            <div className=" px-[24px] pt-[12px] pb-[38px] fixed bottom-0 ">
                <Button label={userInfo?.point === 0 ? "환전완료" : "환전하기"}
                    className={userInfo.point === 0 ? "bg-[#F2F2F2] !text-[#111111] !cursor-default" : ""}
                    disabled={userInfo.point === 0}
                    onClick={handleExchange} />
            </div>
        </div>
    )
}