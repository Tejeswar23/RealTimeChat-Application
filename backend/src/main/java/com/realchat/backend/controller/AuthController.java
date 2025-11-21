package com.realchat.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realchat.backend.dto.LoginRequest;
import com.realchat.backend.dto.RegisterRequest;
import com.realchat.backend.dto.UserResponseDto;
import com.realchat.backend.model.User;
import com.realchat.backend.security.JwtUtil;
import com.realchat.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager,
                          UserService userService,
                          JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody RegisterRequest request) {
        User user = userService.registerUser(request);
        UserResponseDto dto = new UserResponseDto(user.getId(), user.getUsername());
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword())
        );

        String token = jwtUtil.generateToken(request.getUsername());
        User user = userService.findByUsername(request.getUsername());

        Map<String, Object> body = new HashMap<>();
        body.put("token", token);
        body.put("user", new UserResponseDto(user.getId(), user.getUsername()));

        return ResponseEntity.ok(body);
    }
}
