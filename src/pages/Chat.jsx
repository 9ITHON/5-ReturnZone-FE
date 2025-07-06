import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav.jsx";
import chatIcon from "../assets/chat.svg";
import { Chatroom } from "../components/Chatroom.jsx";

const Chat = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms([
      {
        chatName: "아무거나",
        previewMessage: "아무거나",
      },
      {
        chatName: "1111",
        previewMessage: "2222",
      },
    ]);
  }, []);

  return (
    <div>
      <div className="flex flex-col-reverse">{rooms.map(Chatroom)}</div>
    </div>
  );
};

export default Chat;
