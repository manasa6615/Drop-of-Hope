"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
    {
        id: "age",
        question: "Are you between 18 and 65 years of age?",
        type: "boolean",
    },
    {
        id: "weight",
        question: "Do you weigh at least 50 kg?",
        type: "boolean",
    },
    {
        id: "lastDonation",
        question: "Has it been more than 3 months since your last blood donation?",
        type: "boolean",
    },
    {
        id: "chronic",
        question: "Do you have any chronic medical conditions (e.g., heart disease, diabetes on insulin)?",
        type: "boolean",
        invert: true, // "No" is the correct answer
    },
    {
        id: "tattoos",
        question: "Have you had a tattoo or piercing in the last 6 months?",
        type: "boolean",
        invert: true,
    },
];

export default function EligibilityChecker() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, boolean>>({});
    const [result, setResult] = useState<'eligible' | 'ineligible' | null>(null);

    const handleAnswer = (answer: boolean) => {
        const question = questions[currentStep];
        const newAnswers = { ...answers, [question.id]: answer };
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Calculate result
            const isEligible = questions.every(q => {
                const ans = newAnswers[q.id];
                return q.invert ? !ans : ans;
            });
            setResult(isEligible ? 'eligible' : 'ineligible');
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setAnswers({});
        setResult(null);
    };

    if (result) {
        return (
            <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 text-center">
                {result === 'eligible' ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-green-100 p-4 font-bold">
                                <CheckCircle2 className="h-16 w-16 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">You are eligible!</h2>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            Based on your answers, you meet the initial criteria for blood donation.
                            Heroes like you make the campus safer. Let's find someone who needs your help!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="px-8" onClick={() => window.location.href = '/dashboard/matching'}>
                                Find Local Requests
                            </Button>
                            <Button variant="outline" size="lg" onClick={reset}>Check Again</Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-red-100 p-4">
                                <AlertTriangle className="h-16 w-16 text-red-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">You are not eligible yet</h2>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            Stay healthy! Based on your criteria, you cannot donate right now.
                            Please consult a medical professional if you have concerns. You can check again in a few months.
                        </p>
                        <Button variant="outline" size="lg" className="px-8" onClick={reset}>
                            Restart Checker
                        </Button>
                    </motion.div>
                )}
            </div>
        );
    }

    const progress = ((currentStep) / questions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Donation Eligibility Checker</h1>
                <p className="text-slate-500">Fast 1-minute check to see if you can save a life today.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                {/* Progress Bar */}
                <div className="h-2 w-full bg-slate-100">
                    <motion.div
                        className="h-full bg-red-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                <div className="p-8 md:p-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-red-50 p-2 rounded-lg shrink-0">
                                    <Info className="h-6 w-6 text-red-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-slate-800 leading-tight">
                                    {questions[currentStep].question}
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-24 text-xl hover:border-red-600 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => handleAnswer(true)}
                                >
                                    Yes
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-24 text-xl hover:border-slate-300 hover:bg-slate-50"
                                    onClick={() => handleAnswer(false)}
                                >
                                    No
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <p className="mt-12 text-sm text-center text-slate-400">
                        Step {currentStep + 1} of {questions.length}
                    </p>
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0" />
                <p className="text-sm text-blue-700">
                    Note: This is an initial screening. A final eligibility test will be conducted at the donation site by professional medical staff.
                </p>
            </div>
        </div>
    );
}
