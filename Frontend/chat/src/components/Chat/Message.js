import React from "react";
import { useAuth } from "../../context/AuthContext";
import { formatTime } from "../../utils/formatTime";

export default function Message({ message }) {
  const { user } = useAuth();
  const isMine = user && user.username === message.sender;

  return (
    <div className={`message ${isMine ? "mine" : "theirs"}`}>
      <div className="message-header">
        <span className="message-sender">{isMine ? "You" : message.sender}</span>
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
}
