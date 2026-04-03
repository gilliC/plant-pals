package com.plant_pals.server.dto;

import lombok.Data;

@Data
public class CreateRequestParams {

    private Long plantId;
    private Long userId;
}
