"use client";

import { ThemeProvider } from "next-themes";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <DashboardLayout>{children}</DashboardLayout>
        </ThemeProvider>
    );
} 