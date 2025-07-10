import React from "react";

const ReportModal = ({ onCancel, onConfirm, type = "report" }) => {
  const isBlock = type === "block";
  const isExit = type === "exit";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div
        className="flex flex-col justify-center items-center w-[270px] overflow-hidden rounded-[14px] bg-[#f2f2f2]/80 backdrop-blur-[50px]"
        style={{ boxShadow: "0px 0px 32px 0 rgba(0,0,0,0.2)" }}
      >
        <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[270px] relative gap-1 px-4 py-5">
          <p className="self-stretch flex-grow-0 flex-shrink-0 w-[238px] text-lg font-bold text-center text-[#111]">
            {isExit
              ? "채팅방을 나가시겠습니까?"
              : isBlock
              ? "상대방을 차단하시겠습니까?"
              : "이 사용자를 신고하시겠습니까?"}
          </p>
          <p className="self-stretch flex-grow-0 flex-shrink-0 w-[238px] text-[12px] text-center text-[#111]">
            {isExit ? (
              <>
                <span className="self-stretch flex-grow-0 flex-shrink-0 w-[238px] text-[12px] text-center text-[#111]">
                  나가면 더 이상 대화를 주고받을 수{" "}
                </span>
                <br />
                <span className="self-stretch flex-grow-0 flex-shrink-0 w-[238px] text-[12px] text-center text-[#111]">
                  없습니다.
                </span>
              </>
            ) : isBlock ? (
              <>
                <span className="self-stretch flex-grow-0 flex-shrink-0 w-[238px] text-[12px] text-center text-[#111]">
                  차단 시 더 이상 메시지를 주고받을 수{" "}
                </span>
                <br />
                <span className="self-stretch flex-grow-0 flex-shrink-0 w-[238px] text-[12px] text-center text-[#111]">
                  없습니다.
                </span>
              </>
            ) : (
              <>
                <span className="self-stretch flex-grow-0 flex-shrink-0 w-[238px] text-[12px] text-center text-[#111]">
                  신고는 운영팀에 전달되며,{' '}
                </span>
                <br />
                <span className="self-stretch flex-grow-0 flex-shrink-0 w-[238px] text-[12px] text-center text-[#111]">
                  허위 신고 시 제재될 수 있습니다.
                </span>
              </>
            )}
          </p>
        </div>
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[270px] relative">
          <div className="flex-grow h-11 relative border-t-[0.33px] border-r-0 border-b-0 border-l-0 border-[#808080] cursor-pointer" onClick={onCancel}>
            <p className="absolute left-[52px] top-[11px] text-base font-medium text-center text-[#06f]">
              취소
            </p>
          </div>
          <div className="flex-grow-0 flex-shrink-0 w-[0.33px] h-11 relative bg-[#808080]" />
          <div className="flex-grow h-11 relative border-t-[0.33px] border-r-0 border-b-0 border-l-0 border-[#808080] cursor-pointer" onClick={onConfirm}>
            <p className={`absolute top-[11px] text-base font-semibold text-center text-[#06f] ${isExit ? 'left-[45px]' : 'left-[39px]'}`}>
              {isExit ? "나가기" : isBlock ? "차단하기" : "신고하기"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal; 