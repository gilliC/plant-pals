'use client';
import { useUser } from "../../lib/userContext";
import { DashboardCard, Variants } from "./DashboardCard";
import { PlantsList } from "./PlantsList/PlantsList";
import { RecentRequests } from "./RecentRequests/RecentRequests";
import { useGetDashboardStats } from "./useGetDashboardStats";

const classes = {
    h1: "text-4xl font-bold mb-4",
    h6: "text-primary-foreground",
    grid: "grid grid-cols-1 md:grid-cols-4 gap-4 mt-4",
    columns: "flex flex-col lg:flex-row gap-6 mt-8",
}

const Admin = () => {
    const { user, isAdmin } = useUser();
    const { stats, isLoading } = useGetDashboardStats();
    const statTiles = [
        { title: "Plants listed", value: isLoading ? "..." : String(stats?.plantsListed ?? 0), variant: "listed" },
        { title: "Adopted", value: isLoading ? "..." : String(stats?.adopted ?? 0), variant: "adopted" },
        { title: "Pending review", value: isLoading ? "..." : String(stats?.pendingReview ?? 0), variant: "pending" },
        { title: "Subscribers", value: isLoading ? "..." : String(stats?.subscribers ?? 0), variant: "subscribers" },
    ];
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
                {statTiles.map((stat) => (
                    <DashboardCard key={stat.title} title={stat.title} value={stat.value} variant={stat.variant as Variants} />
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