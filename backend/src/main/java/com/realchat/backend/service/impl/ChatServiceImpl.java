package com.realchat.backend.service.impl;

import com.realchat.backend.dto.ChatMessageDto;
import com.realchat.backend.exception.CustomException;
import com.realchat.backend.model.ChatRoom;
import com.realchat.backend.model.Message;
import com.realchat.backend.model.User;
import com.realchat.backend.repository.ChatRoomRepository;
import com.realchat.backend.repository.MessageRepository;
import com.realchat.backend.repository.UserRepository;
import com.realchat.backend.service.ChatService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public ChatServiceImpl(ChatRoomRepository chatRoomRepository,
                           MessageRepository messageRepository,
                           UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ChatRoom> getAllRooms() {
        return chatRoomRepository.findAll();
    }

    @Override
    public List<ChatMessageDto> getMessagesForRoom(Long roomId) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException("Room not found"));

        return messageRepository.findByRoomOrderByTimestampAsc(room).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ChatMessageDto saveIncomingMessage(ChatMessageDto dto) {
        ChatRoom room = chatRoomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new CustomException("Room not found"));

        User sender = userRepository.findByUsername(dto.getSender())
                .orElseThrow(() -> new CustomException("Sender not found"));

        Message msg = new Message(room, sender, dto.getContent());
        Message saved = messageRepository.save(msg);

        return toDto(saved);
    }

    private ChatMessageDto toDto(Message m) {
        return new ChatMessageDto(
                m.getId(),
                m.getRoom().getId(),
                m.getSender().getUsername(),
                m.getContent(),
                m.getTimestamp()
        );
    }
}
