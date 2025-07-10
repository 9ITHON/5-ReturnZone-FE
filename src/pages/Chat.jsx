import React from "react";
import { useParams } from "react-router-dom";
import ChatRoomPage from "../components/ChatRoomPage";

const Chat = () => {
  const { id, roomId } = useParams();
  const resolvedRoomId = id || roomId;
  if (resolvedRoomId) {
    return <ChatRoomPage roomId={resolvedRoomId} />;
  }
  return null;
};

export default Chat;
