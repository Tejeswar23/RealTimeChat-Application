import { Client } from "@stomp/stompjs";
import { createSocket } from "./socket";
import { APP_PREFIX, TOPIC_PREFIX } from "../utils/constants";

let client = null;

export function connectStomp({ onConnected, onError, onMessage, roomId, token }) {
  client = new Client({
    webSocketFactory: () => createSocket(),
    reconnectDelay: 5000,
    connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    debug: () => {},
  });

  client.onConnect = () => {
    if (roomId) {
      client.subscribe(`${TOPIC_PREFIX}/rooms/${roomId}`, (frame) => {
        const body = JSON.parse(frame.body);
        onMessage && onMessage(body);
      });
    }
    onConnected && onConnected();
  };

  client.onStompError = (frame) => {
    console.error("Broker error", frame.headers["message"]);
    onError && onError(frame);
  };

  client.activate();
}

export function sendChatMessage(roomId, message) {
  if (!client || !client.connected) return;
  client.publish({
    destination: `${APP_PREFIX}/chat.send/${roomId}`,
    body: JSON.stringify(message),
  });
}

export function disconnectStomp() {
  if (client && client.active) {
    client.deactivate();
  }
}
