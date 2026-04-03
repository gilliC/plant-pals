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
import { useUser } from "../../../lib/userContext";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { CareMetricsSelects } from "./CareMetricsSelects";
import { useAddPlant } from "./useAddPlant";
import { AddPlantFormValues } from "./types";

const classes = {
    button: "col-span-1 border-primary border-1 text-white hover:bg-primary-dark bg-card rounded-full w-35 h-10",
    dialogContent: "w-[600px] sm:max-w-[600px] gap-0 overflow-hidden rounded-[28px] border-primary-darker bg-card p-0 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.5)]",
    topBar: "h-[4px] w-full bg-primary",
    header: "px-8 pt-7 pb-4",
    title: "text-[22px] font-bold text-foreground",
    divider: "mx-8 h-px bg-primary-darker",
    formContainer: "px-8 pt-4 pb-8 max-w-[600px]",
    label: "mb-2 text-sm text-muted",
    input: "mb-4",
};

type FormField = { label: string; field: keyof AddPlantFormValues; placeholder: string };

const fields: FormField[] = [
    { label: "Plant Name", field: "name", placeholder: "e.g. Monstera Deliciosa" },
    { label: "Main Category", field: "category", placeholder: "Houseplants / Herbs / Succulents..." },
    { label: "Short Description", field: "shortDescription", placeholder: "A brief tagline for the listing" },
    { label: "Description", field: "description", placeholder: "A more detailed description of the plant" },
];

const fieldsAfterCare: FormField[] = [
    { label: "Similar Plant", field: "similarPlant", placeholder: "e.g. Fiddle Leaf Fig, Snake Plant, etc." },
    { label: "Image URL", field: "imageUrl", placeholder: "A URL to an image of the plant" },
];

export const AddPlant = () => {
    const { user, isAdmin } = useUser();
    const [open, setOpen] = useState(false);
    const { form, onSubmit, isLoading } = useAddPlant(() => setOpen(false));

    if (!user || !isAdmin) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<button className={`px-4 py-2 cursor-pointer ${classes.button}`} />}>
                + Add Plant
            </DialogTrigger>

            <DialogContent
                className={classes.dialogContent}
                showCloseButton={false}
            >
                <div className={classes.topBar} />

                <DialogHeader className={classes.header}>
                    <DialogTitle className={classes.title}>
                        Add new plant 🌱
                    </DialogTitle>
                </DialogHeader>

                <div className={classes.divider} />

                <form onSubmit={onSubmit} className={classes.formContainer}>
                    {fields.map(({ label, field, placeholder }) => (
                        <div key={field}>
                            <Label className={classes.label}>{label}</Label>
                            <Input placeholder={placeholder} className={classes.input} {...form.register(field)} />
                        </div>
                    ))}

                    <Label className={classes.label}>CARE METRICS</Label>
                    <CareMetricsSelects form={form} />

                    {fieldsAfterCare.map(({ label, field, placeholder }) => (
                        <div key={field}>
                            <Label className={classes.label}>{label}</Label>
                            <Input placeholder={placeholder} className={classes.input} {...form.register(field)} />
                        </div>
                    ))}

                    <Button className={classes.button} type="submit" disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Plant"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
