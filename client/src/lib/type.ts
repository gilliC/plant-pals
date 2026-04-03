export enum WateringDifficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD",
}

export enum SunlightRequirement {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
}

export interface Plant {
    id: number;
    name: string;
    category: string;
    categories: string[];
    shortDescription: string;
    description: string;
    imageUrl: string;
    wateringDifficulty: WateringDifficulty;
    sunlightRequirement: SunlightRequirement;
    similarPlant: string;
}

export const difficultyLabels = {
    EASY: "Beginner",
    MEDIUM: "Intermediate",
    HARD: "Advanced",
} as const;

export const sunlightLabels = {
    LOW: "Low Light",
    MEDIUM: "Medium Light",
    HIGH: "Bright Light",
} as const;

export const wateringDifficultyLabels = {
    EASY: "Low",
    MEDIUM: "Moderate",
    HARD: "Frequent",
} as const;
