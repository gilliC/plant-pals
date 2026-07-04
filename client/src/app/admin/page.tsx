'use client';
import { useUser } from "../../lib/userContext";
import { DashboardCard } from "./DashboardCard";
import { PlantsList } from "./PlantsList/PlantsList";
import { RecentRequests } from "./RecentRequests/RecentRequests";

const stats = [
    { title: "Plants listed", value: "47", variant: "listed" },
    { title: "Adopted", value: "23", variant: "adopted" },
    { title: "Pending review", value: "5", variant: "pending" },
    { title: "Subscribers", value: "12", variant: "subscribers" },
]

const classes = {
    h1: "text-4xl font-bold mb-4",
    h6: "text-primary-foreground",
    grid: "grid grid-cols-1 md:grid-cols-4 gap-4 mt-4",
    columns: "flex flex-col lg:flex-row gap-6 mt-8",
}

const Admin = () => {
    const { user, isAdmin } = useUser();
    if (!user || !isAdmin) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }
    return (
        <div className="p-6">
            <h1 className={classes.h1}>Good morning, {user.name} 🌿</h1>
            <h6 className={classes.h6}>Here's a quick look at what's happening with your plants.</h6>
            <div className={classes.grid}>
                {stats.map((stat) => (
                    <DashboardCard key={stat.title} title={stat.title} value={stat.value} variant={stat.variant as any} />
                ))}
            </div>
            <div className={classes.columns}>
                <RecentRequests />
                <PlantsList />
            </div>
        </div>
    );
};

export default Admin;