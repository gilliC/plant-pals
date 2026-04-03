"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plant } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import { TagsRow } from "./TagsRow";


export const FeaturedCard = ({ plant }: { plant: Plant }) => {
    return (
        <Link href={`/plants/${plant.id}`} className="h-full">
            <Card className="relative h-full min-h-[390px] min-w-[440px] shrink-0 rounded-3xl border-0 bg-card p-0 shadow-[0px_8px_28px_-4px_rgba(0,0,0,0.3)]">
                <div className="absolute right-[80px] top-[50px] size-[300px] rounded-full bg-[#345a3e] opacity-20" />
                <CardContent className="relative flex h-full flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                        <span className="rounded-full bg-[#2c3a2e] px-3 py-1 text-[9px] font-medium uppercase tracking-wider text-[#86b991]">
                            {plant.category?.name}
                        </span>
                        <span className="text-base">🔔</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <Image
                            src={plant.imageUrl}
                            alt={plant.name}
                            className="h-56 w-56 rounded-full object-cover"
                            width={448}
                            height={448}
                        />
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-[44px] font-bold leading-[48px] text-[#f2eee4]">
                            {plant.name}
                        </h2>
                        <p className="text-[13px] leading-5 text-[#94a296]">
                            {plant.shortDescription}
                        </p>
                        <TagsRow plant={plant} />
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
