import { useEffect, useRef } from "react";
import { connectStomp, disconnectStomp, sendChatMessage } from "../websocket/stompClient";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

export default function useWebSocket() {
  const { token, user } = useAuth();
  const { currentRoom, setMessages } = useChat();
  const roomIdRef = useRef(null);

  useEffect(() => {
    if (!currentRoom) return;

    roomIdRef.current = currentRoom.id;

    connectStomp({
      roomId: currentRoom.id,
      token,
      onMessage: (msg) => {
        setMessages((prev) => [...prev, msg]);
      },
      onError: (err) => console.error("WebSocket error", err),
    });

    return () => {
      disconnectStomp();
    };
  }, [currentRoom, token, setMessages]);

  const sendMessage = (content) => {
    if (!currentRoom || !user) return;
    const payload = {
      roomId: currentRoom.id,
      sender: user.username,
      content,
      timestamp: new Date().toISOString(),
    };
    sendChatMessage(currentRoom.id, payload);
    // Optionally also append locally:
    setMessages((prev) => [...prev, payload]);
  };

  return { sendMessage };
}
