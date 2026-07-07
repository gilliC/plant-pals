package com.plant_pals.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SubscriptionRequest {

    @NotNull
    private Long userId;

    @NotBlank
    private String plantName;
}
