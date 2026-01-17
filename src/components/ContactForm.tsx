'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate submission
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <div className="w-full max-w-2xl mx-auto glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

            {status === 'success' ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-4xl">
                        ✨
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">I'll get back to you as soon as possible.</p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 text-left">
                            <label htmlFor="name" className="text-sm text-gray-400 uppercase tracking-wider font-mono ml-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2 text-left">
                            <label htmlFor="email" className="text-sm text-gray-400 uppercase tracking-wider font-mono ml-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label htmlFor="message" className="text-sm text-gray-400 uppercase tracking-wider font-mono ml-1">Message</label>
                        <textarea
                            id="message"
                            required
                            rows={5}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-4 bg-gradient-to-r from-neon-blue to-blue-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    );
}
