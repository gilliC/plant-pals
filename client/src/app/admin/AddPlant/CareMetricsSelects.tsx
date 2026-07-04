"use client";

import { UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { AddPlantFormValues } from "./types";

const classes = {
    container: "flex gap-4",
    trigger: "w-[180px]",
    error: "text-sm text-destructive",
};

const wateringOptions = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Moderate" },
    { value: "HIGH", label: "Frequent" },
];

const sunlightOptions = [
    { value: "FULL", label: "Full Sun" },
    { value: "PARTIAL", label: "Partial Sun" },
    { value: "INDIRECT", label: "Indirect Light" },
    { value: "SHADE", label: "Shade" },
];

const difficultyOptions = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
];

interface CareMetricsSelectsProps {
    form: UseFormReturn<AddPlantFormValues>;
}

export const CareMetricsSelects = ({ form }: CareMetricsSelectsProps) => {
    const [wateringDifficulty, sunlight, difficulty] = form.watch(["wateringDifficulty", "sunlight", "difficulty"]);
    const errors = form.formState.errors;

    const selectValue = (field: keyof AddPlantFormValues, value: string) => {
        form.setValue(field, value);
        form.clearErrors(field);
    };

    return (
        <div>
            <div className={classes.container}>
                <div>
                    <Select
                        value={wateringDifficulty || null}
                        onValueChange={(value) => selectValue("wateringDifficulty", value as string)}
                    >
                        <SelectTrigger className={classes.trigger} aria-invalid={!!errors.wateringDifficulty}>
                            <SelectValue placeholder="Watering 💧">
                                {(value: string | null) => wateringOptions.find((o) => o.value === value)?.label ?? "Watering 💧"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {wateringOptions.map((o) => (
                                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.wateringDifficulty && (
                        <p className={classes.error}>{errors.wateringDifficulty.message}</p>
                    )}
                </div>
                <div>
                    <Select
                        value={sunlight || null}
                        onValueChange={(value) => selectValue("sunlight", value as string)}
                    >
                        <SelectTrigger className={classes.trigger} aria-invalid={!!errors.sunlight}>
                            <SelectValue placeholder="Sunlight ☀️">
                                {(value: string | null) => sunlightOptions.find((o) => o.value === value)?.label ?? "Sunlight ☀️"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {sunlightOptions.map((o) => (
                                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.sunlight && <p className={classes.error}>{errors.sunlight.message}</p>}
                </div>
                <div>
                    <Select
                        value={difficulty || null}
                        onValueChange={(value) => selectValue("difficulty", value as string)}
                    >
                        <SelectTrigger className={classes.trigger} aria-invalid={!!errors.difficulty}>
                            <SelectValue placeholder="Difficulty">
                                {(value: string | null) => difficultyOptions.find((o) => o.value === value)?.label ?? "Difficulty"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {difficultyOptions.map((o) => (
                                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.difficulty && <p className={classes.error}>{errors.difficulty.message}</p>}
                </div>
            </div>
        </div>
    );
};
