"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    MapPin,
    CheckSquare,
    User,
    LogOut,
    Droplets,
    Bell,
    MessageSquare,
    Gift
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { userProfile, loading, signOut } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!userProfile) {
        router.push("/auth/login");
        return null;
    }

    const role = userProfile.role;

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        ...(role === "user" ? [
            { name: "Near Me", href: "/dashboard/matching", icon: MapPin },
            { name: "Eligibility", href: "/dashboard/eligibility", icon: CheckSquare },
            { name: "Rewards", href: "/dashboard/rewards", icon: Gift },
        ] : [
            { name: "Requests", href: "/dashboard/requests", icon: Droplets },
            { name: "Analytics", href: "/dashboard/analytics", icon: LayoutDashboard },
        ]),
        { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
        { name: "Profile", href: "/dashboard/profile", icon: User },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
                <div className="p-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Droplets className="h-7 w-7 text-red-600" />
                        <span className="font-bold text-xl text-slate-900 tracking-tight">Campus Lifeline</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-red-50 text-red-600"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={() => signOut()}
                        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-4 md:hidden">
                        <Droplets className="h-7 w-7 text-red-600" />
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 md:block hidden">
                        {navItems.find(i => i.href === pathname)?.name || "Dashboard"}
                    </h2>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-red-600 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-600 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold border border-red-200">
                            {userProfile.displayName?.[0] || "U"}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
