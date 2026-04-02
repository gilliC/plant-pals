import { RequestItem } from "./RequestsItem";
import { TotalCards } from "./TotalCards";

const myRequests = [
    {
        id: 1,
        plantName: "Monstera Deliciosa",
        status: "Approved",
        updatedAt: "2024-06-01",
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        plantName: "Fiddle Leaf Fig",
        status: "Pending",
        updatedAt: "2024-06-05",
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        plantName: "Snake Plant",
        status: "Rejected",
        updatedAt: "2024-06-10",
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    }
]

const MyRequestsPage = () => {
    return (
        <div className="flex flex-col gap-3 p-10">
            <h1 className="text-6xl font-bold">My Requests</h1>
            <h5 className="text-6l text-primary-foreground">Track all your plant adoption requests</h5>
            <TotalCards />
            {myRequests.map(request => <RequestItem key={request.id} request={request} />)}
        </div>
    )
};

export default MyRequestsPage;