import React from "react";
import { useParams } from "react-router-dom";
import ChatRoomPage from "../components/ChatRoomPage";

const Chat = () => {
  const { id } = useParams();
  if (id) {
    return <ChatRoomPage />;
  }
  return null;
};

export default Chat;
