package com.plant_pals.server.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateRequestParams {

    @NotNull
    private Long plantId;

    @NotNull
    private Long userId;
}
