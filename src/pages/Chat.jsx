import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import ChatRoomPage from "../components/ChatRoomPage";

const Chat = () => {
  const { id } = useParams();
  const { onMessageRead, unreadCount } = useOutletContext();

  if (id) {
    return (
      <>
        <ChatRoomPage chatRoomId={id} onMessageRead={() => onMessageRead(id)} />
      </>
    );
  }
  return null;
};

export default Chat;
