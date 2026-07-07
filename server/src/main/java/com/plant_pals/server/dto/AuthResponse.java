package com.plant_pals.server.dto;

import com.plant_pals.server.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private User user;
}
