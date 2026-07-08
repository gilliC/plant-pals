"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiPath, apiFetch } from "@/lib/utils";
import { useUser } from "@/lib/userContext";

const path = getApiPath("/subscriptions");

export const useSubscribe = () => {
    const { user } = useUser();

    const mutation = useMutation({
        mutationFn: async (plantName: string) => {
            if (!user) {
                throw new Error("You must be logged in to subscribe");
            }

            const res = await apiFetch(path, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, plantName }),
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to subscribe");
            }
            return res.json();
        },
        onSuccess: () => {
            toast.success("You'll be notified when this plant is available again!");
        },
        onError: (err: Error) => {
            toast.error(err.message || "Failed to subscribe");
        },
    });

    return { subscribe: mutation.mutate, isLoading: mutation.isPending, isSuccess: mutation.isSuccess };
};
