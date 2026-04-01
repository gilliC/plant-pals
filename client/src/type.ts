export interface Plant {
    id: number;
    name: string;
    category: string;
    shortDescription: string;
    description: string;
    imageUrl: string;
    wateringDifficulty: "EASY" | "MEDIUM" | "HARD";
    sunlightRequirement: "LOW" | "MEDIUM" | "HIGH";
    similarPlant: string;
}