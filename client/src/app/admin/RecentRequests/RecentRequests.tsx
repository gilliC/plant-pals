"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { useGetRequests } from "@/hooks/useGetRequests";
import { useApproveRequest } from "./useApproveRequest";
import { useRejectRequest } from "./useRejectRequest";
import { RequestStatus } from "@/lib/type";

const RECENT_COUNT = 6;

const statusConfig = {
    [RequestStatus.PENDING]: { border: "var(--warning)", variant: "warning", label: "Pending" },
    [RequestStatus.APPROVED]: { border: "var(--primary)", variant: "success", label: "Approved" },
    [RequestStatus.REJECTED]: { border: "var(--error)", variant: "error", label: "Declined" },
    [RequestStatus.CANCELED]: { border: "var(--error)", variant: "error", label: "Canceled" },
} as const;

const classes = {
    section: "flex-1 min-w-0",
    heading: "text-2xl font-bold mb-4",
    list: "flex flex-col gap-2",
    row: "grid grid-cols-[1fr_5rem_18rem] items-center gap-4 rounded-lg border-l-3 border border-primary-darker bg-card p-4",
    name: "font-semibold text-foreground",
    meta: "text-sm text-muted-foreground",
    date: "text-sm text-muted-foreground text-center whitespace-nowrap",
    actions: "flex justify-end gap-2",
    approveButton: "bg-primary text-primary-dark font-semibold hover:bg-primary/80",
};

export const RecentRequests = () => {
    const { requests, isLoading } = useGetRequests();
    const { approveRequest, isLoading: isApproving } = useApproveRequest();
    const { rejectRequest, isLoading: isRejecting } = useRejectRequest();

    const recentRequests = useMemo(
        () =>
            [...requests]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        [requests]
    );

    return (
        <div className={classes.section}>
            <h2 className={classes.heading}>Recent Requests</h2>
            {isLoading && <p>Loading requests...</p>}
            {!isLoading && !recentRequests.length && <p>No requests yet.</p>}
            <div className={classes.list}>
                {recentRequests.map((request) => {
                    const config = statusConfig[request.status];
                    return (
                        <div key={request.id} className={classes.row} style={{ borderLeftColor: config.border }}>
                            <div>
                                <p className={classes.name}>{request.plant.name}</p>
                                <p className={classes.meta}>by {request.user.name}</p>
                            </div>
                            <p className={classes.date}>{new Date(request.createdAt).toLocaleDateString()}</p>
                            <div className={classes.actions}>
                                {request.status === RequestStatus.PENDING ? (
                                    <>
                                        <Chip text={config.label} variant={config.variant} />
                                        <Button
                                            size="sm"
                                            className={classes.approveButton}
                                            disabled={isApproving || isRejecting}
                                            onClick={() => approveRequest(request.id)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            disabled={isApproving || isRejecting}
                                            onClick={() => rejectRequest(request.id)}
                                        >
                                            Decline
                                        </Button>
                                    </>
                                ) : (
                                    <Chip text={config.label} variant={config.variant} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
