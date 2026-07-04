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
import { Plant } from "@/lib/type";
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
    input: "mb-1",
    fieldWrapper: "mb-4",
    error: "text-sm text-destructive",
};

type FormField = {
    label: string;
    field: keyof AddPlantFormValues;
    placeholder: string;
    rules?: Parameters<ReturnType<typeof useAddPlant>["form"]["register"]>[1];
};

const fields: FormField[] = [
    {
        label: "Plant Name",
        field: "name",
        placeholder: "e.g. Monstera Deliciosa",
        rules: { required: "Plant name is required", maxLength: { value: 150, message: "Max 150 characters" } },
    },
    {
        label: "Main Category",
        field: "category",
        placeholder: "Houseplants / Herbs / Succulents...",
        rules: { required: "Category is required" },
    },
    {
        label: "Short Description",
        field: "shortDescription",
        placeholder: "A brief tagline for the listing",
        rules: { required: "Short description is required" },
    },
    { label: "Description", field: "description", placeholder: "A more detailed description of the plant" },
];

const fieldsAfterCare: FormField[] = [
    {
        label: "Similar Plant",
        field: "similarTo",
        placeholder: "e.g. Fiddle Leaf Fig, Snake Plant, etc.",
        rules: { maxLength: { value: 150, message: "Max 150 characters" } },
    },
    {
        label: "Image URL",
        field: "photoUrl",
        placeholder: "A URL to an image of the plant",
        rules: { required: "Image URL is required", maxLength: { value: 500, message: "Max 500 characters" } },
    },
];

interface AddPlantProps {
    plant?: Plant;
    triggerLabel?: string;
    triggerClassName?: string;
}

export const AddPlant = ({ plant, triggerLabel, triggerClassName }: AddPlantProps) => {
    const { user, isAdmin } = useUser();
    const [open, setOpen] = useState(false);
    const { form, onSubmit, isLoading, isEdit } = useAddPlant(() => setOpen(false), plant);

    if (!user || !isAdmin) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<button className={`px-4 py-2 cursor-pointer ${triggerClassName ?? classes.button}`} />}>
                {triggerLabel ?? "+ Add Plant"}
            </DialogTrigger>

            <DialogContent
                className={classes.dialogContent}
                showCloseButton={false}
            >
                <div className={classes.topBar} />

                <DialogHeader className={classes.header}>
                    <DialogTitle className={classes.title}>
                        {isEdit ? "Edit plant 🌿" : "Add new plant 🌱"}
                    </DialogTitle>
                </DialogHeader>

                <div className={classes.divider} />

                <form onSubmit={onSubmit} className={classes.formContainer} noValidate>
                    {fields.map(({ label, field, placeholder, rules }) => (
                        <div key={field} className={classes.fieldWrapper}>
                            <Label className={classes.label}>{label}</Label>
                            <Input
                                placeholder={placeholder}
                                className={classes.input}
                                aria-invalid={!!form.formState.errors[field]}
                                {...form.register(field, rules)}
                            />
                            {form.formState.errors[field] && (
                                <p className={classes.error}>{form.formState.errors[field]?.message}</p>
                            )}
                        </div>
                    ))}

                    <Label className={classes.label}>CARE METRICS</Label>
                    <CareMetricsSelects form={form} />

                    {fieldsAfterCare.map(({ label, field, placeholder, rules }) => (
                        <div key={field} className={classes.fieldWrapper}>
                            <Label className={classes.label}>{label}</Label>
                            <Input
                                placeholder={placeholder}
                                className={classes.input}
                                aria-invalid={!!form.formState.errors[field]}
                                {...form.register(field, rules)}
                            />
                            {form.formState.errors[field] && (
                                <p className={classes.error}>{form.formState.errors[field]?.message}</p>
                            )}
                        </div>
                    ))}

                    <Button className={classes.button} type="submit" disabled={isLoading}>
                        {isEdit
                            ? isLoading ? "Saving..." : "Save Changes"
                            : isLoading ? "Adding..." : "Add Plant"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
