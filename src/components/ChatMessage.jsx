import React from 'react';

const ChatMessage = ({ message, isMine, senderName, showSenderName = false }) => {
  return (
    <div className={`flex w-full mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} w-full`}>
        {/* 상대방 이름 */}
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
              ? 'flex justify-end items-end px-4 py-2.5 rounded-[22px] bg-[#06f] w-fit max-w-[80%] ml-auto'
              : 'flex flex-col justify-start items-start px-4 py-2.5 rounded-[22px] bg-[#f2f2f2] w-fit max-w-[80%] mr-auto'
          }
        >
          <p
            className={
              isMine
                ? 'text-base text-left text-white break-words'
                : 'text-base text-left text-[#111] break-words'
            }
            style={{ wordBreak: 'break-all' }}
          >
            {message.content}
          </p>
        </div>
        {/* 시간 표시와 읽음 표시는 ChatRoomWebSocket에서 마지막 메시지에만 표시되도록 제거됨 */}
      </div>
    </div>
  );
};

export default ChatMessage;