import React from "react";
import { useParams, useLocation } from "react-router-dom";
import ChatRoomPage from "../components/ChatRoomPage";

const Chat = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lostPostId = searchParams.get('lostPostId');
  const resolvedRoomId = roomId || lostPostId;
  if (resolvedRoomId) {
    return <ChatRoomPage roomId={resolvedRoomId} />;
  }
  return null;
};

export default Chat;
