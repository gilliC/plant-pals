"use client";

import { AdoptionRequest } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getApiPath } from "@/lib/utils";

const path = getApiPath("/request");

export const useGetRequests = () => {
    const { data: requests, isLoading } = useQuery<AdoptionRequest[]>({
        queryKey: ["requests", "all"],
        queryFn: async () => {
            const res = await fetch(path);
            return res.json();
        },
    });
    return { requests: requests ?? [], isLoading };
};
