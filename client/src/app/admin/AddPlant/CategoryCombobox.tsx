"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { useGetCategories } from "@/hooks/useGetCategories";
import { AddPlantFormValues } from "./types";

const classes = {
    error: "text-sm text-destructive",
};

interface CategoryComboboxProps {
    form: UseFormReturn<AddPlantFormValues>;
}

export const CategoryCombobox = ({ form }: CategoryComboboxProps) => {
    const { categories, isLoading } = useGetCategories();
    const category = form.watch("category");
    const error = form.formState.errors.category;
    const [query, setQuery] = useState("");

    const trimmedQuery = query.trim();
    const isNewCategory = trimmedQuery.length > 0
        && !categories?.some((c) => c.name.toLowerCase() === trimmedQuery.toLowerCase());
    const items = [
        ...(categories?.map((c) => c.name) ?? []),
        ...(isNewCategory ? [trimmedQuery] : []),
    ];

    return (
        <div>
            <Combobox
                items={items}
                value={category || null}
                onValueChange={(value) => {
                    form.setValue("category", value as string);
                    form.clearErrors("category");
                }}
                onInputValueChange={setQuery}
                autoHighlight
            >
                <ComboboxInput
                    placeholder={isLoading ? "Loading categories..." : "Type or pick a category"}
                    aria-invalid={!!error}
                />
                <ComboboxContent>
                    <ComboboxEmpty>No matching categories</ComboboxEmpty>
                    <ComboboxList>
                        {(name: string) => (
                            <ComboboxItem key={name} value={name}>
                                {name === trimmedQuery && isNewCategory ? `Add "${name}" as new category` : name}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
            {error && <p className={classes.error}>{error.message}</p>}
        </div>
    );
};
