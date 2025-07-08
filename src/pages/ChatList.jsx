import React from "react";
import { useOutletContext } from "react-router-dom";
import ChatroomList from "../components/ChatroomList";
import BottomNav from "../components/BottomNav";

const ChatList = () => {
  const { unreadCount } = useOutletContext();

  return (
    <>
      <ChatroomList />
      <BottomNav unreadCount={unreadCount} />
    </>
  );
};

export default ChatList; 