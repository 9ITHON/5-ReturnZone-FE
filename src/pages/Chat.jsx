import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import ChatRoomPage from "../components/ChatRoomPage";

const Chat = () => {
  const { id } = useParams();
  const { onMessageRead } = useOutletContext();

  if (id) {
    return <ChatRoomPage chatId={id} onMessageRead={() => onMessageRead(id)} />;
  }
  return null;
};

export default Chat;
