"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plant } from "@/type";

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

function FeaturedCard({ plant }: { plant: Plant }) {
    return (
        <Link href={`/plants/${plant.id}`} className="h-full">
            <Card className="relative h-full min-h-[390px] min-w-[440px] shrink-0 rounded-3xl border-0 bg-card p-0 shadow-[0px_8px_28px_-4px_rgba(0,0,0,0.3)]">
                <div className="absolute right-[80px] top-[50px] size-[300px] rounded-full bg-[#345a3e] opacity-20" />
                <CardContent className="relative flex h-full flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                        <span className="rounded-full bg-[#2c3a2e] px-3 py-1 text-[9px] font-medium uppercase tracking-wider text-[#86b991]">
                            {plant.category}
                        </span>
                        <span className="text-base">🔔</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <img
                            src={plant.imageUrl}
                            alt={plant.name}
                            className="h-56 w-56 rounded-full object-cover"
                        />
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-[44px] font-bold leading-[48px] text-[#f2eee4]">
                            {plant.name}
                        </h2>
                        <p className="text-[13px] leading-5 text-[#94a296]">
                            {plant.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <PlantTag>{wateringLabels[plant.wateringDifficulty]}</PlantTag>
                            <PlantTag>{sunlightLabels[plant.sunlightRequirement]}</PlantTag>
                            <PlantTag>🌱 {plant.similarPlant}</PlantTag>
                        </div>

                        <Button
                            variant={null}
                            className="h-[42px] w-[200px] rounded-full bg-[#345a3e] text-sm font-medium text-[#a8dab0] hover:bg-[#3d6a48]"
                        >
                            Adopt me 🌱
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

function SmallCard({ plant }: { plant: Plant }) {
    return (
        <Link href={`/plants/${plant.id}`} className="h-full">
            <Card className="relative h-full min-h-[187px] min-w-[280px] shrink-0 rounded-[20px] border-0 bg-card p-0 shadow-[0px_8px_28px_-4px_rgba(0,0,0,0.2)]">
                <div className="absolute right-0 top-0 h-[131px] w-[196px] rounded-full bg-[#345a3e] opacity-14 translate-x-[-30px] translate-y-[-18px]" />
                <CardContent className="relative flex h-full flex-col justify-between p-3.5">
                    <div className="flex items-start justify-between">
                        <span className="rounded-full border border-badge-border bg-[#161a16] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-[#94a296]">
                            {plant.category}
                        </span>
                        <img
                            src={plant.imageUrl}
                            alt={plant.name}
                            className="h-30 w-30 absolute right-3 top-3 rounded-full object-cover"
                        />
                    </div>

                    <div className="mt-auto space-y-1">
                        <h3 className="text-[22px] font-bold text-[#f2eee4]">{plant.name}</h3>
                        <p className="text-[11px] leading-4 text-[#94a296]">
                            {plant.shortDescription}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <PlantTag>{wateringLabels[plant.wateringDifficulty]}</PlantTag>
                        <PlantTag>{sunlightLabels[plant.sunlightRequirement]}</PlantTag>
                        <PlantTag>🌱 {plant.similarPlant}</PlantTag>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

function WideCard({ plant }: { plant: Plant }) {
    return (
        <Link href={`/plants/${plant.id}`} className="flex self-stretch">
            <Card className="relative h-full min-h-[187px] min-w-[580px] shrink-0 rounded-[20px] border border-[#362e50] bg-[#1e1a32] p-0 shadow-[0px_8px_28px_-4px_rgba(0,0,0,0.2)]">
                <div className="absolute right-[40px] top-[-31px] h-[200px] w-[300px] rounded-full bg-[#b4a0dc] opacity-12" />
                <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
                />
                <CardContent className="relative flex h-full flex-col justify-between p-3.5">
                    <div className="flex items-start">
                        <span className="rounded-full bg-[#2c2448] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-wider text-[#b4a0dc]">
                            {plant.category ?? "FLOWERING"}
                        </span>
                    </div>

                    <div className="mt-auto space-y-1">
                        <h3 className="text-[28px] font-bold text-[#f2eee4]">{plant.name}</h3>
                        <p className="text-[12px] leading-[18px] text-[#94a296]">
                            {plant.shortDescription}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <PlantTag>{wateringLabels[plant.wateringDifficulty]}</PlantTag>
                        <PlantTag>{sunlightLabels[plant.sunlightRequirement]}</PlantTag>
                        <PlantTag>🌱 {plant.similarPlant}</PlantTag>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

function ViewAllCard({ count }: { count: number }) {
    return (
        <Link href="/plants" className="flex self-stretch">
            <Card className="h-full min-h-[187px] min-w-[280px] shrink-0 cursor-pointer rounded-[20px] border border-badge-border bg-[#161a16] p-0 transition-colors hover:bg-[#1a1f1a]">
                <CardContent className="flex h-full flex-col justify-between p-5">
                    <h3 className="mt-4 text-[32px] font-bold leading-[42px] text-[#86b991]">
                        View all
                        <br />
                        plants →
                    </h3>
                    <p className="text-xs text-[#505c52]">{count} available</p>
                </CardContent>
            </Card>
        </Link>
    );
}

export const PlantsGrid = () => {
    const { data: plants, isLoading } = useQuery<Plant[]>({
        queryKey: ["plants"],
        queryFn: async () => {
            const res = await fetch("http://localhost:8080/plants");
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <div className="mt-8 flex flex-row gap-4 items-stretch">
                <Skeleton className="min-h-[390px] min-w-[440px] shrink-0 rounded-3xl" />
                <div className="flex flex-col gap-4">
                    <Skeleton className="min-h-[187px] min-w-[280px] shrink-0 rounded-[20px]" />
                    <Skeleton className="min-h-[187px] min-w-[280px] shrink-0 rounded-[20px]" />
                </div>
                <Skeleton className="min-h-[187px] min-w-[580px] shrink-0 rounded-[20px]" />
                <Skeleton className="min-h-[187px] min-w-[280px] shrink-0 rounded-[20px]" />
            </div>
        );
    }

    if (!plants || plants.length === 0) {
        return <p className="mt-8 text-muted-foreground">No plants found.</p>;
    }

    const [featured, ...rest] = plants;
    const smallCards = rest.slice(0, 2);
    const wideCard = rest[2];

    return (
        <div className="mt-8 flex flex-row gap-4 items-stretch">
            {/* Featured large card */}
            <FeaturedCard plant={featured} />

            {/* Two small cards stacked vertically */}
            <div className="flex flex-col gap-4">
                {smallCards.map((plant) => (
                    <SmallCard key={plant.id} plant={plant} />
                ))}
            </div>

            {/* Wide card */}
            {wideCard && <WideCard plant={wideCard} />}

            {/* View all card */}
            <ViewAllCard count={plants.length} />
        </div>
    );
};
