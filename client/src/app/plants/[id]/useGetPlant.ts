"use client";

import { Plant } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { getApiPath } from "../../../lib/utils";

const path = getApiPath("/plants");

export const useGetPlant = (id: string) => {
    const { data: plant, isLoading } = useQuery<Plant>({
        queryKey: ["plant", id],
        queryFn: async () => {
            const res = await fetch(`${path}/${id}`);
            return res.json();
        },
    });
    return { plant, isLoading };
};
