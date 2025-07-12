import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { goBack } from '../utils/go-back';
import axios from 'axios';
import LArrow from '../assets/좌측꺽쇠.svg'
import OptionButton from '../assets/옵션버튼.svg'
import PenIcon from '../assets/팬.svg'
import DeletesIcon from '../assets/삭제.svg'
import { getUserId } from '../services/apiService';

export default function DetailedHeader({ postMemberId }) {
    const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림?
    const [showConfirmModal, setShowConfirmModal] = useState(false); // 삭제창 모달
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { lostPostId } = useParams(); // URL에서 ID 추출
    const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
    const userId = getUserId(); // 로그인 정보 유지
    const isAuthor = postMemberId && String(userId) === String(postMemberId); // 글쓴이랑 비교
    // 메뉴 닫고 열기
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && event.target && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // 삭제하기 
    const handleDelete = async () => {
        try {
            await axios.delete(`${apiBase}/api/v1/lostPosts/${lostPostId}`, {
                headers: { 'X-USER-ID': userId }
            });
            alert("삭제되었습니다.");
            navigate("/", { replace: true });
        } catch (err) {
            console.error(err);
            alert("삭제에 실패했습니다.");
        }
    };

    return (
        <div className='flex justify-between items-center px-[24px] h-[56px]'>
            {/* 뒤로가기 버튼 */}
            <button onClick={() => goBack(navigate)} > <img src={LArrow} alt="<" /></button>
            {/* 옵션 버튼 */}
            { isAuthor && (
                <div className="relative" ref={menuRef}>
                    <button onClick={() => setMenuOpen((prev) => !prev)}> <img src={OptionButton} alt="옵션" /></button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-[250px] bg-[#00000033] rounded-[12px] shadow-md z-10">
                            <button onClick={() => navigate(`/lost/${lostPostId}/edit`)} className="w-full flex pr-[16px] pl-[30px] items-center border border-[#808080] rounded-t-[12px] justify-between px-4 py-2">
                                수정하기 <img src={PenIcon} alt="✏️" />
                            </button>
                            <button onClick={() => setShowConfirmModal(true)} className="w-full pr-[16px] pl-[30px] flex items-center border border-[#808080] rounded-b-[12px] justify-between px-4 py-2">
                                예치금 환불 및 삭제 <img src={DeletesIcon} alt="🗑️" />
                            </button>
                        </div>
                    )}
                </div>
            )}
            {/* ✅ 삭제 확인 모달 */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#11111180]">
                    <div className="bg-[#e4e4e4] rounded-[14px] h-[148px] w-[270px] text-center">
                        <div className='px-[16px] py-[20px] h-[104px]'>
                            <p className="text-[18px] text-[#111111] font-bold">예치금 환불 및 삭제</p>
                            <p className="text-[14px] text-[#111111] font-normal">예치금을 환불받으며<br />게시글을 삭제하시겠어요?</p>
                        </div>

                        <div className="flex">
                            <button
                                className="w-1/2 font-medium text-[16px] h-[44px] rounded-bl-[14px] border border-[#808080] text-[#0066FF]"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                취소
                            </button>
                            <button
                                className="w-1/2 text-[16px] font-medium h-[44px] rounded-br-[14px] border border-l-0 border-[#808080] text-[#0066FF]"
                                onClick={handleDelete}
                            >
                                삭제하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}