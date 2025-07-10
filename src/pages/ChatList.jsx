import React from "react";
import ChatroomList from "../components/ChatroomList";

const ChatList = () => {
  // const { unreadCount } = useOutletContext() || {};

  return (
    <>
      <ChatroomList />
      {/* <BottomNav /> 중복 렌더링 제거 */}
    </>
  );
};

export default ChatList; 