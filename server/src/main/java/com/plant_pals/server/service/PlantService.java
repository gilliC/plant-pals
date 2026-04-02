package com.plant_pals.server.service;

import org.springframework.stereotype.Service;

import com.plant_pals.server.entity.Plant;
import com.plant_pals.server.repository.PlantRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlantService {

    private final PlantRepository plantRepository;

    public Plant createPlant(Plant plant) {
        return plantRepository.save(plant);
    }

    public Iterable<Plant> getPlants() {
        return plantRepository.findAll();
    }

    public Plant getPlantById(Long id) {
        return plantRepository.findById(id).orElseThrow(() -> new RuntimeException("Plant not found"));
    }
}
