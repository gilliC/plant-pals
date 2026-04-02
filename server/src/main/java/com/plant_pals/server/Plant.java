package com.plant_pals.server;

public record Plant(
    int id,
    String name,
    String category,
    String[] categories,
    String shortDescription,
    String description,
    String imageUrl,
    WateringDifficulty wateringDifficulty,
    SunlightRequirement sunlightRequirement,
    String similarPlant
) {}
