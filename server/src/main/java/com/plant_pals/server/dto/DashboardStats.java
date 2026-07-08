package com.plant_pals.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStats {

    private long plantsListed;
    private long adopted;
    private long pendingReview;
    private long subscribers;
}
