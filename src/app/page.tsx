"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Droplets, Heart, MapPin, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link className="flex items-center justify-center" href="/">
          <Droplets className="h-7 w-7 text-red-600" />
          <span className="ml-2 text-xl font-bold tracking-tight text-slate-900">Campus Lifeline</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-red-600 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-red-600 transition-colors" href="/auth/login">
            Login
          </Link>
          <Button variant="primary" size="sm" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-red-50/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 mb-4">
                  Emergency Blood Donation Network
                </div>
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-slate-900 max-w-3xl mx-auto">
                  Be a hero. Save a <span className="text-red-600">Life</span> on campus.
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl lg:text-2xl mt-6">
                  Connecting student blood donors with hospitals and emergencies in real-time. Fast, secure, and campus-focused.
                </p>
              </motion.div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="px-10" asChild>
                  <Link href="/auth/signup">Register as Donor</Link>
                </Button>
                <Button variant="outline" size="lg" className="px-10" asChild>
                  <Link href="/auth/signup?role=hospital">Hospital Registration</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-2xl bg-red-50">
                  <MapPin className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Geo-location Matching</h3>
                <p className="text-slate-600">Find the nearest donors instantly with pin-point accuracy during emergencies.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-2xl bg-red-50">
                  <Zap className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">AI Priority Ranking</h3>
                <p className="text-slate-600">Our AI ranks the most eligible and closest donors to ensure the fastest response.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-2xl bg-red-50">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Rewards System</h3>
                <p className="text-slate-600">Earn points for every life you save and unlock exclusive campus rewards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="w-full py-20 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
                  Secure. Fast. Reliable.
                </h2>
                <div className="space-y-4 text-slate-600 text-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-red-600 mt-1" />
                    <p><span className="font-semibold text-slate-900">Secure Authentication:</span> Campus-verified IDs for donors and licensed hospitals.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-6 w-6 text-red-600 mt-1" />
                    <p><span className="font-semibold text-slate-900">Real-time Notifications:</span> Instant SMS and Push alerts for matching blood types.</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="font-bold text-xl text-slate-900">Recent Emergencies</h4>
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase tracking-wider animate-pulse">Live</span>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">
                            {['A+', 'O-', 'B+'][i - 1]}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{['Central Hospital', 'City Clinic', 'University Med'][i - 1]}</p>
                            <p className="text-sm text-slate-500">{['2.5 km away', '1.2 km away', '0.5 km away'][i - 1]}</p>
                          </div>
                        </div>
                        <Button variant="danger" size="sm">Urgent</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-12 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-red-600" />
            <span className="font-bold text-lg text-slate-900">Campus Lifeline</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Campus Lifeline. Built for impact.</p>
          <div className="flex gap-6">
            <Link className="text-sm text-slate-500 hover:text-red-600" href="#">Privacy</Link>
            <Link className="text-sm text-slate-500 hover:text-red-600" href="#">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
