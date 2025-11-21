package com.realchat.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realchat.backend.model.ChatRoom;
import com.realchat.backend.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByRoomOrderByTimestampAsc(ChatRoom room);
}
