"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plant } from "@/type";
import Image from "next/image";
import Link from "next/link";
import { TagsRow } from "./TagsRow";

const classNames = {
    card: "relative h-full min-h-[187px] min-w-[580px] shrink-0 rounded-[20px] border border-[#362e50] bg-[#1e1a32] p-0 shadow-[0px_8px_28px_-4px_rgba(0,0,0,0.2)]",
    backgroundCircle: "absolute right-[40px] top-[-31px] h-[200px] w-[300px] rounded-full bg-[#b4a0dc] opacity-12",
    CardContent: "relative flex h-full flex-col justify-between p-3.5",
    top: "flex items-start",
    category: "rounded-full bg-[#2c2448] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-wider text-[#b4a0dc]",
    image: "h-56 w-56 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover",
};

export const WideCard = ({ plant }: { plant: Plant }) => {
    return (
        <Link href={`/plants/${plant.id}`} className="flex self-stretch">
            <Card className={classNames.card}>
                <div className={classNames.backgroundCircle} />
                <Image
                    src={plant.imageUrl}
                    alt={plant.name}
                    className={classNames.image}
                    width={240}
                    height={240}
                />
                <CardContent className={classNames.CardContent}>
                    <div className={classNames.top}>
                        <span className={classNames.category}>
                            {plant.category ?? ""}
                        </span>
                    </div>

                    <div className="mt-auto space-y-1">
                        <h3 className="text-[28px] font-bold text-[#f2eee4]">{plant.name}</h3>
                        <p className="text-[12px] leading-[18px] text-[#94a296]">
                            {plant.shortDescription}
                        </p>
                    </div>
                    <TagsRow plant={plant} />
                </CardContent>
            </Card>
        </Link>
    );
}
