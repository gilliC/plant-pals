package com.plant_pals.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.plant_pals.server.dto.AuthRequest;
import com.plant_pals.server.entity.User;
import com.plant_pals.server.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody AuthRequest request) {
        return userService.createUser(request.getName(), request.getPassword());
    }

    @PostMapping("/login")
    public User login(@RequestBody AuthRequest request) {
        return userService.login(request.getName(), request.getPassword());
    }

}
