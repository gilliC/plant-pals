'use client';
import { Button } from "@base-ui/react";
import { useUser } from "../../lib/userContext";
import { DashboardCard } from "./DashboardCard";

const stats = [
    { title: "Plants listed", value: "47", variant: "listed" },
    { title: "Adopted", value: "23", variant: "adopted" },
    { title: "Pending Approvals", value: "5", variant: "pending" },
    { title: "Total Users", value: "12", variant: "users" },
]

const classes = {
    h1: "text-4xl font-bold mb-4",
    h6: "text-primary-foreground",
    grid: "grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4 items-center",
    button: "col-span-1 border-primary border-1 text-white hover:bg-primary-dark bg-card rounded-full w-20 h-10"
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
                <Button className={classes.button}>
                    + Add
                </Button>
            </div>
        </div>
    );
};

export default Admin;