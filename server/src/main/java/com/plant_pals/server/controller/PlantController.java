package com.plant_pals.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.plant_pals.server.entity.Plant;
import com.plant_pals.server.service.PlantService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor
public class PlantController {

    private final PlantService plantService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Plant createPlant(@Valid @RequestBody Plant plant) {
        return plantService.createPlant(plant);
    }

    @GetMapping("/{id}")
    public Plant getPlantById(@PathVariable Long id) {
        return plantService.getPlantById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Plant updatePlant(@PathVariable Long id, @Valid @RequestBody Plant plant) {
        return plantService.updatePlant(id, plant);
    }

    @GetMapping
    public Iterable<Plant> getPlants() {
        return plantService.getPlants();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePlant(@PathVariable Long id) {
        plantService.deletePlant(id);
    }
}
