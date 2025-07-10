import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiService } from "../services/apiService";
import ReportHeader from "./ReportHeader";
import ReportModal from "./ReportModal";
import ChatRoomWebSocket from './ChatRoomWebSocket';
import ItemCard from "./ItemCard";

const OptionModal = ({ onClose, onReport, onBlock, onExit }) => (
  <div
    className="absolute right-0 top-14 z-50"
    style={{ pointerEvents: 'auto' }}
    onClick={onClose}
  >
    <div
      className="flex flex-col justify-start items-start w-[250px] relative overflow-hidden rounded-xl bg-[#F2F2F2]"
      style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.12)", borderRadius: 16 }}
      onClick={e => e.stopPropagation()}
    >
      {/* 신고하기 */}
      <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative pl-[30px] pr-4 border-t-0 border-r-0 border-b border-b-[#E5E5E5] border-b-[0.5px] border-l-0 bg-transparent" style={{ zIndex: 1 }} onClick={onReport}>
        <p className="flex-grow w-[180px] text-base font-medium text-left text-[#111]">신고하기</p>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" preserveAspectRatio="none">
          <path d="M19.1111 16.4444V16.4444C19.602 16.4444 20 16.8424 20 17.3333V18.2222C20 19.2041 19.2041 20 18.2222 20H5.77778C4.79594 20 4 19.2041 4 18.2222V17.3333C4 16.8424 4.39797 16.4444 4.88889 16.4444V16.4444M19.1111 16.4444V11.1111C19.1111 8.74074 17.6889 4 12 4C6.31111 4 4.88889 8.74074 4.88889 11.1111V16.4444M19.1111 16.4444H4.88889" stroke="#111111" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
      {/* 차단하기 */}
      <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative pl-[30px] pr-4 border-t-0 border-r-0 border-b border-b-[#E5E5E5] border-b-[0.5px] border-l-0 bg-transparent" style={{ zIndex: 1 }} onClick={onBlock}>
        <p className="flex-grow w-[180px] text-base font-medium text-left text-[#111]">차단하기</p>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" preserveAspectRatio="none">
          <path d="M5.63548 18.3634C4.00713 16.7348 3 14.485 3 12C3 7.02944 7.02944 3 12 3C14.485 3 16.7348 4.00713 18.3634 5.63548M5.63548 18.3634C7.26421 19.9924 9.51444 21 12 21C16.9706 21 21 16.9706 21 12C21 9.51444 19.9924 7.26421 18.3634 5.63548M5.63548 18.3634L18.3634 5.63548" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
      {/* 채팅방 나가기 */}
      <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative pl-[30px] pr-4 border-t-0 border-r-0 border-b-0 border-l-0 bg-transparent" style={{ zIndex: 1 }} onClick={onExit}>
        <p className="flex-grow w-[180px] text-base font-medium text-left text-[#111]">채팅방 나가기</p>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" preserveAspectRatio="none">
          <path d="M16 8V5.5C16 4.11929 14.8807 3 13.5 3L8 3C6.34315 3 5 4.34315 5 6L5 18C5 19.6569 6.34315 21 8 21H13.5C14.8807 21 16 19.8807 16 18.5L16 16M23 12L11.3 12M23 12L20 9M23 12L20 15" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
    </div>
  </div>
);

const ChatRoomPage = () => {
  const params = useParams();
  const location = useLocation();
  const userId = localStorage.getItem('user_id') || '1';
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const [reportModalType, setReportModalType] = useState(null);
  const [item, setItem] = useState(null);
  const [roomId, setRoomId] = useState(params.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

  // itemId는 쿼리스트링 또는 params에서 추출
  const searchParams = new URLSearchParams(location.search);
  const lostPostId = searchParams.get('lostPostId') || params.lostPostId || params.itemId;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // 1. 아이템 정보 불러오기
        const itemData = lostPostId ? await apiService.getLostPost(lostPostId) : null;
        setItem(itemData);
        // 2. 등록자 이름(닉네임) 가져오기
        if (itemData?.nickname) {
          setUserName(itemData.nickname);
        } else if (itemData?.memberId) {
          // 만약 닉네임이 없고 memberId만 있으면, 유저 정보 추가 fetch 필요 (apiService.getUser 등)
          // setUserName(await apiService.getUser(itemData.memberId).then(u => u.nickname || u.name));
        }
        // 3. 채팅방 정보 불러오기 or 생성
        let chatRoomId = lostPostId;
        const targetUserId = itemData?.memberId || itemData?.userId;
        if (!params.id && lostPostId && targetUserId && userId !== targetUserId) {
          // 채팅방이 없으면 생성 (본인 채팅방 방지)
          await apiService.createChatRoom({ lostPostId, userId, targetUserId });
          navigate(`/chat/${lostPostId}`);
          return;
        }
        setRoomId(chatRoomId);
      } catch {
        setError('채팅방 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [lostPostId, params.id]);

  if (loading) return <div className="w-full h-full flex items-center justify-center">로딩중...</div>;
  if (error) return <div className="w-full h-full flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col justify-start items-center w-[390px] h-[630px] bg-white mx-auto relative"> {/* relative 추가 */}
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center w-[390px] overflow-hidden px-6 py-1.5 bg-white">
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 pr-3 py-2.5">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer" preserveAspectRatio="none" onClick={() => navigate(-1)}>
              <path d="M16.0107 19.9785L8.01074 11.9785L16.0107 3.97852" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <p className="flex-grow-0 flex-shrink-0 text-[20px] font-semibold text-left text-[#111]">{userName || '유저'}</p>
        </div>
        <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer" preserveAspectRatio="none" onClick={() => setShowOption((v) => !v)}>
            <path d="M12 16.75C12.4142 16.75 12.75 17.0858 12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5C11.25 17.0858 11.5858 16.75 12 16.75ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25ZM12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5C12.75 6.91421 12.4142 7.25 12 7.25C11.5858 7.25 11.25 6.91421 11.25 6.5C11.25 6.08579 11.5858 5.75 12 5.75Z" stroke="#111111" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      {showOption && <OptionModal
        onClose={() => setShowOption(false)}
        onReport={() => { setReportModalType('report'); setShowOption(false); }}
        onBlock={() => { setReportModalType('block'); setShowOption(false); }}
        onExit={() => { setReportModalType('exit'); setShowOption(false); }}
      />}
      {reportModalType && (
        <ReportModal
          type={reportModalType}
          onCancel={() => setReportModalType(null)}
          onConfirm={async () => {
            if (reportModalType === 'exit') {
              try {
                await apiService.deleteChatRoom(roomId);
                setReportModalType(null);
                navigate('/chat');
              } catch {
                setReportModalType(null);
              }
            } else {
              setReportModalType(null);
            }
          }}
        />
      )}
      {/* 상단 상품 정보 및 시스템 메시지 */}
      <div className="flex flex-col justify-start items-center w-[390px] h-[630px]">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow overflow-hidden gap-2.5 px-6 pt-4">
          <div className="flex flex-col justify-start items-center self-stretch flex-grow gap-4">
            {/* 상품 정보 */}
            {item && (
              <ItemCard
                data={{
                  title: item.title,
                  reward: item.reward,
                  imageUrl: item.mainImageUrl,
                  timeAgo: item.timeAgo,
                  registrationType: item.registrationType,
                  status: item.status,
                }}
              />
            )}
            {/* 채팅 메시지 영역 */}
            <ChatRoomWebSocket
              roomId={String(roomId || lostPostId || params.id || params.lostPostId)}
              userId={String(userId)}
              subscribeTopic={`/topic/chat/${String(roomId || lostPostId || params.id || params.lostPostId)}`}
              sendDestination="/app/chat.send"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage; 