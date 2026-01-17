'use client';

import { motion } from 'framer-motion';

export default function GithubGraph() {
    // Simulate 365 days of contributions
    const contributions = Array.from({ length: 364 }, () => Math.floor(Math.random() * 5));

    const getColor = (level: number) => {
        switch (level) {
            case 0: return 'bg-white/5';
            case 1: return 'bg-neon-blue/20';
            case 2: return 'bg-neon-blue/40';
            case 3: return 'bg-neon-blue/70';
            case 4: return 'bg-neon-blue';
            default: return 'bg-white/5';
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-20 px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                Code <span className="text-gradient">Activity</span>
            </h2>

            <div className="glass p-8 rounded-3xl border border-white/5 overflow-x-auto">
                <div className="flex gap-1 min-w-max">
                    {Array.from({ length: 52 }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                const level = contributions[weekIndex * 7 + dayIndex] || 0;
                                return (
                                    <motion.div
                                        key={dayIndex}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: (weekIndex * 0.01) + (dayIndex * 0.01) }}
                                        viewport={{ once: true }}
                                        className={`w-3 h-3 rounded-sm ${getColor(level)}`}
                                        title={`Contributions: ${level}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4 text-xs text-gray-500 font-mono">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-white/5" />
                        <div className="w-3 h-3 rounded-sm bg-neon-blue/20" />
                        <div className="w-3 h-3 rounded-sm bg-neon-blue/40" />
                        <div className="w-3 h-3 rounded-sm bg-neon-blue/70" />
                        <div className="w-3 h-3 rounded-sm bg-neon-blue" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
}
