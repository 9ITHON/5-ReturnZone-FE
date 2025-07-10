import React from "react";
import ChatroomList from "../components/ChatroomList";
import BottomNav from "../components/BottomNav";

const ChatList = () => {
  // const { unreadCount } = useOutletContext() || {};

  return (
    <>
      <ChatroomList />
      <BottomNav />
    </>
  );
};

export default ChatList; 