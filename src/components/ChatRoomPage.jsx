import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../services/apiService";
import ReportHeader from "./ReportHeader";
import ReportModal from "./ReportModal";
import ChatRoomWebSocket from './ChatRoomWebSocket';

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
  const roomId = params.id;
  const userId = localStorage.getItem('user_id') || '1';
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const [reportModalType, setReportModalType] = useState(null);
  console.log('roomId in ChatRoomPage:', roomId);

  if (!roomId) {
    return <div style={{padding: 32, color: 'red'}}>잘못된 접근입니다. (roomId 없음)</div>;
  }

  // 실제 데이터로 대체 필요: 예시/더미 데이터 제거
  // const isOwner = true; // 분실자(내가 물건을 잃어버린 사람)
  // const isFinder = false; // 습득자(내가 물건을 주운 사람)

  return (
    <div className="flex flex-col justify-start items-center w-[390px] h-[630px] bg-white mx-auto">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center w-[390px] overflow-hidden px-6 py-1.5 bg-white">
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 pr-3 py-2.5">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer" preserveAspectRatio="none" onClick={() => navigate(-1)}>
              <path d="M16.0107 19.9785L8.01074 11.9785L16.0107 3.97852" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <p className="flex-grow-0 flex-shrink-0 text-[22px] font-semibold text-left text-[#111]">유저1</p>
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
            <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
              <svg width={72} height={72} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-[72px] h-[72px] relative" preserveAspectRatio="xMidYMid meet">
                <rect width={72} height={72} rx={12} fill="#F2F2F2" />
                <path d="M44.8534 38.9493L41.8179 35.9139C41.449 35.5451 40.9488 35.3379 40.4271 35.3379C39.9055 35.3379 39.4052 35.5451 39.0363 35.9139L30.0993 44.8509M29.1157 27.146H42.8861C43.9726 27.146 44.8534 28.0267 44.8534 29.1132V42.8837C44.8534 43.9702 43.9726 44.8509 42.8861 44.8509H29.1157C28.0292 44.8509 27.1484 43.9702 27.1484 42.8837V29.1132C27.1484 28.0267 28.0292 27.146 29.1157 27.146ZM35.0173 33.0476C35.0173 34.1341 34.1365 35.0148 33.0501 35.0148C31.9636 35.0148 31.0829 34.1341 31.0829 33.0476C31.0829 31.9612 31.9636 31.0804 33.0501 31.0804C34.1365 31.0804 35.0173 31.9612 35.0173 33.0476Z" stroke="#B8B8B8" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div className="flex flex-col justify-start items-start flex-grow relative gap-1">
                <p className="self-stretch flex-grow-0 flex-shrink-0 w-[258px] text-base font-medium text-left text-[#111]">소니 WH-1000XM4 헤드셋 찾아주세요</p>
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
                  <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">역삼1동</p>
                  <svg width={4} height={4} viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0" preserveAspectRatio="none">
                    <circle cx={2} cy={2} r={2} fill="#B8B8B8" />
                  </svg>
                  <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">10일 전</p>
                </div>
                <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#06f]">주인 찾는 중</p>
              </div>
            </div>
            {/* 시스템 메시지: 실제 데이터가 있을 때만 렌더링 */}
            {/* 예: props.systemMessage && (
              <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative px-[119px] py-[9px] rounded-lg bg-[#f2f2f2]">
                <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center text-[#111]">{props.systemMessage}</p>
              </div>
            ) */}
            {/* 채팅 메시지 영역 */}
            <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-4">
              <ChatRoomWebSocket
                roomId={roomId}
                userId={userId}
                subscribeTopic={`/topic/chat/${roomId}`}
                sendDestination="/app/chat.send"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage; 