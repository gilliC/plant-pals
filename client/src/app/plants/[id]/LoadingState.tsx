"use client";

import { Skeleton } from "@/components/ui/skeleton";

const classNames = {
    page: "flex h-[calc(100vh-65px)]",
    leftCol: "w-[600px] shrink-0 overflow-y-auto p-10",
    rightCol: "flex-1 overflow-y-auto p-10",
};

export const LoadingState = () => (
    <div className={classNames.page}>
        <div className={classNames.leftCol}>
            <Skeleton className="h-[420px] w-full rounded-[28px]" />
            <Skeleton className="mt-8 h-[70px] w-[400px] rounded-xl" />
            <div className="mt-3 flex gap-3">
                <Skeleton className="h-7 w-28 rounded-full" />
                <Skeleton className="h-7 w-16 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-20 w-full rounded-lg" />
        </div>
        <div className={classNames.rightCol}>
            <div className="grid grid-cols-2 gap-3.5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-[160px] rounded-[20px]" />
                ))}
            </div>
            <Skeleton className="mt-3.5 h-[180px] rounded-3xl" />
        </div>
    </div>
);
