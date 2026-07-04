package com.plant_pals.server.service;

import org.springframework.stereotype.Service;

import com.plant_pals.server.dto.DashboardStats;
import com.plant_pals.server.entity.PlantStatus;
import com.plant_pals.server.entity.RequestStatus;
import com.plant_pals.server.repository.PlantRepository;
import com.plant_pals.server.repository.RequestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final PlantRepository plantRepository;
    private final RequestRepository requestRepository;

    public DashboardStats getDashboardStats() {
        return new DashboardStats(
                plantRepository.count(),
                plantRepository.countByStatus(PlantStatus.ADOPTED),
                requestRepository.countByStatus(RequestStatus.PENDING));
    }
}
