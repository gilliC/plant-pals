import Image from "next/image";
import { Card, CardContent } from "../../components/ui/card";
import { Chip } from "../../components/ui/chip";
import { AdoptionRequest } from "@/lib/type";
import { useCancelRequest } from "@/hooks/useCancelRequest";
import { useSubscribe } from "@/hooks/useSubscribe";
import { Button } from "../../components/ui/button";

const configs = {
    approved: {
        cardBorder: "var(--primary)",
        variant: 'success',
        text: "Your request was approved! Contact Gilli to arrange pickup.",
        status: 'Approved',
    },
    rejected: {
        cardBorder: "var(--error)",
        variant: 'error',
        text: "Someone else adopted this plant. Try subscribing to get notified next time!",
        status: 'Not available',
    },
    pending: {
        cardBorder: "var(--warning)",
        variant: 'warning',
        text: "Your request is being reviewed. We'll notify you soon.",
        status: 'Pending',
    },
    canceled: {
        cardBorder: "var(--error)",
        variant: 'error',
        text: "You canceled this request.",
        status: 'Canceled',
    },
} as const;

export const RequestItem = ({ request }: { request: AdoptionRequest }) => {
    const config = configs[request.status.toLowerCase() as keyof typeof configs];
    const { cancelRequest, isLoading } = useCancelRequest();
    const { subscribe, isLoading: isSubscribing, isSuccess: isSubscribed } = useSubscribe();
    const isPending = request.status.toLowerCase() === "pending";
    const isRejected = request.status.toLowerCase() === "rejected";

    return (
        <Card key={request.id} className="mr-20 p-0">
            <CardContent className="flex border-l-3  p-4 gap-8 items-center" style={{ borderColor: config.cardBorder }}>
                <div className="flex items-center flex-7 gap-4">
                    <Image src={request.plant.photoUrl} alt={request.plant.name} width={100} height={100} className="rounded-lg object-cover w-20 h-20" />
                    <div className="flex flex-col gap-0.5 ">
                        <h1 className="font-semibold text-xl">{request.plant.name}</h1>
                        <p className="text-sm text-muted">{request.plant.category.name.toLocaleUpperCase()}</p>
                        <p className="text-sm text-primary-foreground">{config.text}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-start flex-1">
                    <p className="text-sm text-muted">{new Date(request.updatedAt).toLocaleDateString()}</p>
                    <Chip text={config.status} variant={config.variant} />
                    {isPending && (
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isLoading}
                            onClick={() => cancelRequest(request.id)}
                            className="mt-1"
                        >
                            {isLoading ? "Canceling..." : "Cancel"}
                        </Button>
                    )}
                    {isRejected && (
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isSubscribing || isSubscribed}
                            onClick={() => subscribe(request.plant.name)}
                            className="mt-1"
                        >
                            {isSubscribed ? "Subscribed!" : isSubscribing ? "Subscribing..." : "Notify me"}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>

    )
};