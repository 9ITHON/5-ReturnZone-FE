import React from 'react';

const ChatMessage = ({ message, isMine, senderName, showSenderName = false }) => {
  return (
    <div className={`flex w-full mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
        style={{ maxWidth: '80%' }}
      >
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
              ? 'px-4 py-2.5 rounded-[22px] bg-[#06f] text-white ml-auto mr-2'
              : 'px-4 py-2.5 rounded-[22px] bg-[#f2f2f2] text-[#111] mr-auto ml-1'
          }
          style={{ maxWidth: '100%', wordBreak: 'break-word' }}
        >
          <p className="text-base">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 