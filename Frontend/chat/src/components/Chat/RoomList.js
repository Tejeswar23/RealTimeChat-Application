import React, { useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { fetchRooms } from "../../services/chatService";

export default function RoomList() {
  const { rooms, setRooms, currentRoom, setCurrentRoom } = useChat();
  const { token } = useAuth();

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await fetchRooms(token);
        setRooms(data);
        if (data.length && !currentRoom) {
          setCurrentRoom(data[0]);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadRooms();
  }, [token, setRooms, currentRoom, setCurrentRoom]);

  return (
    <div className="room-list">
      <h3>Rooms</h3>
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`room-item ${currentRoom && room.id === currentRoom.id ? "active" : ""}`}
          onClick={() => setCurrentRoom(room)}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
}
