"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiPath } from "@/lib/utils";
import { useUser } from "@/lib/userContext";

const path = getApiPath("/request/create");

export const useCreateRequest = () => {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (plantId: number) => {
            if (!user) {
                throw new Error("You must be logged in to adopt a plant");
            }

            const res = await fetch(path, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plantId, userId: user.id }),
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to create request");
            }
            return res.json();
        },
        onSuccess: () => {
            toast.success("Adoption request sent!");
            queryClient.invalidateQueries({ queryKey: ["requests"] });
        },
        onError: (err: Error) => {
            toast.error(err.message || "Failed to create request");
        },
    });

    return { createRequest: mutation.mutate, isLoading: mutation.isPending };
};
