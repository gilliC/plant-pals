"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const LoadingState = () => {
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
};
