"use client";

import { Plant } from "@/lib/type";

const wateringLabels = {
    EASY: "💧 Easy",
    MEDIUM: "💧 Medium",
    HARD: "💧 Hard",
} as const;

const sunlightLabels = {
    LOW: "☀️ Low",
    MEDIUM: "☀️ Indirect",
    HIGH: "☀️ Direct",
} as const;

function PlantTag({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-badge-border bg-[#161a16] px-2.5 py-1 text-[11px] text-[#94a296]">
            {children}
        </span>
    );
}

export const TagsRow = ({ plant }: { plant: Plant }) => {
    return (
        <div className="flex flex-wrap gap-3">
            <PlantTag>{wateringLabels[plant.wateringDifficulty]}</PlantTag>
            <PlantTag>{sunlightLabels[plant.sunlightRequirement]}</PlantTag>
            <PlantTag>🌱 {plant.similarPlant}</PlantTag>
        </div>

    );
}
