"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Package,
    Tags,
    ShoppingCart,
    TrendingUp,
} from "lucide-react";

const stats = [
    {
        title: "Total Products",
        value: "124",
        icon: Package,
        description: "Active products in inventory",
    },
    {
        title: "Categories",
        value: "12",
        icon: Tags,
        description: "Product categories",
    },
    {
        title: "Recent Orders",
        value: "48",
        icon: ShoppingCart,
        description: "Orders in the last 24 hours",
    },
    {
        title: "Revenue",
        value: "$12,400",
        icon: TrendingUp,
        description: "Last 30 days",
    },
];

export default function DashboardPage() {
    return (
        <div className="container mx-auto py-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to your product management dashboard
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
} 