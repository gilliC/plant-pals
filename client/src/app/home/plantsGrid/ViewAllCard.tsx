"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const classNames = {
    card: 'h-full min-h-[187px] min-w-[280px] shrink-0 cursor-pointer rounded-[20px] border border-badge-border bg-[#161a16] p-0 transition-colors hover:bg-[#1a1f1a]',
    cardContent: 'flex h-full flex-col justify-between p-5',
    title: 'mt-4 text-[32px] font-bold leading-[42px] text-[#86b991]',
    subtitle: 'text-xs text-[#505c52]',
}

export const ViewAllCard = ({ count }: { count: number }) => {
    return (
        <Link href="/plants" className="flex self-stretch">
            <Card className={classNames.card}>
                <CardContent className={classNames.cardContent}>
                    <h3 className={classNames.title}>
                        View all
                        <br />
                        plants →
                    </h3>
                    <p className={classNames.subtitle}>{count} available</p>
                </CardContent>
            </Card>
        </Link>
    );
}