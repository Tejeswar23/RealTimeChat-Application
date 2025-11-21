import { API_BASE_URL } from "../utils/constants";

export async function fetchRooms(token) {
  const res = await fetch(`${API_BASE_URL}/chat/rooms`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (!res.ok) throw new Error("Failed to load rooms");
  return res.json();
}

export async function fetchMessages(roomId, token) {
  const res = await fetch(`${API_BASE_URL}/chat/rooms/${roomId}/messages`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (!res.ok) throw new Error("Failed to load messages");
  return res.json();
}
