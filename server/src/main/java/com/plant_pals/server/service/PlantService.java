package com.plant_pals.server.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.plant_pals.server.entity.Plant;
import com.plant_pals.server.repository.PlantRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlantService {

    private final PlantRepository plantRepository;

    public Plant createPlant(Plant plant) {
        plant.setUpdatedAt(LocalDateTime.now());
        return plantRepository.save(plant);
    }

    public Iterable<Plant> getPlants() {
        return plantRepository.findAll();
    }

    public Plant getPlantById(Long id) {
        return plantRepository.findById(id).orElseThrow(() -> new RuntimeException("Plant not found"));
    }
}
