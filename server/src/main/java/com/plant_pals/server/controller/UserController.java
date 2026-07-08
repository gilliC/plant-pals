package com.plant_pals.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.plant_pals.server.dto.AuthRequest;
import com.plant_pals.server.dto.AuthResponse;
import com.plant_pals.server.dto.UserResponse;
import com.plant_pals.server.entity.User;
import com.plant_pals.server.security.JwtService;
import com.plant_pals.server.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody AuthRequest request) {
        try {
            User user = userService.createUser(request.getName(), request.getPassword(), request.getEmail());
            String token = jwtService.generateToken(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token, new UserResponse(user)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            User user = userService.login(request.getName(), request.getPassword());
            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(token, new UserResponse(user)));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
