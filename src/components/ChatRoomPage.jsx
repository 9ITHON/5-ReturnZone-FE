import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiService } from "../services/apiService";
import ReportHeader from "./ReportHeader";
import ReportModal from "./ReportModal";
import ChatRoomWebSocket from './ChatRoomWebSocket';
import ItemCard from "./ItemCard";
import ChatRoomItemCard from './ChatRoomItemCard';

const ConfirmOwnerModal = ({ onClose, userName }) => (
  <div className="fixed inset-0 z-50 flex justify-center items-end bg-[#111]/50 bg-opacity-30">
    <div className="flex flex-col justify-start items-center w-[390px] overflow-hidden gap-2.5 rounded-tl-2xl rounded-tr-2xl bg-white">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1">
        <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5">
          <div className="flex-grow-0 flex-shrink-0 w-[30px] h-1 rounded-[5px] bg-[#e6e6e6]" />
        </div>
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
          <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-0.5 px-6 py-[11px]">
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[342px] text-base font-semibold text-center text-[#111]">
              분실품 주인 확인
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[390px]">
          <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 px-6 py-[11px]">
            <div className="flex-grow-0 flex-shrink-0 w-9 h-9 relative">
              <img
                src="rectangle-3468137.jpeg"
                className="w-9 h-9 absolute left-[-0.82px] top-[-0.82px] rounded-[18px] object-cover"
                alt="user"
              />
            </div>
            <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-center text-[#111]">
              {userName || '유저'}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-2 px-6 pt-2 pb-[72px]">
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-0.5">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-left text-[#111]">
                분실품 주인이 확실한가요?
              </p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1 py-0.5">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0 w-4 h-4 relative"
                preserveAspectRatio="none"
              >
                <path
                  d="M8 5.33333V8.66667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                  stroke="#808080"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle
                  cx="0.666667"
                  cy="0.666667"
                  r="0.5"
                  transform="matrix(-1 0 0 1 8.66699 10)"
                  fill="#808080"
                  stroke="#808080"
                  strokeWidth="0.333333"
                />
              </svg>
              <p className="flex-grow-0 flex-shrink-0 text-sm text-center text-[#808080]">
                분실품 주인이 확인되면 물건을 전달해야 합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[110px] w-[390px] gap-[38px] py-3">
        <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5 px-6">
          <div className="flex flex-col justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-14 overflow-hidden px-4 py-3.5 rounded-lg bg-[#06f] cursor-pointer" onClick={onClose}>
            <div className="flex justify-center items-center self-stretch flex-grow relative overflow-hidden gap-1.5">
              <p className="flex-grow w-[310px] text-base font-semibold text-center text-white">
                네. 주인이 맞습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFoundOwnerMsg, setShowFoundOwnerMsg] = useState(false);

  // itemId는 쿼리스트링 또는 params에서 추출
  const searchParams = new URLSearchParams(location.search);
  const lostPostId = searchParams.get('lostPostId') || params.lostPostId || params.itemId;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
      
        const itemData = lostPostId ? await apiService.getLostPost(lostPostId) : null;
        setItem(itemData);
      
        if (itemData?.nickname) {
          setUserName(itemData.nickname);
        } else if (itemData?.memberId) {
          // 만약 닉네임이 없고 memberId만 있으면, 유저 정보 추가 fetch 필요 (apiService.getUser 등)
          // setUserName(await apiService.getUser(itemData.memberId).then(u => u.nickname || u.name));
        }
     
        let chatRoomId = lostPostId;
        const targetUserId = itemData?.memberId || itemData?.userId;
        if (!params.id && lostPostId && targetUserId && userId !== targetUserId) {
     
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
      {/* 아이템 카드 - 채팅방 상단에 항상 노출 */}
      <div className="w-full px-6 pt-4">
        <ChatRoomItemCard data={item || {
          title: "소니 WH-1000XM4 헤드셋",
          location: "역삼1동",
          timeAgo: "10일 전",
          mainImageUrl: "",
          registrationType: "LOST",
          status: "주인 찾는 중"
        }} />
        <div className={`my-4 flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative px-[119px] py-[9px] rounded-lg ${showFoundOwnerMsg ? 'bg-[#f2f2f2]' : 'bg-[#06f] cursor-pointer'}`} onClick={showFoundOwnerMsg ? undefined : () => setShowConfirmModal(true)}>
          <p className={`flex-grow-0 flex-shrink-0 text-base font-medium text-left ${showFoundOwnerMsg ? 'text-[#111]' : 'text-white'}`}>
            {showFoundOwnerMsg ? '전달을 기다리고 있어요' : '물건 주인을 찾았어요'}
          </p>
        </div>
        {showConfirmModal && <ConfirmOwnerModal userName={userName} onClose={() => { setShowConfirmModal(false); setShowFoundOwnerMsg(true); }} />}
      </div>
      {/* 채팅 메시지 영역 등 나머지 UI */}
      <div className="flex flex-col justify-start items-center w-[390px] h-[630px]">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow overflow-hidden gap-2.5 px-6 pt-4">
          <div className="flex flex-col justify-start items-center self-stretch flex-grow gap-4">
            <ChatRoomWebSocket
              roomId={String(roomId || lostPostId || params.id || params.lostPostId)}
              userId={String(userId)}
              subscribeTopic={`/topic/chat/${String(roomId || lostPostId || params.id || params.lostPostId)}`}
              sendDestination="/app/chat.send"
              showFoundOwnerMsg={showFoundOwnerMsg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage; 