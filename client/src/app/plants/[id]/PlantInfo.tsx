"use client";

import { useQuery } from "@tanstack/react-query";
import { difficultyLabels, Plant } from "@/lib/type";
import { getApiPath } from "@/lib/utils";

const classNames = {
    name: "mt-8 text-[64px] font-bold leading-[70px] text-[#f2eee4]",
    badgesRow: "mt-3 flex gap-3",
    categoryBadge: "rounded-full bg-[#2c3a2e] px-3 py-1.5 text-[9px] font-medium uppercase tracking-wider text-[#86b991]",
    difficultyBadge: "rounded-full bg-[#345a3e] px-4 py-1.5 text-[11px] font-medium text-[#a8dab0]",
    description: "mt-4 text-[15px] leading-[26px] text-[#94a296]",
    requestCount: "mt-6 text-[13px] text-[#505c52]",
};

const usePendingCount = (plantId: number) => {
    const { data } = useQuery<number>({
        queryKey: ["plant-pending-count", plantId],
        queryFn: async () => {
            const res = await fetch(getApiPath(`/plants/${plantId}/pending-count`));
            return res.json();
        },
    });
    return data ?? 0;
};

export const PlantInfo = ({ plant }: { plant: Plant }) => {
    const pendingCount = usePendingCount(plant.id);

    return (
        <>
            <h1 className={classNames.name}>{plant.name}</h1>

            <div className={classNames.badgesRow}>
                <span className={classNames.categoryBadge}>{plant.category?.name}</span>
                <span className={classNames.difficultyBadge}>
                    {difficultyLabels[plant.difficulty].label}
                </span>
            </div>

            <p className={classNames.description}>{plant.description}</p>
            {pendingCount > 0 && (
                <p className={classNames.requestCount}>
                    🙋 {pendingCount} {pendingCount === 1 ? "person has" : "people have"} requested this plant
                </p>
            )}
        </>
    );
};
