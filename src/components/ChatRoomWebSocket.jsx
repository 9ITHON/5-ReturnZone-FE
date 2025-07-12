import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { GetMyPage } from "../utils/GetMyPage";
import { formatNumber } from "../utils/formatNumber";

const ChatRoomWebSocket = ({
  memberId,
  item, // item 데이터를 prop으로 받음
  isLostOwner = false,
  isFinder = false,
  showPaymentCompleted = false,
  showRewardModal = false,
  setShowRewardModal = () => {},
  setShowDeliveryCompleted = () => {},
  setShowPaymentCompleted = () => {}, // prop 추가
}) => {
  const initialMyMessages = [
    {
      id: 1001,
      memberId: memberId,
      content: "아래는 습득자가 등록한 분실물 특징입니다. 분실물과 비교하여 정확하게 답변해 주세요.",
      createdAt: "2024-06-10T10:00:01.000Z",
    },
    {
      id: 1002,
      memberId: memberId,
      content: "1. 분실물에 흠집이나 손상이 있나요?",
      createdAt: "2024-06-10T10:00:02.000Z",
    },
    {
      id: 1003,
      memberId: memberId,
      content: "2. 분실물을 어디서 잃어버리셨나요?",
      createdAt: "2024-06-10T10:00:03.000Z",
    },
  ];
  const dummyMessages = [
    {
      id: 1,
      memberId: "other",
      content: "상단에 약간의 흠집이 있습니다!",
      createdAt: "2024-06-10T10:00:05.000Z",
    },
    {
      id: 2,
      memberId: "other",
      content: "도서관 근처에서 잃어버렸습니다",
      createdAt: "2024-06-10T10:00:10.000Z",
    },
    {
      id: 3,
      memberId: "other",
      content: "아마 다마고치 스티커가 붙여져 있을거에요!",
      createdAt: "2024-06-10T10:00:15.000Z",
    },
  ];
  const [messages, setMessages] = useState(initialMyMessages);
  const [input, setInput] = useState("");
  const [dummyIndex, setDummyIndex] = useState(0); 
  const [rewardAmount, setRewardAmount] = useState(""); 
  const [isAgreed, setIsAgreed] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await GetMyPage();
        setUserInfo(data);
      } catch (error) {
        console.error("사용자 정보 로딩 실패:", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (dummyIndex === 0) {
      const timer = setTimeout(() => {
        setDummyIndex(1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (dummyIndex > 0 && dummyIndex <= dummyMessages.length) {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            ...dummyMessages[dummyIndex - 1],
            id: Date.now() + dummyIndex,
            createdAt: new Date().toISOString(),
          },
        ]);
        setDummyIndex(dummyIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [dummyIndex]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const myMsg = {
      id: Date.now(),
      memberId: memberId,
      content: input,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, myMsg]);
    setInput("");
  };

  const handleRewardPayment = () => {
    if (!isAgreed || !rewardAmount.trim()) return;
    // TODO: 실제 현상금 지급 API 호출 로직
    console.log("현상금 지급 API 호출:", rewardAmount);
    setShowRewardModal(false);
    setShowDeliveryCompleted(true); // 습득자 버튼 상태 변경용
    setShowPaymentCompleted(true);  // 분실자에게 지급 완료 알림 표시용
    setRewardAmount("");
    setIsAgreed(false);
  };
  
  const handleRewardAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setRewardAmount(value);
  };
  
  const formatNumberLocal = (num) => {
    if (!num) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const isButtonEnabled = isAgreed && rewardAmount.trim() !== "";

  return (
    <div className="flex flex-col h-full w-full bg-white" style={{ minHeight: 0, height: '100%', maxWidth: 480, width: '100vw', margin: '0 auto' }}>
      <div
        className="flex-1 overflow-y-auto px-2 py-2 min-h-0"
        style={{ background: '#fff' }}
      >
        <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mb-2">
          <p className="flex-grow w-[314px] text-sm font-medium text-left text-[#111]">
            <span className="flex-grow w-[314px] text-sm font-medium text-left text-[#111]">
              ❗현상금 요구는 가능하지만 강제할 수 없고,{' '}
            </span>
            <br />
            <span className="flex-grow w-[314px] text-sm font-medium text-left text-[#111]">
              물건 가치의 20%를 넘기면 법적 문제가 될 수 있습니다.
            </span>
            <br />
            <span className="flex-grow w-[314px] text-sm font-medium text-left text-[#111]">
              또한 습득자가 반환을 거부하거나 악의로 보관하면 법적 책임을 질 수 있습니다.
            </span>
          </p>
        </div>
        <div className="flex flex-col w-full min-h-0">
          {messages.map((msg, idx) => {
            const isMine = String(msg.memberId) === String(memberId);
            const isLastOfGroup =
              idx === messages.length - 1 ||
              String(messages[idx + 1]?.memberId) !== String(msg.memberId);
            return (
              <ChatMessage
                key={msg.id || idx}
                message={msg}
                isMine={isMine}
                senderName={isMine ? "나" : "상대방"}
                showSenderName={!isMine && isLastOfGroup}
              />
            );
          })}
          
          {/* 마지막 메시지 시간과 읽음 상태 표시 */}
          {messages.length > 0 && (
            <div className={`flex items-center gap-1 mt-1 w-fit ${String(messages[messages.length - 1].memberId) === String(memberId) ? 'ml-auto' : 'mr-auto'}`}>
              {String(messages[messages.length - 1].memberId) === String(memberId) && (
                <p className="text-xs font-medium text-[#808080]">읽음</p>
              )}
              <p className="text-xs text-[#808080]">
                {new Date(messages[messages.length - 1].createdAt).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Seoul',
                })}
              </p>
            </div>
          )}

          {/* 분실자에게 현상금 지급 완료 알림 */}
          {isFinder && showFoundOwnerMsg && !showDeliveryCompleted && (
            <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mt-2 mb-2">
              <p className="flex-grow w-[314px] text-sm font-medium text-left text-[#111]">
                <span className="flex-grow w-[314px] text-sm font-medium text-left text-[#111]">
                  📦 물건 전달이 시작되었습니다.
                </span>
                <br />
                <span className="flex-grow w-[314px] text-sm font-medium text-left text-[#111]">
                  물건을 받으셨다면, 상단의 버튼을 눌러주세요.
                </span>
                <br />
                <span className="flex-grow w-[314px] text-sm font-medium text-left text-[#111]">
                  버튼을 누르면 물건을 찾아준 분에게 현상금이 지급됩니다.
                </span>
              </p>
            </div>
          )}
          {/* 안내문이 입력창에 가려지지 않도록 24px 여유 공간 */}
          <div style={{height:24}} />
          <div ref={messagesEndRef} />
        </div>
        {/* 마지막 메시지 시간만 하단에 표시 */}
        {messages.length > 0 && (
          <div className="flex justify-end items-center w-full mt-2 pr-4">
            <span className="text-xs text-[#808080]">
              {(() => {
                const lastMsg = messages[messages.length - 1];
                const date = new Date(lastMsg.createdAt);
                return date.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Seoul',
                });
              })()}
            </span>
          </div>
        )}
    
        {showFoundOwnerMsg && isLostOwner && (
          <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mb-2">
            <p className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                📦 물건 전달이 시작되었습니다.
              </span>
              <br />
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                물건을 받으셨다면, 상단의 버튼을 눌러주세요.
              </span>
              <br />
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                버튼을 누르면 물건을 찾아준 분에게 현상금이 지급됩니다.
              </span>
            </p>
          </div>
        )}
        {showPaymentCompleted && isLostOwner && (
          <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mb-2">
            <p className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
              ✅ 습득자에게 현상금이 지급되었어요. 감사합니다!
            </p>
          </div>
        )}
          
          <div style={{height:24}} />
          <div ref={messagesEndRef} />
        </div>
      </div>
  );
      
      {/* 현상금 지급 모달 */}
      {showRewardModal && (
        <div 
          className="fixed inset-0 bg-[#111]/50 bg-opacity-50 z-50 flex items-end justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRewardModal(false);
              setRewardAmount("");
              setIsAgreed(false);
            }
          }}
        >
          <div className="flex flex-col justify-start items-center w-[390px] overflow-hidden gap-2.5 rounded-tl-2xl rounded-tr-2xl bg-white">
             <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1">
              <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5">
                <div className="flex-grow-0 flex-shrink-0 w-[30px] h-1 rounded-[5px] bg-[#e6e6e6]" />
              </div>
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
                <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-0.5 px-6 py-[11px]">
                  <p className="self-stretch flex-grow-0 flex-shrink-0 w-[342px] text-lg font-bold text-center text-[#111]">
                    현상금 지급하기
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-start flex-grow-0 flex-shrink-0 w-[390px] h-[58px]">
                <div className="flex justify-between items-center flex-grow overflow-hidden px-6 py-[11px]">
                  <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                    <div className="flex-grow-0 flex-shrink-0 w-9 h-9 relative">
                      <img
                        src={userInfo?.imageUrl || "rectangle-3468137.jpeg"}
                        className="w-9 h-9 absolute left-[-0.82px] top-[-0.82px] rounded-[18px] object-cover"
                        alt="user profile"
                      />
                    </div>
                    <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-center text-[#111]">
                      {userInfo?.nickname || "유저"}
                    </p>
                  </div>
                  <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
                    <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#808080]">
                      보유 포인트
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#111]">
                      {userInfo ? formatNumber(userInfo.point) : "0"}원
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
                <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-3 px-6 pt-2 pb-[72px]">
                  <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2">
                    <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2">
                      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1">
                        <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#111]">
                          현상금
                        </p>
                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-[#06f]">
                           {item?.reward ? `${formatNumber(item.reward)}원 중` : ''}
                        </p>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="flex-grow-0 flex-shrink-0 text-4xl font-bold text-left text-[#111] bg-transparent border-none outline-none"
                      placeholder="얼마나 지급할까요?"
                      value={formatNumberLocal(rewardAmount)}
                      onChange={handleRewardAmountChange}
                      maxLength={10}
                    />
                  </div>
                  <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1 py-0.5">
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-4 h-4 relative" preserveAspectRatio="none" >
                      <path d="M8 5.33333V8.66667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="#808080" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <circle cx="0.666667" cy="0.666667" r="0.5" transform="matrix(-1 0 0 1 8.66699 10)" fill="#808080" stroke="#808080" strokeWidth="0.333333" />
                    </svg>
                    <p className="flex-grow w-[322px] text-sm text-left text-[#808080]">
                      현상금은 0원 입력도 가능하며, 물건 금액의 5~20% 지급을 권장하고, 지급 시 자동으로 '해결
                      완료' 상태로 전환됩니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 h-11">
                 <div className="flex justify-between items-center flex-grow relative overflow-hidden px-6">
                   <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
                     <button
                       onClick={() => setIsAgreed(!isAgreed)}
                       className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative"
                     >
                       <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-11 h-11 relative" preserveAspectRatio="none">
                         <rect x="11.5" y="11.5" width={21} height={21} rx="3.5" stroke={isAgreed ? "#06f" : "#808080"} fill={isAgreed ? "#06f" : "transparent"} />
                         {isAgreed && (
                           <path fillRule="evenodd" clipRule="evenodd" d="M20.1723 24.8999L26.9661 18L28 19.05L20.1723 27L16 22.7625L17.0339 21.7125L20.1723 24.8999Z" fill="white" />
                         )}
                       </svg>
                       <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center text-[#4d4d4d]">
                         약관 동의하기
                       </p>
                     </button>
                   </div>
                 </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[110px] w-[390px] gap-[38px] py-3">
              <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5 px-6">
                <button
                  onClick={handleRewardPayment}
                  disabled={!isButtonEnabled}
                  className="flex flex-col justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-14 overflow-hidden px-4 py-3.5 rounded-lg bg-[#06f] disabled:bg-[#e6e6e6] disabled:text-[#808080]"
                >
                  <div className="flex justify-center items-center self-stretch flex-grow relative overflow-hidden gap-1.5">
                    <p className="flex-grow w-[310px] text-base font-semibold text-center text-white">
                      {isButtonEnabled ? "선택 완료" : "지급하기"}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 메시지 입력 바 */}
       <div
        className="flex flex-col justify-start items-center bg-white"
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 0,
          zIndex: 20,
          width: '100%',
          maxWidth: 390,
        }}
      >
        <div className="flex justify-center items-center w-full gap-2.5 px-2 py-2 bg-white">
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5 px-6">
            <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative " preserveAspectRatio="none">
                <path d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M7.8523 5.34341L7.86169 5.31319C8.10539 4.52919 8.79233 4 9.56632 4L14.4337 4C15.2076 4 15.8946 4.52919 16.1383 5.31319L16.1477 5.34341C16.2695 5.7354 16.613 6 17 6L18 6C19.6569 6 21 7.34315 21 9V17C21 18.6569 19.6569 20 18 20H6C4.34315 20 3 18.6569 3 17L3 9C3 7.34315 4.34315 6 6 6L6.99999 6C7.38699 6 7.73045 5.7354 7.8523 5.34341Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="flex justify-start items-center flex-grow h-11 overflow-hidden gap-3 px-3 py-[11px] rounded-[22px] bg-[#f2f2f2]">
              <input
                type="text"
                className="flex-grow text-base font-medium text-left text-[#111] bg-[#f2f2f2] outline-none border-none"
                placeholder="메시지 보내기"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
            </div>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
              <button onClick={sendMessage} disabled={!input.trim()}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" preserveAspectRatio="none">
                  <g clipPath="url(#clip0_652_9848)">
                    <path d="M21.2847 12.1421L4.46546 20.2403C3.64943 20.6332 2.77317 19.8256 3.0983 18.9803L5.72836 12.1421M21.2847 12.1421L4.46546 4.04397C3.64943 3.65107 2.77317 4.45864 3.0983 5.30396L5.72836 12.1421M21.2847 12.1421H5.72836" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>
                  <defs>
                    <clipPath id="clip0_652_9848)">
                      <rect width={24} height={24} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatRoomWebSocket;