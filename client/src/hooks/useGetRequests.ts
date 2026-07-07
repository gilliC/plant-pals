"use client";

import { AdoptionRequest } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getApiPath, apiFetch } from "@/lib/utils";

const path = getApiPath("/request");

export const useGetRequests = () => {
    const { data: requests, isLoading } = useQuery<AdoptionRequest[]>({
        queryKey: ["requests", "all"],
        queryFn: async () => {
            const res = await apiFetch(path);
            return res.json();
        },
    });
    return { requests: requests ?? [], isLoading };
};
