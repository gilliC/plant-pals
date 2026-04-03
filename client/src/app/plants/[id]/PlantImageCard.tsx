"use client";

import { Plant } from "@/lib/type";
import Image from "next/image";

const classNames = {
    card: "relative h-[420px] w-full overflow-hidden rounded-[28px] bg-card shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.25)]",
    circleLg: "absolute right-[10px] top-[50px] h-[320px] w-[340px] rounded-full bg-[#345a3e] opacity-20",
    circleSm: "absolute bottom-[60px] left-[30px] h-[160px] w-[180px] rounded-full bg-[#345a3e] opacity-15",
    image: "absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover",
    newBadge: "absolute left-5 top-5 rounded-full bg-[#345a3e] px-3 py-1.5 text-[11px] font-medium text-[#a8dab0]",
    availableDot: "mr-1.5 inline-block size-2 rounded-full bg-[#86b991]",
    availableText: "absolute right-5 top-6 text-[11px] text-[#94a296]",
};

export const PlantImageCard = ({ plant }: { plant: Plant }) => (
    <div className={classNames.card}>
        <div className={classNames.circleLg} />
        <div className={classNames.circleSm} />
        <Image
            src={plant.imageUrl}
            alt={plant.name}
            className={classNames.image}
            width={448}
            height={448}
        />
        <span className={classNames.newBadge}>✦ New</span>
        <span className={classNames.availableText}>
            <span className={classNames.availableDot} />
            Available
        </span>
    </div>
);
