"use client";

import { useMemo } from "react";
import { useGetPlants } from "../../home/plantsGrid/useGetPlants";
import { AddPlant } from "../AddPlant/AddPlant";
import { useGetRequests } from "@/hooks/useGetRequests";
import { Chip } from "@/components/ui/chip";
import { PlantStatus, RequestStatus } from "@/lib/type";

const classes = {
    section: "w-full lg:w-80 shrink-0",
    header: "flex items-center justify-between mb-4",
    heading: "text-2xl font-bold",
    addButton: "px-4 h-9 text-sm border-primary border-1 text-white hover:bg-primary-dark bg-card rounded-full",
    list: "flex flex-col gap-2",
    row: "flex items-center justify-between gap-4 rounded-lg border-l-3 border border-primary-darker bg-card p-4",
    name: "font-semibold text-foreground",
    status: "text-sm text-muted-foreground",
    editButton: "w-20 h-9 text-sm border-primary border-1 text-white hover:bg-primary-dark bg-card rounded-full",
};

const plantStatusLabels = {
    [PlantStatus.AVAILABLE]: "Available",
    [PlantStatus.ADOPTED]: "Adopted",
};

const rowBorder = {
    [PlantStatus.ADOPTED]: "var(--muted)",
    [PlantStatus.AVAILABLE]: "var(--primary)",
    pendingRequest: "var(--warning)",
};

export const PlantsList = () => {
    const { plants, isLoading } = useGetPlants();
    const { requests } = useGetRequests();

    const pendingCountByPlantId = useMemo(() => {
        const pending = requests.filter((r) => r.status === RequestStatus.PENDING);
        return Object.groupBy(pending, (r) => r.plant.id);
    }, [requests]);

    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <h2 className={classes.heading}>My Plants</h2>
                <AddPlant triggerLabel="+ Add" triggerClassName={classes.addButton} />
            </div>
            {isLoading && <p>Loading plants...</p>}
            {!isLoading && !plants?.length && <p>No plants listed yet.</p>}
            <div className={classes.list}>
                {plants?.map((plant) => {
                    const pendingCount = pendingCountByPlantId[plant.id]?.length ?? 0;
                    const borderColor = pendingCount > 0 ? rowBorder.pendingRequest : rowBorder[plant.status];
                    return (
                        <div key={plant.id} className={classes.row} style={{ borderLeftColor: borderColor }}>
                            <div>
                                <p className={classes.name}>{plant.name}</p>
                                <p className={classes.status}>{plantStatusLabels[plant.status]}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {pendingCount > 0 && <Chip text={`${pendingCount} pending`} variant="warning" />}
                                <AddPlant plant={plant} triggerLabel="Edit" triggerClassName={classes.editButton} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
