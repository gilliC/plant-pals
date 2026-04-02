"use client";

import { Plant } from "@/type";
import { useQuery } from "@tanstack/react-query";

export const useGetPlant = (id: string) => {
    const { data: plant, isLoading } = useQuery<Plant>({
        queryKey: ["plant", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:8080/plants/${id}`);
            return res.json();
        },
    });
    return { plant, isLoading };
};
