"use client";

import { Plant } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getApiPath } from "../../../lib/utils";

export const useGetPlants = ({ onlyAvailable = false } = {}) => {
    const path = getApiPath(onlyAvailable ? "/plants?status=AVAILABLE" : "/plants");
    const { data: plants, isLoading } = useQuery<Plant[]>({
        queryKey: ["plants", { onlyAvailable }],
        queryFn: async () => {
            const res = await fetch(path);
            return res.json();
        },
    });
    return { plants, isLoading };
};
