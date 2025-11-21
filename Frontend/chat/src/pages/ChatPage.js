import React from "react";
import RoomList from "../components/Chat/RoomList";
import ChatBox from "../components/Chat/ChatBox";

export default function ChatPage() {
  return (
    <div className="page chat-page">
      <div className="chat-layout">
        <RoomList />
        <ChatBox />
      </div>
    </div>
  );
}
