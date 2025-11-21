import React, { useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { fetchMessages } from "../../services/chatService";
import Message from "./Message";
import MessageInput from "./MessageInput";
import useWebSocket from "../../hooks/useWebSocket";

export default function ChatBox() {
  const { currentRoom, messages, setMessages } = useChat();
  const { token } = useAuth();
  const { sendMessage } = useWebSocket();

  useEffect(() => {
    if (!currentRoom) return;

    async function loadMessages() {
      try {
        const data = await fetchMessages(currentRoom.id, token);
        setMessages(data);
      } catch (e) {
        console.error(e);
      }
    }

    loadMessages();
  }, [currentRoom, token, setMessages]);

  if (!currentRoom) {
    return <div className="chat-box">Select a room to start chatting</div>;
  }

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>{currentRoom.name}</h3>
      </div>
      <div className="chat-messages">
        {messages.map((m, idx) => (
          <Message key={idx} message={m} />
        ))}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
