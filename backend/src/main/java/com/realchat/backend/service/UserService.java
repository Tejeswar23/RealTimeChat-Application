package com.realchat.backend.service;

import com.realchat.backend.dto.RegisterRequest;
import com.realchat.backend.model.User;

public interface UserService {

    User registerUser(RegisterRequest request);

    User findByUsername(String username);
}
