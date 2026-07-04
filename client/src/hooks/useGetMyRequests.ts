"use client";

import { AdoptionRequest } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getApiPath } from "@/lib/utils";
import { useUser } from "@/lib/userContext";

export const useGetMyRequests = () => {
    const { user } = useUser();

    const { data: requests, isLoading } = useQuery<AdoptionRequest[]>({
        queryKey: ["requests", "mine", user?.id],
        queryFn: async () => {
            const res = await fetch(getApiPath(`/request?userId=${user!.id}`));
            return res.json();
        },
        enabled: !!user,
    });

    return { requests: requests ?? [], isLoading };
};
