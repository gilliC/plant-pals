"use client";

import { UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { AddPlantFormValues } from "./types";

const classes = {
    container: "flex gap-4",
    trigger: "w-[180px]",
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
    return (
        <div className={classes.container}>
            <Select onValueChange={(value) => form.setValue("wateringDifficulty", value as string)}>
                <SelectTrigger className={classes.trigger}>
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
            <Select onValueChange={(value) => form.setValue("sunlightRequirement", value as string)}>
                <SelectTrigger className={classes.trigger}>
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
            <Select onValueChange={(value) => form.setValue("difficulty", value as string)}>
                <SelectTrigger className={classes.trigger}>
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
        </div>
    );
};
