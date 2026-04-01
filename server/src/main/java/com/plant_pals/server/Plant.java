package com.plant_pals.server;

public class Plant {

    private final String id;
    private final String name;
    private final String category;
    private final String shortDescription;
    private final String description;
    private final String imageUrl;
    private final WateringDifficulty wateringDifficulty;
    private final SunlightRequirement sunlightRequirement;
    private final String similarPlant;

    public Plant(String name, String category, String shortDescription, String description, String imageUrl, WateringDifficulty wateringDifficulty, SunlightRequirement sunlightRequirement, String similarPlant) {
        this.id = java.util.UUID.randomUUID().toString();
        this.name = name;
        this.category = category;
        this.shortDescription = shortDescription;
        this.description = description;
        this.imageUrl = imageUrl;
        this.wateringDifficulty = wateringDifficulty;
        this.sunlightRequirement = sunlightRequirement;
        this.similarPlant = similarPlant;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public WateringDifficulty getWateringDifficulty() {
        return wateringDifficulty;
    }

    public SunlightRequirement getSunlightRequirement() {
        return sunlightRequirement;
    }

    public String getSimilarPlant() {
        return similarPlant;
    }

}
