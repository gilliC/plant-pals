"use client";

import { Category } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getApiPath } from "@/lib/utils";

const path = getApiPath("/categories");

export const useGetCategories = () => {
    const { data: categories, isLoading } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch(path);
            return res.json();
        },
    });
    return { categories, isLoading };
};
