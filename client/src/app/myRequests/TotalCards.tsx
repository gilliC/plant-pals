import { Card, CardContent } from "../../components/ui/card";

const requests = {
    total: 4,
    approved: 1,
    pending: 2,
    rejected: 1,
}

export const TotalCards = () => {
    return (
        <div className="flex gap-4 mb-8">
            <Card className="center px-12 border-1 border-primary-darker">
                <CardContent className="flex flex-col items-center">
                    <p className="text-2xl font-bold text-primary-foreground">{requests.total}</p>
                    <p>Total</p>
                </CardContent>
            </Card>
            <Card className="center px-12 border-1 border-primary-darker">
                <CardContent className="flex flex-col items-center">
                    <p className="text-2xl font-bold text-primary">{requests.approved}</p>
                    <p>Approved</p>
                </CardContent>
            </Card>
            <Card className="center px-12 border-1 border-primary-darker">
                <CardContent className="flex flex-col items-center">
                    <p className="text-2xl font-bold text-warning">{requests.pending}</p>
                    <p>Pending</p>
                </CardContent>
            </Card>
            <Card className="center px-12 border-1 border-primary-darker">
                <CardContent className="flex flex-col items-center">
                    <p className="text-2xl font-bold text-error">{requests.rejected}</p>
                    <p>Rejected</p>
                </CardContent>
            </Card>
        </div>
    )
};
