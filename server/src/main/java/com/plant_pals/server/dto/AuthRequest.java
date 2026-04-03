package com.plant_pals.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String password;
}
