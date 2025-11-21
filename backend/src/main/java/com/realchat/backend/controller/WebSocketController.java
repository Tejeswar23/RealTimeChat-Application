package com.realchat.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Optional simple REST controller just to test backend is alive.
@RestController
public class WebSocketController {

    @GetMapping("/api/ping")
    public String ping() {
        return "Backend is running";
    }
}
