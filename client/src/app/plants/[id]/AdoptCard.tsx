"use client";

import { useCreateRequest } from "@/hooks/useCreateRequest";
import { useSubscribe } from "@/hooks/useSubscribe";
import { PlantStatus } from "@/lib/type";
import { useUser } from "@/lib/userContext";

const classNames = {
    card: "relative mt-3.5 overflow-hidden rounded-3xl border border-[#587860] bg-[#345a3e] p-6 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.3)]",
    circle: "absolute right-0 top-[-21px] h-[180px] w-[240px] rounded-full bg-[#4a7a54] opacity-30",
    title: "text-[22px] font-bold text-[#f2eee4]",
    subtitle: "mt-2 text-[13px] text-[#a8dab0]",
    buttonRow: "mt-6 flex items-center gap-3",
    adoptButton: "rounded-full bg-[#a8dab0] px-6 py-3 text-[15px] font-bold text-[#0e100e]",
    notifyButton: "flex size-[46px] items-center justify-center rounded-full bg-[#0e100e]/40 text-[18px]",
    notifyLabel: "ml-2 text-[10px] text-[#a8dab0]",
    signInHint: "mt-6 text-[13px] text-[#a8dab0]",
};

interface AdoptCardProps {
    plantId: number;
    plantName: string;
    plantStatus: PlantStatus;
}

export const AdoptCard = ({ plantId, plantName, plantStatus }: AdoptCardProps) => {
    const { createRequest, isLoading } = useCreateRequest();
    const { subscribe, isLoading: isSubscribing, isSuccess: isSubscribed } = useSubscribe();
    const { user } = useUser();

    const isAdopted = plantStatus === PlantStatus.ADOPTED;

    if (isAdopted) {
        return (
            <div className={classNames.card}>
                <div className={classNames.circle} />
                <p className={classNames.title}>This plant was adopted 🌿</p>
                <p className={classNames.subtitle}>
                    Subscribe to get notified if a new one becomes available!
                </p>
                <div className={classNames.buttonRow}>
                    <button
                        className={classNames.notifyButton}
                        disabled={isSubscribing || isSubscribed}
                        onClick={() => subscribe(plantName)}
                        title={isSubscribed ? "Subscribed!" : "Notify me when available"}
                    >
                        {isSubscribed ? "✅" : "🔔"}
                    </button>
                    <span className={classNames.notifyLabel}>
                        {isSubscribed ? "Subscribed!" : "Notify me"}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={classNames.card}>
            <div className={classNames.circle} />
            <p className={classNames.title}>Ready to adopt? 🌱</p>
            <p className={classNames.subtitle}>
                Send a request and we'll be in touch!
            </p>
            {user ? (
                <div className={classNames.buttonRow}>
                    <button
                        className={classNames.adoptButton}
                        disabled={isLoading}
                        onClick={() => createRequest(plantId)}
                    >
                        {isLoading ? "Sending..." : "I want to adopt!"}
                    </button>
                    <button
                        className={classNames.notifyButton}
                        disabled={isSubscribing || isSubscribed}
                        onClick={() => subscribe(plantName)}
                        title={isSubscribed ? "Subscribed!" : "Notify me when available"}
                    >
                        {isSubscribed ? "✅" : "🔔"}
                    </button>
                    <span className={classNames.notifyLabel}>
                        {isSubscribed ? "Subscribed!" : "Notify me"}
                    </span>
                </div>
            ) : (
                <p className={classNames.signInHint}>Sign in to send an adoption request.</p>
            )}
        </div>
    );
};
