package com.realchat.backend.websocket;

import com.realchat.backend.dto.ChatMessageDto;
import com.realchat.backend.service.ChatService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatSocketController(SimpMessagingTemplate messagingTemplate,
                                ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    // Frontend sends to: /app/chat.send/{roomId}
    @MessageMapping("/chat.send/{roomId}")
    public void sendMessage(@DestinationVariable Long roomId, ChatMessageDto incoming) {
        incoming.setRoomId(roomId);
        ChatMessageDto saved = chatService.saveIncomingMessage(incoming);

        // Broadcast to subscribers of: /topic/rooms/{roomId}
        String destination = "/topic/rooms/" + roomId;
        messagingTemplate.convertAndSend(destination, saved);
    }
}
