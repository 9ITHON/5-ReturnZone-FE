import { useEffect, useState } from "react";
import axios from "axios";

import ItemCard from "../components/ItemCard";
import MyPageUserHeader from "../components/MyPageUserHeader";


export default function MyPageProduct() {
    const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8080";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     // 더미 데이터 정의
    //     const dummyProducts = [
    //         {
    //             lostPostId: 1,
    //             title: '소니 WH-1000XM4 헤드셋 찾아가세요',
    //             tag: '즉시 정산 가능',
    //             location: '월계1동',
    //             time: '10분 전',
    //             reward: '10,000원',
    //             status: '주인찾아요',
    //             imageUrl: '',
    //         },
    //         {
    //             lostPostId: 2,
    //             title: '에어팟 프로 케이스 분실했습니다',
    //             tag: '',
    //             location: '중앙로역',
    //             time: '2시간 전',
    //             reward: '5,000원',
    //             status: '분실했어요',
    //             imageUrl: 'https://via.placeholder.com/96x96.png?text=에어팟',
    //         },
    //         {
    //             lostPostId: 3,
    //             title: '현금이 들어있는 지갑을 잃어버렸어요. 도와주세요!',
    //             tag: '즉시 정산 가능',
    //             location: '강남역',
    //             time: '1일 전',
    //             reward: '30,000원',
    //             status: '분실했어요',
    //             imageUrl: '',
    //         },
    //     ];
    //     // 상태에 저장
    //     setProducts(dummyProducts);
    // }, []);
    useEffect(() => {
        const fetchLostPosts = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("userId가 없습니다.");
                    return;
                }
                const response = await axios.get(`${apiBase}/api/v1/mypage/lostPosts`, {
                    headers: {
                        "X-USER-ID": userId,
                    },
                    params: {
                        page: 0, // 기본값
                    },
                });

                setProducts(response.data || []);
            } catch (e) {
                console.error("분실물 조회 실패:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchLostPosts();
    }, []);
    
    return (
        <div>
            <MyPageUserHeader label="내가 등록한 분실물" />
            <div className="flex flex-col gap-[18px] h-[700px] px-[24px] overflow-y-auto hide-scrollbar">
                <p className="text-[#0066FF] text-[16px] font-semibold">총 {products.length}개</p>
                {products.map((item) => (
                    <ItemCard
                        key={item.lostPostId}
                        title={item.title}
                        timeAgo={item.timeAgo}
                        location={item.location}
                        imageUrl={item.mainImageUrl}
                        status={item.status}
                        isRegistered={true} // 필요 시 props 추가
                    />
                ))}
            </div>
        </div>

    )
}