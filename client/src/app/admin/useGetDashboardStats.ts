"use client";

import { DashboardStats } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getApiPath } from "@/lib/utils";

const path = getApiPath("/stats/dashboard");

export const useGetDashboardStats = () => {
    const { data: stats, isLoading } = useQuery<DashboardStats>({
        queryKey: ["stats", "dashboard"],
        queryFn: async () => {
            const res = await fetch(path);
            return res.json();
        },
    });
    return { stats, isLoading };
};
