import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../services/apiService";
import ReportHeader from "./ReportHeader";
import ReportModal from "./ReportModal";

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
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportModalType, setReportModalType] = useState(null); // null | 'report' | 'block'
  // input, setInput 제거

  // 예시: 실제로는 props나 API에서 분실자/습득자 여부를 받아야 함
  const isOwner = true; // 분실자(내가 물건을 잃어버린 사람)
  const isFinder = false; // 습득자(내가 물건을 주운 사람)

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await apiService.getChatMessages(roomId);
        setMessages(res.content || []);
      } catch {
        setMessages([]);
      }
      setLoading(false);
    };
    if (roomId) fetchMessages();
  }, [roomId]);

  // 메시지 전송 핸들러 (후속 구현)
  // const handleSend = async () => {
  //   if (!input.trim()) return;
  //   await apiService.sendChatMessage(roomId, { content: input });
  //   setInput("");
  //   // 메시지 새로고침 등 추가 구현 필요
  // };

  return (
    <div className="relative w-[390px] mx-auto">
      <div className="flex justify-between items-center w-[390px] overflow-hidden px-6 py-1.5 bg-white">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 pr-3 py-2.5">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer"
                preserveAspectRatio="none"
                onClick={() => navigate(-1)}
              >
                <path
                  d="M16.0107 19.9785L8.01074 11.9785L16.0107 3.97852"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <p className="flex-grow-0 flex-shrink-0 text-[22px] font-semibold text-left text-[#111]">
              유저1
            </p>
          </div>
          <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer"
              preserveAspectRatio="none"
              onClick={() => setShowOption((v) => !v)}
            >
              <path
                d="M12 16.75C12.4142 16.75 12.75 17.0858 12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5C11.25 17.0858 11.5858 16.75 12 16.75ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25ZM12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5C12.75 6.91421 12.4142 7.25 12 7.25C11.5858 7.25 11.25 6.91421 11.25 6.5C11.25 6.08579 11.5858 5.75 12 5.75Z"
                stroke="#111111"
                strokeWidth="1.5"
              />
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
                <p className="self-stretch flex-grow-0 flex-shrink-0 w-[258px] text-base font-medium text-left text-[#111]">
                  소니 WH-1000XM4 헤드셋 찾아주세요
                </p>
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
            {/* 시스템 메시지 */}
            {isOwner && (
              <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative px-[119px] py-[9px] rounded-lg bg-[#f2f2f2]">
                <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center text-[#111]">
                  물건을 잘 받았어요
                </p>
              </div>
            )}
            {isFinder && (
              <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative px-[134px] py-[9px] rounded-lg bg-[#06f]">
                <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center text-white">
                  물건 주인을 찾았어요
                </p>
              </div>
            )}
            {/* 채팅 메시지 영역 */}
            <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-4 px-6 pt-4 pb-2 h-[420px] overflow-y-auto">
              {loading ? (
                <div className="text-center text-gray-400">메시지 불러오는 중...</div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-400">메시지가 없습니다.</div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id || msg.messageId} className={`w-full flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-[22px] ${msg.isMine ? 'bg-[#06f] text-white' : 'bg-[#f2f2f2] text-[#111]'}`}>
                      <p className="break-words whitespace-pre-line">{msg.content}</p>
                      <div className="flex justify-end items-center gap-1 mt-1">
                        <span className="text-xs text-[#808080]">{msg.time || msg.createdAt}</span>
                        {msg.isMine && msg.read && <span className="text-xs font-medium text-[#808080]">읽음</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 입력창 */}
      <div className="flex flex-col justify-start items-center w-[390px] gap-[38px] pt-3 pb-12 bg-white">
        <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5 px-6">
          <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
            {/* 카메라 아이콘 - 내부 투명 */}
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" preserveAspectRatio="none">
              <path d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M7.8523 5.34341L7.86169 5.31319C8.10539 4.52919 8.79233 4 9.56632 4L14.4337 4C15.2076 4 15.8946 4.52919 16.1383 5.31319L16.1477 5.34341C16.2695 5.7354 16.613 6 17 6L18 6C19.6569 6 21 7.34315 21 9V17C21 18.6569 19.6569 20 18 20H6C4.34315 20 3 18.6569 3 17L3 9C3 7.34315 4.34315 6 6 6L6.99999 6C7.38699 6 7.73045 5.7354 7.8523 5.34341Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[290px] h-11 overflow-hidden gap-3 px-3 py-[11px] rounded-[22px] bg-[#f2f2f2]">
            <div className="flex justify-center items-end self-stretch flex-grow relative overflow-hidden gap-2.5">
              <p className="flex-grow w-[266px] text-base font-medium text-left text-[#b8b8b8]">메시지 보내기</p>
            </div>
          </div>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
            {/* 전송 아이콘 - 내부 투명 */}
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" preserveAspectRatio="none">
              <g clipPath="url(#clip0_652_10693)">
                <path d="M21.2847 12.1421L4.46546 20.2403C3.64943 20.6332 2.77317 19.8256 3.0983 18.9803L5.72836 12.1421M21.2847 12.1421L4.46546 4.04397C3.64943 3.65107 2.77317 4.45864 3.0983 5.30396L5.72836 12.1421M21.2847 12.1421H5.72836" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
              <defs>
                <clipPath id="clip0_652_10693">
                  <rect width={24} height={24} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage; 