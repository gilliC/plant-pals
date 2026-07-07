package com.plant_pals.server.dto;

import com.plant_pals.server.entity.Role;
import com.plant_pals.server.entity.User;

import lombok.Data;

@Data
public class UserResponse {

    private Long id;
    private String name;
    private Role role;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.role = user.getRole();
    }
}
