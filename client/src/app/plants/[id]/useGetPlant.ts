"use client";

import { Plant } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { apiFetch, getApiPath } from "../../../lib/utils";

const path = getApiPath("/plants");

export const useGetPlant = (id: string) => {
    const { data: plant, isLoading } = useQuery<Plant>({
        queryKey: ["plant", id],
        queryFn: async () => {
            const res = await apiFetch(`${path}/${id}`);
            return res.json();
        },
    });
    return { plant, isLoading };
};
