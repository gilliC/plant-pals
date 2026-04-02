import Image from "next/image";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";

const configs = {
    approved: {
        cardBorder: "var(--primary)",
        badgeColor: "var(--primary)",
        text: "Your request was approved! Contact Gilli to arrange pickup.",
        status: 'Approved',
    },
    rejected: {
        cardBorder: "var(--error)",
        badgeColor: "var(--error)",
        text: "Someone else adopted this plant. Try subscribing to get notified next time!",
        status: 'Not available',
    },
    pending: {
        cardBorder: "var(--warning)",
        badgeColor: "var(--warning)",
        text: "Your request is being reviewed. We'll notify you soon.",
        status: 'Pending',
    }
}

export const RequestItem = ({ request }: any) => {
    const config = configs[request.status.toLowerCase() as any];
    return (
        <Card key={request.id} className="mr-20 p-0">
            <CardContent className="flex border-l-3  p-4 gap-8 items-center" style={{ borderColor: config.cardBorder }}>
                <div className="flex items-center flex-7 gap-4">
                    <Image src={request.imageUrl} alt={request.plantName} width={100} height={100} className="rounded-lg object-cover w-20 h-20" />
                    <div className="flex flex-col gap-0.5 ">
                        <h1 className="font-semibold text-xl">{request.plantName}</h1>
                        <p className="text-sm text-muted">{request.category.toLocaleUpperCase()}</p>
                        <p className="text-sm text-primary-foreground">{config.text}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-start flex-1">
                    <p className="text-sm text-muted">{request.updatedAt}</p>
                    <Badge className="border-1 bg-primary-dark p-4  gap-2" style={{
                        borderColor: config.badgeColor,
                        color: config.badgeColor,
                    }}>
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: config.badgeColor }} />
                        {config.status}
                    </Badge>
                </div>
            </CardContent>
        </Card>

    )
};