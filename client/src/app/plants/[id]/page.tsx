"use client";

import { use } from "react";
import Link from "next/link";
import { useGetPlant } from "./useGetPlant";
import { PlantImageCard } from "./PlantImageCard";
import { PlantInfo } from "./PlantInfo";
import { CareCards } from "./CareCards";
import { AdoptCard } from "./AdoptCard";
import { LoadingState } from "./LoadingState";

const classNames = {
    page: "flex h-[calc(100vh-65px)]",
    leftCol: "w-[600px] shrink-0 overflow-y-auto p-10",
    rightCol: "flex-1 overflow-y-auto p-10",
    browseLink: "mb-6 inline-block text-[13px] font-medium text-[#a8dab0]",
};

const PlantPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { plant, isLoading } = useGetPlant(id);

    if (isLoading || !plant || !plant.wateringDifficulty) {
        return <LoadingState />;
    }

    return (
        <div className={classNames.page}>
            <div className={classNames.leftCol}>
                <Link href="/" className={classNames.browseLink}>
                    &larr; Browse
                </Link>
                <PlantImageCard plant={plant} />
                <PlantInfo plant={plant} />
            </div>
            <div className={classNames.rightCol}>
                <CareCards plant={plant} />
                <AdoptCard />
            </div>
        </div>
    );
};

export default PlantPage;
