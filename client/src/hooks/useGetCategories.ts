"use client";

import { Category } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { apiFetch, getApiPath } from "@/lib/utils";

const path = getApiPath("/categories");

export const useGetCategories = () => {
    const { data: categories, isLoading } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await apiFetch(path);
            return res.json();
        },
    });
    return { categories, isLoading };
};
