import { Card, CardContent } from "../../components/ui/card";

const requests = {
    total: 4,
    approved: 1,
    pending: 2,
    rejected: 1,
}

const MyRequestsPage = () => {
    return (
        <div className="flex flex-col gap-3 p-10">
            <h1 className="text-6xl font-bold">My Requests</h1>
            <h5 className="text-6l text-primary-foreground">Track all your plant adoption requests</h5>
            <div className="flex gap-4">
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
        </div>
    )
};

export default MyRequestsPage;