import React from "react";
import { useOutletContext } from "react-router-dom";
import ChatroomList from "../components/ChatroomList";

const ChatList = () => {
  const { unreadCount } = useOutletContext();

  return (
    <>
      <ChatroomList /> 
    </>
  );
};

export default ChatList; 