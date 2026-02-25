"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import { AlertCircle, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function CreateRequestPage() {
    const { userProfile } = useAuth();
    const [bloodType, setBloodType] = useState("");
    const [urgency, setUrgency] = useState<"standard" | "urgent" | "critical">("standard");
    const [units, setUnits] = useState(1);
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bloodType) return toast.error("Please select a blood type");
        setLoading(true);

        try {
            await addDoc(collection(db, "requests"), {
                hospitalId: userProfile?.uid,
                hospitalName: userProfile?.displayName,
                bloodType,
                urgency,
                units,
                locationName: location,
                status: "active",
                createdAt: serverTimestamp(),
                // Mock coordinates for demonstration (would normally come from a map picker)
                coordinates: {
                    lat: 12.9716, // Simplified Bangalore lat
                    lng: 77.5946, // Simplified Bangalore lng
                },
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            });

            toast.success("Emergency request broadcasted!");
            setBloodType("");
            setUrgency("standard");
            setUnits(1);
        } catch (error: any) {
            toast.error("Failed to create request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Create Emergency Request</h1>
                <p className="text-slate-500">Broadcast an emergency blood request to nearby donors.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <div>
                    <label className="text-sm font-semibold text-slate-700 mb-4 block">Required Blood Type</label>
                    <div className="grid grid-cols-4 gap-3">
                        {bloodTypes.map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setBloodType(type)}
                                className={cn(
                                    "py-3 rounded-xl border-2 font-bold transition-all",
                                    bloodType === type
                                        ? "border-red-600 bg-red-50 text-red-600"
                                        : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-4 block">Urgency Level</label>
                        <div className="space-y-3">
                            {(["standard", "urgent", "critical"] as const).map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setUrgency(level)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all capitalize",
                                        urgency === level
                                            ? "border-red-600 bg-red-50 text-red-600 font-bold"
                                            : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        {level === "critical" && <AlertCircle className="h-4 w-4" />}
                                        {level === "urgent" && <Clock className="h-4 w-4" />}
                                        {level}
                                    </span>
                                    {level === "critical" && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full uppercase">Immediate</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Input
                            label="Units Required (ml)"
                            type="number"
                            min={1}
                            value={units}
                            onChange={(e) => setUnits(parseInt(e.target.value))}
                            placeholder="e.g., 450"
                        />
                        <Input
                            label="Exact Location / Ward"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., Ward 4, General Hospital"
                            required
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                        {loading ? "Broadcasting..." : "Broadcast Request"}
                    </Button>
                    <p className="mt-4 text-xs text-center text-slate-400">
                        Emergency requests are visible to all eligible donors within a 10km radius.
                    </p>
                </div>
            </form>
        </div>
    );
}
