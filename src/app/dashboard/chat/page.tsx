"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    where
} from "firebase/firestore";
import { Send, User, Landmark, Paperclip, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    senderId: string;
    senderName: string;
    createdAt: any;
}

export default function ChatPage() {
    const { userProfile } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // In a real app, we'd filter by chatRoomId
        // For now, we'll use a global public chat for the campus emergency network
        const q = query(
            collection(db, "emergency_chat"),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Message[];
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !userProfile) return;

        const text = newMessage;
        setNewMessage("");

        await addDoc(collection(db, "emergency_chat"), {
            text,
            senderId: userProfile.uid,
            senderName: userProfile.displayName,
            senderRole: userProfile.role,
            createdAt: serverTimestamp(),
        });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-xl">
                        <Landmark className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 leading-none">Emergency Network</h3>
                        <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            Live Broadcast Channel
                        </p>
                    </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                    <MoreVertical className="h-5 w-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('/grid.svg')] bg-repeat">
                {messages.map((msg, i) => {
                    const isMe = msg.senderId === userProfile?.uid;
                    return (
                        <div
                            key={msg.id || i}
                            className={cn(
                                "flex flex-col max-w-[80%]",
                                isMe ? "ml-auto items-end" : "items-start"
                            )}
                        >
                            {!isMe && (
                                <span className="text-[10px] font-bold text-slate-400 mb-1 ml-1 px-1">
                                    {msg.senderName}
                                </span>
                            )}
                            <div className={cn(
                                "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                                isMe
                                    ? "bg-red-600 text-white rounded-tr-none"
                                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                            )}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 opacity-70">
                                {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                            </span>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white flex gap-2 items-center">
                <button type="button" className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 transition-all outline-none"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                </div>
                <Button type="submit" size="sm" className="h-10 w-10 p-0 rounded-xl">
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    );
}
