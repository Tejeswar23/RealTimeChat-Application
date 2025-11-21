package com.realchat.backend.dto;

import java.time.Instant;

public class ChatMessageDto {

    private Long id;
    private Long roomId;
    private String sender;   // username
    private String content;
    private Instant timestamp;

    public ChatMessageDto() {}

    public ChatMessageDto(Long id, Long roomId, String sender, String content, Instant timestamp) {
        this.id = id;
        this.roomId = roomId;
        this.sender = sender;
        this.content = content;
        this.timestamp = timestamp;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getRoomId() { return roomId; }

    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public String getSender() { return sender; }

    public void setSender(String sender) { this.sender = sender; }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content; }

    public Instant getTimestamp() { return timestamp; }

    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
