"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { MapPin, Droplets, Clock, Phone, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BloodRequest {
    id: string;
    hospitalName: string;
    bloodType: string;
    urgency: 'standard' | 'urgent' | 'critical';
    locationName: string;
    createdAt: any;
    units: number;
}

export default function MatchingPage() {
    const [requests, setRequests] = useState<BloodRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "requests"),
            where("status", "==", "active"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BloodRequest[];

            // AI Priority Ranking Logic
            // 1. Critical Urgency first
            // 2. Rarity of blood type (O- > O+ > AB- etc.)
            // 3. Newest requests
            const sortedDocs = [...docs].sort((a, b) => {
                const urgencyScore = { critical: 3, urgent: 2, standard: 1 };
                const bloodRarityScore: Record<string, number> = {
                    "O-": 8, "AB-": 7, "A-": 6, "B-": 5,
                    "O+": 4, "AB+": 3, "A+": 2, "B+": 1
                };

                if (urgencyScore[a.urgency] !== urgencyScore[b.urgency]) {
                    return urgencyScore[b.urgency] - urgencyScore[a.urgency];
                }

                const rarityA = bloodRarityScore[a.bloodType] || 0;
                const rarityB = bloodRarityScore[b.bloodType] || 0;

                if (rarityA !== rarityB) {
                    return rarityB - rarityA;
                }

                return b.createdAt - a.createdAt;
            });

            setRequests(sortedDocs);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Nearby Emergencies</h1>
                    <p className="text-slate-500">Live requests matching your profile.</p>
                </div>
                <div className="bg-red-50 px-4 py-2 rounded-xl text-red-600 text-sm font-semibold border border-red-100 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Campus Wide
                </div>
            </div>

            {requests.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-slate-50 p-4 rounded-full">
                            <Droplets className="h-12 w-12 text-slate-300" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No active requests</h3>
                    <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                        Everything looks stable! We'll notify you as soon as someone nearby needs your blood type.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {requests.map((request, index) => (
                            <motion.div
                                key={request.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center"
                            >
                                <div className={cn(
                                    "h-16 w-16 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0",
                                    request.urgency === 'critical' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 border border-red-100'
                                )}>
                                    {request.bloodType}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-slate-900 truncate">{request.hospitalName}</h3>
                                        {request.urgency === 'critical' && (
                                            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Critical</span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4" /> {request.locationName}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" /> Active • {request.units} units
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 w-full md:w-auto">
                                    <Button className="flex-1 md:flex-none">Accept</Button>
                                    <Button variant="outline" className="flex-1 md:flex-none">Details</Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
