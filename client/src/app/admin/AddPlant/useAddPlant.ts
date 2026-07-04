"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiPath } from "../../../lib/utils";
import { Plant } from "@/lib/type";
import { AddPlantFormValues } from "./types";

const plantsPath = getApiPath("/plants");

const REQUIRED_CARE_METRICS: {
    field: "wateringDifficulty" | "sunlight" | "difficulty";
    message: string;
}[] = [
    { field: "wateringDifficulty", message: "Watering difficulty is required" },
    { field: "sunlight", message: "Sunlight is required" },
    { field: "difficulty", message: "Difficulty is required" },
];

const toFormValues = (plant?: Plant): AddPlantFormValues => ({
    name: plant?.name ?? "",
    category: plant?.category?.name ?? "",
    shortDescription: plant?.shortDescription ?? "",
    description: plant?.description ?? "",
    wateringDifficulty: plant?.wateringDifficulty as AddPlantFormValues["wateringDifficulty"],
    sunlight: plant?.sunlight as AddPlantFormValues["sunlight"],
    difficulty: plant?.difficulty as AddPlantFormValues["difficulty"],
    similarTo: plant?.similarTo ?? "",
    photoUrl: plant?.photoUrl ?? "",
});

const savePlant = async (data: AddPlantFormValues, plantId?: number) => {
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

    const res = await fetch(plantId ? `${plantsPath}/${plantId}` : plantsPath, {
        method: plantId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save plant");
    }
    return res.json();
};

export const useAddPlant = (onSuccess: () => void, plant?: Plant) => {
    const queryClient = useQueryClient();
    const isEdit = Boolean(plant);

    const form = useForm<AddPlantFormValues>({
        values: toFormValues(plant),
    });

    const mutation = useMutation({
        mutationFn: (data: AddPlantFormValues) => savePlant(data, plant?.id),
        onSuccess: () => {
            toast.success(isEdit ? "Plant updated successfully!" : "Plant added successfully!");
            queryClient.invalidateQueries({ queryKey: ["plants"] });
            if (plant) queryClient.invalidateQueries({ queryKey: ["plant", String(plant.id)] });
            if (!isEdit) form.reset();
            onSuccess();
        },
        onError: (err: Error) => {
            toast.error(err.message || "Failed to save plant");
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        const missing = REQUIRED_CARE_METRICS.filter(({ field }) => !data[field]);
        if (missing.length > 0) {
            missing.forEach(({ field, message }) => form.setError(field, { type: "required", message }));
            return;
        }
        mutation.mutate(data);
    });

    return { form, onSubmit, isLoading: mutation.isPending, isEdit };
};
