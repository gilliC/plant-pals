"use client";

import { FeaturedCard } from "./FeaturedCard";
import { LoadingState } from "./LoadingState";
import { SmallCard } from "./SmallCard";
import { ViewAllCard } from "./ViewAllCard";
import { WideCard } from "./WideCard";
import { useGetPlants } from "./useGetPlants";

export const PlantsGrid = () => {
    const { plants, isLoading } = useGetPlants();
    if (isLoading) {
        return <LoadingState />;
    }

    if (!plants || plants.length === 0) {
        return <p className="mt-8 text-muted-foreground">No plants found.</p>;
    }

    const [featured, ...rest] = plants;
    const smallCards = rest.slice(0, 2);
    const wideCard = rest[2];

    return (
        <div className="mt-8 flex flex-row gap-4 items-stretch">
            <FeaturedCard plant={featured} />
            <div className="flex flex-col gap-4">
                {smallCards.map((plant) => (
                    <SmallCard key={plant.id} plant={plant} />
                ))}
            </div>
            {wideCard && <WideCard plant={wideCard} />}
            <ViewAllCard count={plants.length} />
        </div>
    );
};
