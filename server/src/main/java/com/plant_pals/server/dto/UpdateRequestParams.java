package com.plant_pals.server.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateRequestParams {

    @NotNull
    private Long requestId;

    @NotNull
    private Long userId;
}
