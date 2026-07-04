package com.plant_pals.server.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.plant_pals.server.entity.Category;
import com.plant_pals.server.entity.Plant;
import com.plant_pals.server.entity.PlantStatus;
import com.plant_pals.server.repository.CategoryRepository;
import com.plant_pals.server.repository.PlantRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlantService {

    private final PlantRepository plantRepository;
    private final CategoryRepository categoryRepository;

    public Plant createPlant(Plant plant) {
        Category category = categoryRepository.findByName(plant.getCategory().getName())
                .orElseGet(() -> categoryRepository.save(plant.getCategory()));
        plant.setCategory(category);
        plant.setStatus(PlantStatus.AVAILABLE);
        LocalDateTime now = LocalDateTime.now();
        plant.setCreatedAt(now);
        plant.setUpdatedAt(now);
        return plantRepository.save(plant);
    }

    public Iterable<Plant> getPlants() {
        return plantRepository.findAll();
    }

    public Plant getPlantById(Long id) {
        return plantRepository.findById(id).orElseThrow(() -> new RuntimeException("Plant not found"));
    }

    public Plant updatePlant(Long id, Plant plant) {
        Plant existing = getPlantById(id);
        Category category = categoryRepository.findByName(plant.getCategory().getName())
                .orElseGet(() -> categoryRepository.save(plant.getCategory()));

        existing.setCategory(category);
        existing.setName(plant.getName());
        existing.setShortDescription(plant.getShortDescription());
        existing.setDescription(plant.getDescription());
        existing.setPhotoUrl(plant.getPhotoUrl());
        existing.setWateringDifficulty(plant.getWateringDifficulty());
        existing.setSunlight(plant.getSunlight());
        existing.setDifficulty(plant.getDifficulty());
        existing.setSimilarTo(plant.getSimilarTo());
        existing.setUpdatedAt(LocalDateTime.now());

        return plantRepository.save(existing);
    }

    public void deletePlant(Long id) {
        getPlantById(id);
        plantRepository.deleteById(id);
    }
}
