// 마이 페이지
import BottomNav from "../components/BottomNav"
import MyPageUserCard from "../components/MyPageUserCard"
import MyPageUserInfo from "../components/MyPageUserInfo"

export default function MyPage() {
    return (
        <div>
            {/* 제목 */}
            <div className="px-[24px] py-[12px] h-[56px] flex flex-col">
                <p className="text-[#111111] text-[20px] font-semibold">마이페이지</p>
            </div>
            <div className="py-[16px] px-[24px]">
                {/* 유저카드 */}
                <div>
                    <MyPageUserCard />
                    <div className="my-[16px] border-t-[3px] border-[#F2F2F2]" />
                    <MyPageUserInfo />
                </div>
                <BottomNav/>
            </div>
        </div>
    )
}