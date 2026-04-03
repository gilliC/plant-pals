"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiPath } from "../../../lib/utils";
import { AddPlantFormValues } from "./types";

const plantsPath = getApiPath("/plants");

const addPlant = async (data: AddPlantFormValues) => {
    const payload = {
        name: data.name,
        category: { name: data.category },
        shortDescription: data.shortDescription,
        description: data.description,
        photoUrl: data.photoUrl,
        wateringDifficulty: data.wateringDifficulty,
        sunlight: data.sunlight,
        difficulty: data.difficulty,
        similarTo: data.similarTo,
    };

    const res = await fetch(plantsPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add plant");
    }
    return res.json();
};

export const useAddPlant = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    const form = useForm<AddPlantFormValues>({
        defaultValues: {
            name: "",
            category: "",
            shortDescription: "",
            description: "",
            wateringDifficulty: undefined,
            sunlight: undefined,
            difficulty: "",
            similarTo: "",
            photoUrl: "",
        },
    });

    const mutation = useMutation({
        mutationFn: addPlant,
        onSuccess: () => {
            toast.success("Plant added successfully!");
            queryClient.invalidateQueries({ queryKey: ["plants"] });
            form.reset();
            onSuccess();
        },
        onError: (err: Error) => {
            toast.error(err.message || "Failed to add plant");
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        mutation.mutate(data);
    });

    return { form, onSubmit, isLoading: mutation.isPending };
};
