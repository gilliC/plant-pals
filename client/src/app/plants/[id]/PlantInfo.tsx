"use client";

import { Plant } from "@/lib/type";

const difficultyLabels = {
    EASY: "Beginner",
    MEDIUM: "Intermediate",
    HARD: "Advanced",
} as const;

const classNames = {
    name: "mt-8 text-[64px] font-bold leading-[70px] text-[#f2eee4]",
    badgesRow: "mt-3 flex gap-3",
    categoryBadge: "rounded-full bg-[#2c3a2e] px-3 py-1.5 text-[9px] font-medium uppercase tracking-wider text-[#86b991]",
    difficultyBadge: "rounded-full bg-[#345a3e] px-4 py-1.5 text-[11px] font-medium text-[#a8dab0]",
    description: "mt-4 text-[15px] leading-[26px] text-[#94a296]",
    requestCount: "mt-6 text-[13px] text-[#505c52]",
};

export const PlantInfo = ({ plant }: { plant: Plant }) => (
    <>
        <h1 className={classNames.name}>{plant.name}</h1>

        <div className={classNames.badgesRow}>
            <span className={classNames.categoryBadge}>{plant.category}</span>
            <span className={classNames.difficultyBadge}>
                {difficultyLabels[plant.wateringDifficulty]}
            </span>
        </div>

        <p className={classNames.description}>{plant.description}</p>
        <p className={classNames.requestCount}>
            {
                // TODO: this is just a placeholder until we have real data for this
            }
            🙋 3 people have requested this plant
        </p>
    </>
);
