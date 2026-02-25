"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import { Droplets, Landmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "user" | "hospital";

export default function SignupPage() {
    const [role, setRole] = useState<Role>("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update profile display name
            await updateProfile(user, { displayName: name });

            // Create Firestore document
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email,
                displayName: name,
                role: role,
                createdAt: new Date().toISOString(),
                // Generic defaults
                status: "available",
                points: 0,
            });

            toast.success("Account created successfully!");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-red-100 p-3">
                            <Droplets className="h-10 w-10 text-red-600" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                        Join Campus Lifeline
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="font-medium text-red-600 hover:text-red-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="mt-8">
                    <label className="text-sm font-medium text-slate-700 mb-3 block">
                        Register as:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setRole("user")}
                            className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                                role === "user"
                                    ? "border-red-600 bg-red-50 text-red-600"
                                    : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                            )}
                        >
                            <User className="h-6 w-6 mb-2" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Donor</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("hospital")}
                            className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                                role === "hospital"
                                    ? "border-red-600 bg-red-50 text-red-600"
                                    : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                            )}
                        >
                            <Landmark className="h-6 w-6 mb-2" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Hospital</span>
                        </button>
                    </div>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSignup}>
                    <div className="space-y-4">
                        <Input
                            label={role === "user" ? "Full Name" : "Hospital/Center Name"}
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={role === "user" ? "John Doe" : "City Medical Center"}
                        />
                        <Input
                            label="Email address"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                        />
                        <Input
                            label="Password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        loading={loading ? "true" : undefined}
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Sign up"}
                    </Button>

                    <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed">
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </form>
            </div>
        </div>
    );
}
