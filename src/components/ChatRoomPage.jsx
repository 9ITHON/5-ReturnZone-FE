import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiService } from "../services/apiService";
import ReportHeader from "./ReportHeader";
import ReportModal from "./ReportModal";
import ChatRoomWebSocket from "./ChatRoomWebSocket";
import ChatRoomItemCard from "./ChatRoomItemCard";

// 모달 컴포넌트들은 제공된 코드에 포함되어 있지 않으므로, 그대로 두거나 필요에 따라 수정합니다.
  const OptionModal = ({ onClose, onReport, onBlock, onExit }) => (
    <div
      className="absolute right-0 top-14 z-50"
      style={{ pointerEvents: "auto" }}
      onClick={onClose}
    >
      <div
        className="flex flex-col justify-start items-start w-[250px] relative overflow-hidden rounded-xl bg-[#F2F2F2]"
        style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.12)", borderRadius: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 신고하기 */}
        <div
          className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative pl-[30px] pr-4 border-t-0 border-r-0 border-b border-b-[#E5E5E5] border-b-[0.5px] border-l-0 bg-transparent"
          style={{ zIndex: 1 }}
          onClick={onReport}
        >
          <p className="flex-grow w-[180px] text-base font-medium text-left text-[#111]">
            신고하기
          </p>
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
            preserveAspectRatio="none"
          >
            <path
              d="M19.1111 16.4444V16.4444C19.602 16.4444 20 16.8424 20 17.3333V18.2222C20 19.2041 19.2041 20 18.2222 20H5.77778C4.79594 20 4 19.2041 4 18.2222V17.3333C4 16.8424 4.39797 16.4444 4.88889 16.4444V16.4444M19.1111 16.4444V11.1111C19.1111 8.74074 17.6889 4 12 4C6.31111 4 4.88889 8.74074 4.88889 11.1111V16.4444M19.1111 16.4444H4.88889"
              stroke="#111111"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
        {/* 차단하기 */}
        <div
          className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative pl-[30px] pr-4 border-t-0 border-r-0 border-b border-b-[#E5E5E5] border-b-[0.5px] border-l-0 bg-transparent"
          style={{ zIndex: 1 }}
          onClick={onBlock}
        >
          <p className="flex-grow w-[180px] text-base font-medium text-left text-[#111]">
            차단하기
          </p>
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
            preserveAspectRatio="none"
          >
            <path
              d="M5.63548 18.3634C4.00713 16.7348 3 14.485 3 12C3 7.02944 7.02944 3 12 3C14.485 3 16.7348 4.00713 18.3634 5.63548M5.63548 18.3634C7.26421 19.9924 9.51444 21 12 21C16.9706 21 21 16.9706 21 12C21 9.51444 19.9924 7.26421 18.3634 5.63548M5.63548 18.3634L18.3634 5.63548"
              stroke="#111111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        {/* 채팅방 나가기 */}
        <div
          className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative pl-[30px] pr-4 border-t-0 border-r-0 border-b-0 border-l-0 bg-transparent"
          style={{ zIndex: 1 }}
          onClick={onExit}
        >
          <p className="flex-grow w-[180px] text-base font-medium text-left text-[#111]">
            채팅방 나가기
          </p>
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
            preserveAspectRatio="none"
          >
            <path
              d="M16 8V5.5C16 4.11929 14.8807 3 13.5 3L8 3C6.34315 3 5 4.34315 5 6L5 18C5 19.6569 6.34315 21 8 21H13.5C14.8807 21 16 19.8807 16 18.5L16 16M23 12L11.3 12M23 12L20 9M23 12L20 15"
              stroke="#111111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );


const ChatRoomPage = ({ roomId: propRoomId }) => {
  const params = useParams();
  const location = useLocation();
  const memberId = localStorage.getItem("userId") || "1";
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const [reportModalType, setReportModalType] = useState(null);
  const [item, setItem] = useState(null);
  const [roomId, setRoomId] = useState(propRoomId || params.roomId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [showDeliveryCompleted, setShowDeliveryCompleted] = useState(false);
  const [showPaymentCompleted, setShowPaymentCompleted] = useState(false); // 지급 완료 상태
  const [showRewardModal, setShowRewardModal] = useState(false); // 현상금 지급 모달 상태

  const searchParams = new URLSearchParams(location.search);
  const lostPostId = searchParams.get("lostPostId") || params.lostPostId || params.itemId;
  
  // NOTE: item.memberId와 item.userId가 혼용되고 있어, 둘 다 확인하도록 유지합니다.
  const isLostOwner = item?.memberId === memberId || item?.userId === memberId;
  const isFinder = !isLostOwner;

  useEffect(() => {
    async function fetchData() {
        // ... 기존 데이터 fetching 로직 ...
        // 이 부분은 제공된 코드의 로직을 그대로 사용한다고 가정합니다.
        setLoading(true);
        setError(null);
        try {
            const itemData = lostPostId ? await new Promise(resolve => setTimeout(() => resolve({
                title: "소니 WH-1000XM4 헤드셋",
                location: "역삼1동",
                timeAgo: "10일 전",
                mainImageUrl: "",
                registrationType: "LOST",
                status: "주인 찾는 중",
                reward: 20000,
                memberId: '1', // 분실자 ID 예시
                nickname: '유저1' // 상대방 이름 예시
            }), 500)) : null;

            setItem(itemData);
            setUserName(itemData?.nickname || '상대방');
            setRoomId(lostPostId);
        } catch (e) {
            setError("채팅방 정보를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, [lostPostId]);

  if (loading) return <div className="w-full h-screen flex items-center justify-center">로딩중...</div>;
  if (error) return <div className="w-full h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <>
    <div className="flex justify-between items-center w-[390px] mx-auto overflow-hidden px-6 py-1.5 bg-white">
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 pr-3 py-2.5">
            <button onClick={() => navigate(-1)}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" preserveAspectRatio="none" >
                <path d="M16.0107 19.9785L8.01074 11.9785L16.0107 3.97852" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <p className="flex-grow-0 flex-shrink-0 text-[22px] font-semibold text-left text-[#111]">
            {userName || '유저1'}
          </p>
        </div>
        <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
          <button onClick={() => setShowOption(true)}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" preserveAspectRatio="none" >
              <path d="M12 16.75C12.4142 16.75 12.75 17.0858 12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5C11.25 17.0858 11.5858 16.75 12 16.75ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25ZM12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5C12.75 6.91421 12.4142 7.25 12 7.25C11.5858 7.25 11.25 6.91421 11.25 6.5C11.25 6.08579 11.5858 5.75 12 5.75Z" stroke="#111111" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 화면 잘림 수정을 위해 h-screen, flex, flex-col 적용 */}
      <div className="w-[390px] max-w-full h-screen bg-white flex flex-col items-center mx-auto">
        {showOption && ( <OptionModal onClose={() => setShowOption(false)} /> )}
        {reportModalType && ( <ReportModal type={reportModalType} onCancel={() => setReportModalType(null)} onConfirm={() => { setReportModalType(null); }} /> )}

        {/* 아이템 카드와 버튼을 포함한 상단 컨텐츠 */}
        <div className="w-full px-6 pt-4">
          <ChatRoomItemCard
            data={
              item || {
                title: "아이폰 14 프로 분실",
                location: "역삼동",
                timeAgo: "10분 전",
                mainImageUrl: "",
                registrationType: "LOST",
                status: "주인 찾는 중",
              }
            }
          />
          
          {/* 습득자용 버튼 */}
          {isFinder && !showDeliveryCompleted && (
             <div
             className="my-4 flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative rounded-lg bg-[#f2f2f2]"
           >
             <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#111]">
               물건 주인을 찾고 있어요
             </p>
           </div>
          )}
          {/* 현상금 지급 완료 후 습득자에게 표시될 버튼 */}
          {isFinder && showDeliveryCompleted && (
            <div
              className="my-4 flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative rounded-lg bg-[#f2f2f2]"
            >
              <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#111]">
                현상금 지급 완료
              </p>
            </div>
          )}

          {/* 분실자용 버튼 */}
          {isLostOwner && (
            <div
              className={`my-4 flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative rounded-lg ${
                showPaymentCompleted
                  ? "bg-[#f2f2f2] text-[#111]"
                  : "bg-[#06f] text-white cursor-pointer"
              }`}
              onClick={
                showPaymentCompleted ? undefined : () => setShowRewardModal(true)
              }
            >
              <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left">
                {showPaymentCompleted ? "현상금 지급 완료" : "현상금 지급하기"}
              </p>
            </div>
          )}
        </div>

        {/* 채팅 영역이 남은 공간을 모두 차지하도록 flex-1, overflow-hidden 적용 */}
        <div className="flex flex-col justify-start items-center w-full flex-1 overflow-hidden">
          <ChatRoomWebSocket
            roomId={String(roomId || lostPostId)}
            memberId={String(memberId)}
            item={item} // item 데이터 전달
            subscribeTopic={`/topic/chat/${String(roomId || lostPostId)}`}
            sendDestination="/app/chat.send"
            isLostOwner={isLostOwner}
            isFinder={isFinder}
            showDeliveryCompleted={showDeliveryCompleted}
            setShowDeliveryCompleted={setShowDeliveryCompleted}
            showPaymentCompleted={showPaymentCompleted}
            setShowPaymentCompleted={setShowPaymentCompleted} // setter 전달
            showRewardModal={showRewardModal}
            setShowRewardModal={setShowRewardModal}
          />
        </div>
      </div>
    </>
  );
};

export default ChatRoomPage;