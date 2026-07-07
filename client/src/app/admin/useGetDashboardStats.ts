"use client";

import { DashboardStats } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getApiPath, apiFetch } from "@/lib/utils";

const path = getApiPath("/stats/dashboard");

export const useGetDashboardStats = () => {
    const { data: stats, isLoading } = useQuery<DashboardStats>({
        queryKey: ["stats", "dashboard"],
        queryFn: async () => {
            const res = await apiFetch(path);
            return res.json();
        },
    });
    return { stats, isLoading };
};
