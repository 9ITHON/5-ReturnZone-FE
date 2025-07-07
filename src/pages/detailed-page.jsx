import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Button from "../components/button";
import DetailedHeader from "../components/detailed-header";
import DetailImg from "../components/detail-img";
import DetailMap from "../components/detail-map";
import DetailSimilar from "../components/detail-similar";
import { DetailTest } from "../test/detailTest";
import { DetailDate } from "../utils/detail-date";

import ProductIcon from '../assets/상품.svg'
import TimeIcon from '../assets/상세시간.svg'
import LocationIcon from '../assets/상세위치.svg'

export default function DetailedPage() {
    const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

    const { lostPostId } = useParams(); //
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // 분실물 정보 상세 조회
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${apiBase}/api/v1/lostPosts/${lostPostId}`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                setPost(response.data);
            } catch (err) {
                console.error(err);
                setError("데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [lostPostId, apiBase]);

    if (loading) return <p>불러오는 중...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return null; // 예외 방어

    return (
        <div>
            <DetailedHeader />
            <div className=" flex flex-col gap-[40px] h-[686px] px-[24px] overflow-y-auto hide-scrollbar">
                <div className="flex flex-col gap-[20px]">
                    {/*이미지*/}
                    <div>
                        <DetailImg images={post.imageUrls} />
                    </div>
                    {/* 분실/제보 태그 */}
                    <div>
                        <span
                            className={`rounded-[6px] p-[2px] text-[14px] ${post.registrationType === 'LOST'
                                ? 'bg-[#F9EAE0] text-[#FF5900]'
                                : 'bg-[#98f1bc] text-[#00D455]'
                                }`}
                        >
                            {post.registrationType === 'LOST' ? '분실했어요' : '주인 찾아요'}
                        </span>
                    </div>

                    {/* 제목, 현상금, 카테고리 */}
                    <div>
                        <h1 className="text-[22px] text-[#111111] font-semibold">{post.title}</h1>
                        <p className="text-[22px] text-[#111111] font-semibold">현상금 {post.reward.toLocaleString()}원</p>
                    </div>

                    {/* 본문 내용 */}
                    <p>{post.description}</p>
                </div>

                {/* 분실 정보 */}
                <div className="flex flex-col gap-[8px]">
                    <p className="text-[#111111] font-bold text-[18px]">분실물 정보</p>
                    <p className="flex items-center gap-[6px] text-[#111111] text-[16px]"><img src={ProductIcon} alt="물품" />{post.category} | {post.itemName}</p>
                    <p className="flex items-center gap-[6px] text-[#111111] text-[16px]"> <img src={TimeIcon} alt="시간" />{DetailDate(post.lostDateTimeStart, post.lostDateTimeEnd)}</p>
                    <p className="flex items-center gap-[6px] text-[#111111] text-[16px]"> <img src={LocationIcon} alt="위치" />{post.detailedLocation}</p>
                </div>

                {/* 지도 (고정)*/}
                <div>
                    <DetailMap latitude={post.latitude} longitude={post.longitude} />
                </div>

                {/* 작성자 정보 */}
                <div className="border-y-[3px] border-[#F2F2F2] py-[30px]">
                    <div className="flex justify-between items-center h-[44px]">
                        {/* 프로필 */}
                        <div className="flex items-center gap-[10px]">
                            <img
                                className="h-[44px] w-[44px] rounded-full"
                                src={post.memberImageUrl}
                                alt="프로필"
                            />
                            <div>
                                <p className="text-[16px] text-[#111111]">{post.nickname}</p>
                                <p className="text-[14px] text-[#808080]">{post.lostLocationDong} · {post.timeAgo}</p>
                            </div>
                        </div>

                        {/* 습득/반환 */}
                        <div className="flex gap-[30px]">
                            {[
                                { label: '습득', count: 3 },
                                { label: '반환', count: 2 },
                            ].map(({ label, count }) => (
                                <div key={label} className="text-center px-[16px]">
                                    <p className="text-[14px] text-[#111111] font-medium">{label}</p>
                                    <p className="text-[14px] text-[#111111] font-medium">{count}회</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 비슷한 다른 글 */}
                <div>
                    <p className=" mb-[10px] text-[#111111] text-[18px] font-bold ">비슷한 다른 글</p>
                    <div className="grid grid-cols-2 gap-[16px]">
                        {[...Array(6)].map((_, idx) => (
                            <DetailSimilar key={idx} post={post} />
                        ))}
                    </div>
                </div>
            </div>
            {/* 하단 버튼 */}
            <div className=" pt-[12px] pb-[42px] px-[24px]">
                <Button label="채팅하기"></Button>
            </div>
        </div>
    );
}