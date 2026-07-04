"use client";

import { Plant } from "@/lib/type";
import { useMemo } from "react";
import { FeaturedCard } from "./FeaturedCard";
import { LoadingState } from "./LoadingState";
import { SmallCard } from "./SmallCard";
import { WideCard, WideCardColor } from "./WideCard";
import { useGetPlants } from "./useGetPlants";

const wideCardColors: WideCardColor[] = ["purple", "pink", "blue"];

type Block =
    | { type: "wide"; plant: Plant; color: WideCardColor }
    | { type: "featured"; plant: Plant }
    | { type: "smallPair"; plants: [Plant, Plant] };

function buildBlocks(plants: Plant[]): Block[] {
    const blocks: Block[] = [];

    // First 4 plants: fixed layout (Featured + 2 Small + Wide purple)
    if (plants.length >= 1) blocks.push({ type: "featured", plant: plants[0] });
    if (plants.length >= 3) blocks.push({ type: "smallPair", plants: [plants[1], plants[2]] });
    if (plants.length >= 4) blocks.push({ type: "wide", plant: plants[3], color: "purple" });

    // Remaining plants: random blocks
    let i = 4;
    let colorIndex = 1;

    while (i < plants.length) {
        const remaining = plants.length - i;

        const options: Block["type"][] = [];
        options.push("wide", "featured");
        if (remaining >= 2) options.push("smallPair");

        const pick = options[Math.floor(Math.random() * options.length)];

        if (pick === "wide") {
            blocks.push({
                type: "wide",
                plant: plants[i],
                color: wideCardColors[colorIndex++ % wideCardColors.length],
            });
            i += 1;
        } else if (pick === "featured") {
            blocks.push({ type: "featured", plant: plants[i] });
            i += 1;
        } else {
            blocks.push({ type: "smallPair", plants: [plants[i], plants[i + 1]] });
            i += 2;
        }
    }

    return blocks;
}

type PlantsGridProps = {
    selectedCategory?: string;
};

export const PlantsGrid = ({ selectedCategory = "All" }: PlantsGridProps) => {
    const { plants, isLoading } = useGetPlants();

    const filteredPlants = useMemo(() => {
        if (!plants) return [];
        if (selectedCategory === "All") return plants;
        return plants.filter((plant) => plant.category?.name === selectedCategory);
    }, [plants, selectedCategory]);

    const blocks = useMemo(() => {
        if (!filteredPlants.length) return [];
        return buildBlocks(filteredPlants);
    }, [filteredPlants]);

    if (isLoading) {
        return <LoadingState />;
    }

    if (!filteredPlants.length) {
        return <p className="mt-8 text-muted-foreground">No plants found.</p>;
    }

    return (
        <div className="mt-8 flex flex-row flex-wrap gap-4 items-stretch">
            {blocks.map((block) => {
                switch (block.type) {
                    case "wide":
                        return <WideCard key={block.plant.id} plant={block.plant} color={block.color} />;
                    case "featured":
                        return <FeaturedCard key={block.plant.id} plant={block.plant} />;
                    case "smallPair":
                        return (
                            <div key={block.plants[0].id} className="flex flex-col gap-4">
                                <SmallCard plant={block.plants[0]} />
                                <SmallCard plant={block.plants[1]} />
                            </div>
                        );
                }
            })}
        </div>
    );
};
