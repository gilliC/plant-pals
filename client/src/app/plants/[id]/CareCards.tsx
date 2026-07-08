"use client";

import { difficultyLabels, Plant, sunlightLabels, wateringLabels } from "@/lib/type";

const classNames = {
    grid: "grid grid-cols-2 gap-3.5",
    card: "relative h-[176px] overflow-hidden rounded-[20px] border border-[#2c3a2e] bg-card p-3.5 shadow-[0px_6px_20px_-4px_rgba(0,0,0,0.15)]",
    emoji: "text-[26px]",
    label: "mt-2 text-[9px] font-medium uppercase tracking-wider text-[#505c52]",
    value: "mt-3 text-[16px] font-bold text-[#f2eee4]",
    detail: "mt-1 text-[10px] leading-[14px] text-[#505c52]",
    accent: "absolute bottom-0 left-0 h-[3px] w-full",
    similarCard: "relative h-[176px] overflow-hidden rounded-[20px] border border-[#362e50] bg-[#1e1a32] p-3.5 shadow-[0px_6px_20px_-4px_rgba(0,0,0,0.15)]",
    similarLabel: "mt-2 text-[9px] font-medium uppercase tracking-wider text-[#b4a0dc]",
    similarDivider: "mt-2 h-px w-full bg-[#503c78]",
    similarText: "mt-2 text-[12px] leading-[18px] text-[#f2eee4]",
    similarBadge: "mt-3 rounded-full bg-[#2c2448] px-2.5 py-1.5 text-[10px] font-medium text-[#b4a0dc]",
    similarAccent: "absolute bottom-0 left-0 h-[3px] w-full bg-[#b4a0dc]",
};

const WateringBar = ({ level }: { level: number }) => (
    <div className="mt-3 flex gap-[6px]">
        {Array.from({ length: 5 }, (_, i) => (
            <div
                key={i}
                className={`h-1.5 w-8 rounded-full ${i < level ? "bg-[#86b991]" : "bg-[#161a16]"}`}
            />
        ))}
    </div>
);

const SunlightDots = ({ level }: { level: number }) => (
    <div className="mt-3 flex gap-1.5">
        {Array.from({ length: 3 }, (_, i) => (
            <div
                key={i}
                className={`size-[18px] rounded-[9px] bg-[#d4af58] ${i < level ? "" : "opacity-15"}`}
            />
        ))}
    </div>
);

const Stars = ({ count }: { count: number }) => (
    <div className="mt-3 flex gap-1">
        {Array.from({ length: 3 }, (_, i) => (
            <span
                key={i}
                className={`text-[20px] ${i < count ? "text-[#a8dab0]" : "text-[#505c52]"}`}
            >
                {i < count ? "★" : "☆"}
            </span>
        ))}
    </div>
);

export const CareCards = ({ plant }: { plant: Plant }) => {
    const watering = wateringLabels[plant.wateringDifficulty];
    const sunlight = sunlightLabels[plant.sunlight as keyof typeof sunlightLabels];
    const difficulty = difficultyLabels[plant.difficulty as keyof typeof difficultyLabels];

    return (
        <div className={classNames.grid}>
            <div className={classNames.card}>
                <span className={classNames.emoji}>💧</span>
                <p className={classNames.label}>WATERING</p>
                <WateringBar level={watering.level} />
                <p className={classNames.value}>{watering.label}</p>
                <p className={classNames.detail}>{watering.detail}</p>
                <div className={`${classNames.accent} bg-[#86b991]`} />
            </div>

            <div className={classNames.card}>
                <span className={classNames.emoji}>☀️</span>
                <p className={classNames.label}>SUNLIGHT</p>
                <SunlightDots level={sunlight.level} />
                <p className={classNames.value}>{sunlight.label}</p>
                <p className={classNames.detail}>{sunlight.detail}</p>
                <div className={`${classNames.accent} bg-[#d4af58]`} />
            </div>

            <div className={classNames.card}>
                <span className={classNames.emoji}>🌱</span>
                <p className={classNames.label}>LEVEL</p>
                <Stars count={difficulty.stars} />
                <p className={classNames.value}>{difficulty.label}</p>
                <p className={classNames.detail}>{difficulty.detail}</p>
                <div className={`${classNames.accent} bg-[#a8dab0]`} />
            </div>

            <div className={classNames.similarCard}>
                <span className={classNames.emoji}>🌿</span>
                <p className={classNames.similarLabel}>SIMILAR TO</p>
                <div className={classNames.similarDivider} />
                <p className={classNames.similarText}>
                    {plant.similarTo} needs similar growing conditions
                </p>
                <span className={classNames.similarBadge}>
                    🌿 {plant.similarTo}
                </span>
                <div className={classNames.similarAccent} />
            </div>
        </div>
    );
};
