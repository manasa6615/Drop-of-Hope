"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import { Droplets } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Welcome back!");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Failed to login");
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
                        Sign in to Campus Lifeline
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="font-medium text-red-600 hover:text-red-500"
                        >
                            Sign up today
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <Input
                            label="Email address"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@university.edu"
                        />
                        <Input
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-slate-700"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                href="/auth/forgot-password"
                                className="font-medium text-red-600 hover:text-red-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        loading={loading ? "true" : undefined}
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
