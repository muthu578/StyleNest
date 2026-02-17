'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios';
import { clsx } from 'clsx';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const ChatSupport = () => {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        setMessages([
            {
                id: '1',
                text: 'Hello! I am your StyleNest assistant. How can I help you today?',
                sender: 'ai',
                timestamp: new Date(),
            },
        ]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    if (!mounted) return null;

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: message,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/support/chat', {
                message: userMsg.text,
            });

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: response.data.response,
                sender: 'ai',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-inter">
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 group",
                    isOpen ? "bg-black text-white rotate-90" : "bg-black text-white"
                )}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} className="group-hover:animate-pulse" />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-black border-2 border-white"></span>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            <div
                className={clsx(
                    "absolute bottom-20 right-0 w-[380px] h-[550px] bg-white rounded-[32px] shadow-px overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19, 1, 0.22, 1)] border border-gray-100 flex flex-col transform origin-bottom-right",
                    isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-10 pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="bg-black p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Bot className="text-white" size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-sm uppercase tracking-widest">StyleNest AI</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-white/60 text-[10px] uppercase font-bold tracking-tighter">Support Online</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-gray-50/50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={clsx(
                                "flex flex-col max-w-[85%] animate-fade-in",
                                msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                            )}
                        >
                            <div
                                className={clsx(
                                    "p-4 rounded-[22px] text-sm leading-relaxed shadow-sm",
                                    msg.sender === 'user'
                                        ? "bg-black text-white rounded-br-none"
                                        : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                                )}
                            >
                                {msg.text}
                            </div>
                            <span className="text-[9px] text-gray-400 mt-2 font-bold uppercase tracking-widest px-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-2 max-w-[85%] animate-pulse">
                            <div className="p-4 rounded-[22px] rounded-bl-none bg-white border border-gray-100 shadow-sm flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin text-gray-400" />
                                <span className="text-sm text-gray-400 font-medium">Assistant is thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-gray-50">
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-black/5 transition-all outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                        />
                        <button
                            type="submit"
                            disabled={!message.trim() || isLoading}
                            className="absolute right-2 p-2.5 bg-black text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                    <p className="text-center text-[9px] text-gray-400 mt-4 uppercase font-bold tracking-[0.2em] opacity-50">
                        AI Assistant Powered by StyleNest
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatSupport;
