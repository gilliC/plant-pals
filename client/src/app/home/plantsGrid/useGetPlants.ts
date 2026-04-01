"use client";

import { Plant } from "@/type";
import { useQuery } from "@tanstack/react-query";

export const useGetPlants = () => {
    const { data: plants, isLoading } = useQuery<Plant[]>({
        queryKey: ["plants"],
        queryFn: async () => {
            const res = await fetch("http://localhost:8080/plants");
            return res.json();
        },
    });
    return { plants, isLoading };
};
