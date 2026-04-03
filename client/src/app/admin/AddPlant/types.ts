import { WateringDifficulty, SunlightRequirement } from "../../../lib/type";

export interface AddPlantFormValues {
    name: string;
    category: string;
    shortDescription: string;
    description: string;
    wateringDifficulty: WateringDifficulty;
    sunlightRequirement: SunlightRequirement;
    difficulty: string;
    similarPlant: string;
    imageUrl: string;
}
