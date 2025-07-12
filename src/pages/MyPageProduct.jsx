import { useEffect, useState } from "react";
import axios from "axios";

import ItemCard from "../components/ItemCard";
import MyPageUserHeader from "../components/MyPageUserHeader";
import { getUserId } from '../services/apiService';

export default function MyPageProduct() {
    const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8080";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // 🔹 추가됨

    useEffect(() => {
        const fetchLostPosts = async () => {
            try {
                const userId = getUserId();
                if (!userId) {
                    console.error("userId가 없습니다.");
                    return;
                }
                const response = await axios.get(`${apiBase}/api/v1/mypage/lostPosts`, {
                    // headers: {
                    //     "X-USER-ID": userId, // 필요 시 주석 해제
                    // },
                    params: {
                        page: 0,
                    },
                });

                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    setProducts([]); // 비정상 응답 fallback
                    console.error("서버 응답이 배열이 아닙니다:", response.data);
                }
            } catch (e) {
                console.error("분실물 조회 실패:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchLostPosts();
    }, [apiBase]);

    if (loading) return <p className="px-[24px]">불러오는 중...</p>;

    return (
        <div>
            <MyPageUserHeader label="내가 등록한 분실물" />
            <div className="flex flex-col gap-[18px] h-[700px] pb-[80px] px-[24px] overflow-y-auto hide-scrollbar">
                <p className="text-[#0066FF] text-[16px] font-semibold">총 {products.length}개</p>
                {products.map((item) => (
                    <ItemCard
                        key={item.lostPostId}
                        title={item.title}
                        timeAgo={item.timeAgo}
                        location={item.location}
                        imageUrl={item.mainImageUrl || 'https://via.placeholder.com/96x96.png?text=No+Image'}
                        status={item.status}
                        tag={item.instantSettlement ? '즉시 정산 가능' : ''}
                        reward={`${item.reward.toLocaleString()}원`}
                        isRegistered={true}
                    />
                ))}
            </div>
        </div>
    );
}