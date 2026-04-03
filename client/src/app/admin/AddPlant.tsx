"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@base-ui/react";
import { useState } from "react";
import { useUser } from "../../lib/userContext";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { WateringDifficulty, wateringDifficultyLabels, sunlightLabels, difficultyLabels } from "../../lib/type";


const classes = {
    button: 'col-span-1 border-primary border-1 text-white hover:bg-primary-dark bg-card rounded-full w-35 h-10',
}

export const AddPlant = () => {
    const { user, isAdmin } = useUser();
    const [open, setOpen] = useState(false);

    if (!user || !isAdmin) return null;
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<button className="px-4 py-2 cursor-pointer" />}>
                <Button className={classes.button} onClick={() => setOpen(true)}>
                    + Add Plant
                </Button>
            </DialogTrigger>

            <DialogContent
                className="w-[600px] sm:max-w-[600px] gap-0 overflow-hidden rounded-[28px] border-primary-darker bg-card p-0 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.5)]"
                showCloseButton={false}
            >
                <div className="h-[4px] w-full bg-primary" />

                <DialogHeader className="px-8 pt-7 pb-4">
                    <DialogTitle className="text-[22px] font-bold text-foreground">
                        Add new plant 🌱
                    </DialogTitle>
                </DialogHeader>

                <div className="mx-8 h-px bg-primary-darker" />

                <div className="px-8 pt-4 pb-8 max-w-[600px]">
                    <Label htmlFor="plant-name" className="mb-2 text-sm text-muted">
                        Plant Name
                    </Label>
                    <Input placeholder="e.g. Monstera Deliciosa" className="mb-4" />
                    <Label htmlFor="category" className="mb-2 text-sm text-muted">
                        Main Category
                    </Label>
                    <Input placeholder="Houseplants / Herbs / Succulents..." className="mb-4" />
                    <Label htmlFor="plant-short-description" className="mb-2 text-sm text-muted">
                        Short Description
                    </Label>
                    <Input placeholder="A brief tagline for the listing" className="mb-4" />
                    <Label htmlFor="plant-description" className="mb-2 text-sm text-muted">
                        Description
                    </Label>
                    <Input placeholder="A more detailed description of the plant" className="mb-4" />
                    <Label htmlFor="plant-care-metrics" className="mb-2 text-sm text-muted">
                        CARE METRICS
                    </Label>
                    <div className="flex gap-4">
                        <Select>
                            <SelectTrigger className="w-[180px]">
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
                        <Select>
                            <SelectTrigger className="w-[180px]">
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
                        <Select>
                            <SelectTrigger className="w-[180px]">
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
                    <Label htmlFor="similar-plant" className="mb-2 mt-4 text-sm text-muted">
                        Similar Plant
                    </Label>
                    <Input placeholder="e.g. Fiddle Leaf Fig, Snake Plant, etc." className="mb-4" />
                    <Label htmlFor="plant-image-url" className="mb-2 text-sm text-muted">
                        Image URL
                    </Label>
                    <Input placeholder="A URL to an image of the plant" className="mb-4" />
                    <Button className={classes.button} onClick={() => setOpen(false)}>
                        Add Plant
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )

}