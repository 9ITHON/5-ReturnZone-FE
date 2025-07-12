import React from 'react';

const ChatMessage = ({ message, isMine, senderName, showSenderName = false }) => {
  // 시간 포맷 함수
  const getTimeStr = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Seoul',
    });
  };

  return (
    <div className={`flex w-full mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className="flex flex-col items-end">
        {/* 다른 사용자 메시지일 때만 이름 표시 */}
        {!isMine && showSenderName && (
          <div className="flex justify-start items-start self-stretch mb-1">
            <p className="text-sm text-left text-[#808080] font-medium">
              {senderName || '사용자'}
            </p>
          </div>
        )}
        
        <div
          className={
            isMine
              ? 'flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-2.5 px-4 py-2.5 rounded-[22px] bg-[#06f]'
              : 'flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-4 py-2.5 rounded-[22px] bg-[#f2f2f2]'
          }
        >
          <p
            className={
              isMine
                ? 'flex-grow w-[181px] text-base text-left text-white'
                : 'flex-grow-0 flex-shrink-0 w-[186px] text-base text-left text-[#111]'
            }
          >
            {message.content}
          </p>
        </div>
        
        {/* 시간 표시 */}
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1 mt-1 mr-1">
          <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">
            {getTimeStr(message.createdAt)}
          </p>
          {isMine && (
            <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#808080]">
              읽음
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 