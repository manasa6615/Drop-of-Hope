"use client";

import React from "react";
import {
    Users,
    Droplets,
    Activity,
    TrendingUp,
    Map,
    Clock,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const stats = [
    { name: "Total Donors", value: "1,280", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Active Requests", value: "12", change: "+2", icon: Activity, color: "text-red-600", bg: "bg-red-50" },
    { name: "Success Rate", value: "94%", change: "+3%", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { name: "Lives Saved", value: "3,420", change: "+18%", icon: Droplets, color: "text-red-600", bg: "bg-red-50" },
];

export default function AnalyticsPage() {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900">Campus Analytics Dashboard</h1>
                <p className="text-slate-500">Real-time overview of the campus blood donation ecosystem.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-2xl", stat.bg)}>
                                <stat.icon className={cn("h-6 w-6", stat.color)} />
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium">{stat.name}</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Clock className="h-6 w-6 text-slate-400" />
                        Live Emergency Log
                    </h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors rounded-xl px-2">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600 text-xs text-center leading-none">
                                        {['A+', 'O-', 'B+', 'AB+'][i - 1]}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{['Central Hospital', 'City Medical', 'Life Clinic', 'Uni Med'][i - 1]}</p>
                                        <p className="text-xs text-slate-500">Request completed • {i * 10} mins ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">+50 Pts</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">To 3 Donors</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Priority Regions */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Map className="h-6 w-6 text-slate-400" />
                        Top Hotspots
                    </h3>
                    <div className="space-y-6">
                        {[
                            { name: "Main Campus West", value: 85 },
                            { name: "Medical District", value: 72 },
                            { name: "Student Housing", value: 45 },
                            { name: "North Library", value: 30 },
                        ].map((reg, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold text-slate-700">{reg.name}</span>
                                    <span className="text-slate-400">{reg.value} Active</span>
                                </div>
                                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${reg.value}%` }}
                                        className="h-full bg-red-500 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 p-4 bg-red-50 rounded-2xl border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <p className="text-xs font-bold text-red-900 uppercase">Critical Low Stock</p>
                        </div>
                        <p className="text-xs text-red-700 leading-relaxed">
                            O- and AB- blood types are currently below emergency thresholds. Triggering campus priority notifications.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
