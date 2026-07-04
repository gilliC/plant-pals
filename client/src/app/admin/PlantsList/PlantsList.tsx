"use client";

import { useGetPlants } from "../../home/plantsGrid/useGetPlants";
import { AddPlant } from "../AddPlant/AddPlant";

const classes = {
    section: "mt-8",
    heading: "text-2xl font-bold mb-4",
    list: "flex flex-col gap-2",
    row: "flex items-center justify-between gap-4 rounded-lg border border-primary-darker bg-card p-4",
    name: "font-semibold text-foreground",
    category: "text-sm text-muted-foreground",
    editButton: "w-20 h-9 text-sm border-primary border-1 text-white hover:bg-primary-dark bg-card rounded-full",
};

export const PlantsList = () => {
    const { plants, isLoading } = useGetPlants();

    return (
        <div className={classes.section}>
            <h2 className={classes.heading}>My Plants</h2>
            {isLoading && <p>Loading plants...</p>}
            {!isLoading && !plants?.length && <p>No plants listed yet.</p>}
            <div className={classes.list}>
                {plants?.map((plant) => (
                    <div key={plant.id} className={classes.row}>
                        <div>
                            <p className={classes.name}>{plant.name}</p>
                            <p className={classes.category}>{plant.category?.name}</p>
                        </div>
                        <AddPlant plant={plant} triggerLabel="Edit" triggerClassName={classes.editButton} />
                    </div>
                ))}
            </div>
        </div>
    );
};
