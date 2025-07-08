import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SearchHeader from '../components/search-header';
import SearchDetail from '../components/search-detail';
import SearchFilter from '../components/search-filter';
import ItemCard from '../components/ItemCard';

export default function SearchPage() {

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [submittedKeyword, setSubmittedKeyword] = useState('');
    const [includeCompleted, setIncludeCompleted] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('최신순');
    const [recentKeywords, setRecentKeywords] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
    // 유저의 정보 유지
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    // 최근 검색어 불러오기
    const fetchRecentKeywords = async () => {
        try {
            const res = await axios.get(`${apiBase}/api/v1/search/recent`, {
                headers: {
                    'X-USER-ID': userId
                }
            });
            setRecentKeywords(res.data);
        } catch (error) {
            console.error('최근 검색어 조회 실패:', error);
        }
    };
    // 초기 로딩 시 가져오기
    useEffect(() => {
        fetchRecentKeywords();
    }, []);
    // 검색 실행(enter 입력 시 발생)
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const trimmed = keyword.trim();

            // 빈 검색어 처리
            if (trimmed.length === 0) {
                alert("검색어를 입력해주세요.");
                return;
            }

            try {
                const res = await axios.get(`${apiBase}/api/v1/search/posts`, {
                    headers: {
                        'X-USER-ID': userId
                    },
                    params: {
                        keyword: trimmed,
                        includeReturned: includeCompleted
                    }
                });

                // 검색 결과 반영
                setSubmittedKeyword(trimmed);
                setSearchResults(res.data);

                // 최근 검색어 갱신
                fetchRecentKeywords();

            } catch (error) {
                console.error('검색 실패:', error);
                alert("검색 중 오류가 발생했습니다.");
            }
        }
    };
    // 검색 초기화 (x버튼)
    const handleClear = () => {
        setKeyword('');
        setSubmittedKeyword('');
    };
    // 최근 검색어 클릭
    const handleSearchItemClick = (label) => {
        setKeyword(label);
        setSubmittedKeyword('');
    };
    // 최근 검색어 삭제
    const handleDeleteSearchItem = async (label) => {
        try {
            await axios.delete(`${apiBase}/api/v1/search/recent`, {
                headers: {
                    'X-USER-ID': userId
                },
                params: {
                    keyword: label
                }
            });
            fetchRecentKeywords();
        } catch (error) {
            console.error('검색어 삭제 실패:', error);
        }
    };
    // 전체 검색어 삭제
    const handleClearAll = async () => {
        try {
            await axios.delete(`${apiBase}/api/v1/search/recent/all`, {
                headers: {
                    'X-USER-ID': userId
                }
            });
            fetchRecentKeywords();
        } catch (error) {
            console.error('전체 검색어 삭제 실패:', error);
        }
    };

    return (
        <div className='w-full h-full'>
            <SearchHeader
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onClear={handleClear}
                placeholder="검색어를 입력해주세요."
                onBack={() => navigate(-1)}
                onKeyDown={handleKeyDown}
            />
            {/* 본문 */}
            {submittedKeyword ? (
                // 결과 출력
                <div className="w-full">
                    <SearchFilter includeCompleted={includeCompleted}
                        onToggleCompleted={() => setIncludeCompleted(prev => !prev)}
                        selectedFilter={selectedFilter}
                        onSelectFilter={(filter) => setSelectedFilter(filter)} />
                    <div className='px-[24px] py-[16px]'>
                        {searchResults.map((post) => (
                            <ItemCard key={post.lostPostId} data={post} />
                        ))}
                    </div>
                </div>
            ) : (
                // 최근 검색 내역
                <div div className="px-[24px] py-[16px]">
                    <div className="flex justify-between items-center">
                        <p className="text-[14px] font-medium text-[#111111]">최근검색</p>
                        <button
                            onClick={handleClearAll}
                            className="text-[14px] font-normal text-[#808080]"
                        >
                            전체 삭제
                        </button>
                    </div>
                    <ul className="mt-2 space-y-2">
                        {recentKeywords.map((word) => (
                            <SearchDetail
                                key={word}
                                label={word}
                                onClick={() => handleSearchItemClick(word)}
                                onDelete={() => handleDeleteSearchItem(word)}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div >
    )
}
