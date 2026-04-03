"use client";

import { UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { WateringDifficulty, wateringDifficultyLabels, sunlightLabels, difficultyLabels } from "../../../lib/type";
import { AddPlantFormValues } from "./types";

const classes = {
    container: "flex gap-4",
    trigger: "w-[180px]",
};

interface CareMetricsSelectsProps {
    form: UseFormReturn<AddPlantFormValues>;
}

export const CareMetricsSelects = ({ form }: CareMetricsSelectsProps) => {
    return (
        <div className={classes.container}>
            <Select onValueChange={(value) => form.setValue("wateringDifficulty", value as WateringDifficulty)}>
                <SelectTrigger className={classes.trigger}>
                    <SelectValue placeholder="Watering 💧">
                        {(value: string | null) => value ? wateringDifficultyLabels[value as keyof typeof wateringDifficultyLabels] : "Watering 💧"}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={WateringDifficulty.EASY}>{wateringDifficultyLabels.EASY}</SelectItem>
                        <SelectItem value={WateringDifficulty.MEDIUM}>{wateringDifficultyLabels.MEDIUM}</SelectItem>
                        <SelectItem value={WateringDifficulty.HARD}>{wateringDifficultyLabels.HARD}</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => form.setValue("sunlightRequirement", value as any)}>
                <SelectTrigger className={classes.trigger}>
                    <SelectValue placeholder="Sunlight ☀️">
                        {(value: string | null) => value ? sunlightLabels[value as keyof typeof sunlightLabels] : "Sunlight ☀️"}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="LOW">Low Light</SelectItem>
                        <SelectItem value="MEDIUM">Medium Light</SelectItem>
                        <SelectItem value="HIGH">Bright Light</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => form.setValue("difficulty", value as string)}>
                <SelectTrigger className={classes.trigger}>
                    <SelectValue placeholder="Difficulty">
                        {(value: string | null) => value ? difficultyLabels[value as keyof typeof difficultyLabels] : "Difficulty"}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="EASY">Beginner</SelectItem>
                        <SelectItem value="MEDIUM">Intermediate</SelectItem>
                        <SelectItem value="HARD">Advanced</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
