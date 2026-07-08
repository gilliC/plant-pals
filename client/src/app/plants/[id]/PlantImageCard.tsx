"use client";

import { Plant, PlantStatus } from "@/lib/type";
import Image from "next/image";

const classNames = {
    card: "relative h-[420px] w-full overflow-hidden rounded-[28px] bg-card shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.25)]",
    circleLg: "absolute right-[10px] top-[50px] h-[320px] w-[340px] rounded-full bg-[#345a3e] opacity-20",
    circleSm: "absolute bottom-[60px] left-[30px] h-[160px] w-[180px] rounded-full bg-[#345a3e] opacity-15",
    image: "absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover",
    statusBadge: "absolute right-5 top-6 text-[11px]",
    availableText: "text-[#94a296]",
    adoptedText: "text-[#e07070]",
    availableDot: "mr-1.5 inline-block size-2 rounded-full bg-[#86b991]",
    adoptedDot: "mr-1.5 inline-block size-2 rounded-full bg-[#e07070]",
};

export const PlantImageCard = ({ plant }: { plant: Plant }) => {
    const isAdopted = plant.status === PlantStatus.ADOPTED;
    return (
        <div className={classNames.card}>
            <div className={classNames.circleLg} />
            <div className={classNames.circleSm} />
            <Image
                src={plant.photoUrl}
                alt={plant.name}
                className={classNames.image}
                width={448}
                height={448}
            />
            <span className={`${classNames.statusBadge} ${isAdopted ? classNames.adoptedText : classNames.availableText}`}>
                <span className={isAdopted ? classNames.adoptedDot : classNames.availableDot} />
                {isAdopted ? "Adopted" : "Available"}
            </span>
        </div>
    );
};
