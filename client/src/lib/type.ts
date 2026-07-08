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

export const wateringLabels = {
    LOW: { label: "Low", detail: "Water infrequently", level: 1 },
    MEDIUM: { label: "Moderate", detail: "Every 5 days or so", level: 3 },
    HIGH: { label: "Frequent", detail: "Needs regular watering", level: 5 },
} as const;

export const sunlightLabels = {
    FULL: { label: "Full Sun", detail: "Needs direct sunlight", level: 4 },
    PARTIAL: { label: "Partial Sun", detail: "Some direct sunlight", level: 3 },
    INDIRECT: { label: "Indirect Light", detail: "Avoid direct sunlight", level: 2 },
    SHADE: { label: "Shade", detail: "Tolerates low light", level: 1 },
} as const;

export const difficultyLabels = {
    BEGINNER: { label: "Beginner", detail: "Very easy to grow", stars: 1 },
    INTERMEDIATE: { label: "Intermediate", detail: "Some experience needed", stars: 2 },
    ADVANCED: { label: "Advanced", detail: "Requires careful attention", stars: 3 },
} as const;

export interface DashboardStats {
    plantsListed: number;
    adopted: number;
    pendingReview: number;
    subscribers: number;
}

