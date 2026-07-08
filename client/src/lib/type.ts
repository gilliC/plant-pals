export enum WateringLevel {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
}

export enum Sunlight {
    FULL = "FULL",
    PARTIAL = "PARTIAL",
    INDIRECT = "INDIRECT",
    SHADE = "SHADE",
}

export enum Difficulty {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
}

export interface Category {
    id: number;
    name: string;
    description?: string;
    emoji?: string;
}

export enum PlantStatus {
    AVAILABLE = "AVAILABLE",
    ADOPTED = "ADOPTED",
}

export interface Plant {
    id: number;
    name: string;
    category: Category;
    categories: string[];
    shortDescription: string;
    description: string;
    photoUrl: string;
    wateringDifficulty: WateringLevel;
    sunlight: Sunlight;
    difficulty: Difficulty;
    similarTo: string;
    status: PlantStatus;
}

export enum RequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELED = "CANCELED",
}

export interface AdoptionRequest {
    id: number;
    plant: Plant;
    user: { id: number; name: string };
    status: RequestStatus;
    createdAt: string;
    updatedAt: string;
}

export const difficultyLabels = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
} as const;

export const sunlightLabels = {
    FULL: "Full Sun",
    PARTIAL: "Partial Sun",
    INDIRECT: "Indirect Light",
    SHADE: "Shade",
} as const;

export interface DashboardStats {
    plantsListed: number;
    adopted: number;
    pendingReview: number;
    subscribers: number;
}

export const wateringDifficultyLabels = {
    LOW: "Low",
    MEDIUM: "Moderate",
    HIGH: "Frequent",
} as const;
