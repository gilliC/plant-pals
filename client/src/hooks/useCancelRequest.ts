"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiPath, apiFetch } from "@/lib/utils";
import { useUser } from "@/lib/userContext";

const path = getApiPath("/request/cancel");

export const useCancelRequest = () => {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (requestId: number) => {
            if (!user) {
                throw new Error("You must be logged in to cancel a request");
            }

            const res = await apiFetch(path, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestId, userId: user.id }),
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to cancel request");
            }
            return res.json();
        },
        onSuccess: () => {
            toast.success("Request canceled.");
            queryClient.invalidateQueries({ queryKey: ["requests"] });
        },
        onError: (err: Error) => {
            toast.error(err.message || "Failed to cancel request");
        },
    });

    return { cancelRequest: mutation.mutate, isLoading: mutation.isPending };
};
