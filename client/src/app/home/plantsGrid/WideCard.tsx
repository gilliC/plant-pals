"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plant } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import { TagsRow } from "./TagsRow";

const colorThemes = {
    purple: {
        cardBg: "#1e1a32",
        cardBorder: "#362e50",
        circleBg: "#b4a0dc",
        badgeBg: "#2c2448",
        badgeText: "#b4a0dc",
    },
    pink: {
        cardBg: "#321a2b",
        cardBorder: "#502e42",
        circleBg: "#dca0c4",
        badgeBg: "#48243c",
        badgeText: "#dca0c4",
    },
    blue: {
        cardBg: "#1a2632",
        cardBorder: "#2e3d50",
        circleBg: "#a0c4dc",
        badgeBg: "#243448",
        badgeText: "#a0c4dc",
    },
} as const;

export type WideCardColor = keyof typeof colorThemes;

export const WideCard = ({ plant, color = "purple" }: { plant: Plant; color?: WideCardColor }) => {
    const theme = colorThemes[color];

    return (
        <Link href={`/plants/${plant.id}`} className="flex self-stretch">
            <Card
                className="relative h-full min-h-[390px] min-w-[580px] shrink-0 rounded-[20px] border bg-transparent ring-0 p-0 shadow-[0px_8px_28px_-4px_rgba(0,0,0,0.2)]"
                style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
                <div
                    className="absolute right-[40px] top-[-31px] h-[200px] w-[300px] rounded-full opacity-12"
                    style={{ backgroundColor: theme.circleBg }}
                />
                <Image
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="h-56 w-56 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
                    width={240}
                    height={240}
                />
                <CardContent className="relative flex h-full flex-col justify-between p-3.5">
                    <div className="flex items-start">
                        <span
                            className="rounded-full px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-wider"
                            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
                        >
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
