"use client";

import { useMemo } from "react";
import { RequestItem } from "./RequestsItem";
import { TotalCards } from "./TotalCards";
import { useGetMyRequests } from "@/hooks/useGetMyRequests";
import { RequestStatus } from "@/lib/type";

const MyRequestsPage = () => {
    const { requests, isLoading } = useGetMyRequests();

    const byStatus = useMemo(() => Object.groupBy(requests, r => r.status), [requests]);
    const total = requests.length;
    const approved = byStatus[RequestStatus.APPROVED]?.length ?? 0;
    const pending = byStatus[RequestStatus.PENDING]?.length ?? 0;
    const rejected = byStatus[RequestStatus.REJECTED]?.length ?? 0;

    return (
        <div className="flex flex-col gap-3 p-10">
            <h1 className="text-6xl font-bold">My Requests</h1>
            <h5 className="text-6l text-primary-foreground">Track all your plant adoption requests</h5>
            <TotalCards total={total} approved={approved} pending={pending} rejected={rejected} />
            {isLoading && <p className="text-sm text-muted">Loading your requests...</p>}
            {!isLoading && requests.length === 0 && <p className="text-sm text-muted">You haven't made any adoption requests yet.</p>}
            {requests.map(request => <RequestItem key={request.id} request={request} />)}
        </div>
    )
};

export default MyRequestsPage;