package com.realchat.backend.service;

import java.util.List;

import com.realchat.backend.dto.ChatMessageDto;
import com.realchat.backend.model.ChatRoom;

public interface ChatService {

    List<ChatRoom> getAllRooms();

    List<ChatMessageDto> getMessagesForRoom(Long roomId);

    ChatMessageDto saveIncomingMessage(ChatMessageDto dto);
}
