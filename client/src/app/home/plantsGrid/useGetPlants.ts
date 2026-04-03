"use client";

import { Plant } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getApiPath } from "../../../lib/utils";

const path = getApiPath("/plants");

export const useGetPlants = () => {
    const { data: plants, isLoading } = useQuery<Plant[]>({
        queryKey: ["plants"],
        queryFn: async () => {
            const res = await fetch(path);
            return res.json();
        },
    });
    return { plants, isLoading };
};
