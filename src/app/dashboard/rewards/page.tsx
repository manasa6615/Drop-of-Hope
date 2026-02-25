"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
    Trophy,
    Award,
    Star,
    Zap,
    Gift,
    CheckCircle2,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const badges = [
    { name: "First Drop", description: "Completed first donation", icon: Droplets, color: "text-red-500", bg: "bg-red-50", earned: true },
    { name: "Life Saver", description: "Saved 5 lives", icon: Heart, color: "text-pink-500", bg: "bg-pink-50", earned: true },
    { name: "Emergency Responder", description: "Responded to critical alert", icon: Zap, color: "text-amber-500", bg: "bg-amber-50", earned: false },
    { name: "Blood Knight", description: "10 successful donations", icon: Shield, color: "text-blue-500", bg: "bg-blue-50", earned: false },
];

import { Droplets, Heart, Shield } from "lucide-react";

export default function RewardsPage() {
    const { userProfile } = useAuth();
    const points = userProfile?.points || 750; // Mock points if null

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900">Your Impact & Rewards</h1>
                <p className="text-slate-500 text-lg">Every drop counts. See how you're making a difference.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Points Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-red-100 font-medium mb-2 uppercase tracking-wider text-xs">Total Points Earned</p>
                        <h2 className="text-6xl font-black mb-6 flex items-baseline gap-2">
                            {points} <span className="text-xl font-normal text-red-200">Points</span>
                        </h2>
                        <div className="flex gap-4">
                            <Button className="bg-white text-red-600 hover:bg-slate-100 border-none shadow-lg">Redeem Rewards</Button>
                            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">View History</Button>
                        </div>
                    </div>
                    <TrendingUp className="absolute right-[-20px] bottom-[-20px] h-64 w-64 text-red-500/20 rotate-12 pointer-events-none" />
                </div>

                {/* Level Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div className="bg-amber-100 p-3 rounded-2xl">
                                <Trophy className="h-6 w-6 text-amber-600" />
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level 4</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Elite Donor</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">
                            You're in the top 5% of donors this semester! 250 more points to reach <span className="font-semibold text-slate-900">Master</span>.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-slate-500">Progress</span>
                            <span className="text-red-600">75%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 rounded-full w-[75%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {badges.map((badge, i) => (
                    <div
                        key={i}
                        className={cn(
                            "p-6 rounded-3xl border transition-all text-center",
                            badge.earned
                                ? "bg-white border-slate-100 shadow-sm"
                                : "bg-slate-50 border-dashed border-slate-200 grayscale opacity-60"
                        )}
                    >
                        <div className={cn("mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-110", badge.bg)}>
                            <badge.icon className={cn("h-8 w-8", badge.color)} />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">{badge.name}</h4>
                        <p className="text-xs text-slate-500">{badge.description}</p>
                        {badge.earned && (
                            <div className="mt-4 flex justify-center">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Gift className="h-6 w-6 text-red-600" />
                    Available Rewards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { item: "Campus Cafeteria Voucher", cost: 500 },
                        { item: "Library Prime Membership", cost: 1200 },
                        { item: "Exclusive Donor T-Shirt", cost: 2000 },
                        { item: "VIP Entry to Campus Fest", cost: 3500 },
                    ].map((r, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-red-50 hover:border-red-100 transition-colors cursor-pointer group">
                            <span className="font-medium text-slate-700 group-hover:text-red-700">{r.item}</span>
                            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-500 shadow-sm">{r.cost} pts</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
