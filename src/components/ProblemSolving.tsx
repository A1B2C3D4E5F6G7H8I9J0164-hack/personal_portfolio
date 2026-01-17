'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Code2, Trophy, Brain } from 'lucide-react';

type GraphType = 'github' | 'leetcode';

export default function ProblemSolving() {
    const [graphType, setGraphType] = useState<GraphType>('github');
    const [githubData, setGithubData] = useState<number[]>([]);
    const [leetcodeData, setLeetCodeData] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);

    // Usernames
    const githubUsername = 'A1B2C3D4E5F6G7H8I9J0164-hack';
    const leetcodeUsername = 'aditya09102006';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (graphType === 'github') {
                    if (githubData.length > 0) {
                        setLoading(false);
                        // Recalc total or just keep current total if we want to be perfect, 
                        // but simpler to just re-fetch or assume total doesn't drastically change in seconds.
                        // For better UX during toggle, we could store total in specific state vars.
                        // But re-fetching is fast enough.
                    }

                    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
                    const data = await res.json();
                    if (data?.contributions) {
                        const daily = data.contributions;
                        const relevantData = daily.slice(-364).map((day: any) => day.level);
                        setGithubData(relevantData);
                        setTotalContributions(daily.reduce((acc: number, curr: any) => acc + curr.count, 0));
                    }
                } else {
                    // LeetCode Logic using leetcode-stats-api
                    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
                    const data = await res.json();

                    // The calendar is in data.submissionCalendar
                    const calendar = data.submissionCalendar || {};

                    const today = new Date();
                    const days = [];
                    let total = 0;

                    for (let i = 363; i >= 0; i--) {
                        const d = new Date(today);
                        d.setDate(d.getDate() - i);
                        d.setHours(0, 0, 0, 0);

                        const timestampKey = Object.keys(calendar).find(ts => {
                            const paramsDate = new Date(parseInt(ts) * 1000);
                            paramsDate.setHours(0, 0, 0, 0);
                            return paramsDate.getTime() === d.getTime();
                        });

                        const count = timestampKey ? calendar[timestampKey] : 0;
                        days.push(count);
                        total += count;
                    }

                    const levels = days.map(count => {
                        if (count === 0) return 0;
                        if (count <= 1) return 1;
                        if (count <= 3) return 2;
                        if (count <= 5) return 3;
                        return 4;
                    });

                    setLeetCodeData(levels);
                    setTotalContributions(total);
                }
            } catch (error) {
                console.error(`Failed to fetch ${graphType} data`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [graphType]);

    const getColor = (level: number) => {
        if (graphType === 'github') {
            switch (level) {
                case 0: return 'bg-white/5';
                case 1: return 'bg-neon-blue/20';
                case 2: return 'bg-neon-blue/40';
                case 3: return 'bg-neon-blue/70';
                case 4: return 'bg-neon-blue';
                default: return 'bg-white/5';
            }
        } else {
            switch (level) {
                case 0: return 'bg-white/5';
                case 1: return 'bg-yellow-500/20';
                case 2: return 'bg-yellow-500/40';
                case 3: return 'bg-yellow-500/70';
                case 4: return 'bg-yellow-500';
                default: return 'bg-white/5';
            }
        }
    };

    const stats = [
        { label: 'LeetCode', value: '200+', sub: 'Problems Solved', icon: Code2 },
        { label: 'Codeforces', value: '873', sub: 'Max Rating', icon: Trophy },
        { label: 'DSA', value: 'Advanced', sub: 'Data Structures & Algos', icon: Brain },
    ];

    const currentData = graphType === 'github' ? githubData : leetcodeData;
    const themeColor = graphType === 'github' ? 'text-neon-blue' : 'text-yellow-500';
    const bgThemeColor = graphType === 'github' ? 'bg-neon-blue' : 'bg-yellow-500';
    const borderColor = graphType === 'github' ? 'hover:border-neon-blue/50' : 'hover:border-yellow-500/50';

    return (
        <section className="w-full max-w-7xl mx-auto py-20 px-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
                Problem <span className="text-gradient">Solving</span>
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`glass p-8 rounded-3xl border border-white/5 transition-colors text-center ${index === 0 ? 'hover:border-yellow-500/30' : index === 1 ? 'hover:border-neon-blue/30' : 'hover:border-purple-500/30'}`}
                    >
                        <div className="flex justify-center mb-4">
                            <stat.icon className={`w-10 h-10 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-neon-blue' : 'text-purple-500'}`} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                        <p className={`font-mono mb-2 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-neon-blue' : 'text-purple-500'}`}>{stat.label}</p>
                        <p className="text-gray-500 text-sm">{stat.sub}</p>
                    </motion.div>
                ))}
            </div>

            {/* Graph Container */}
            <div className={`glass p-8 rounded-3xl border border-white/5 overflow-x-auto relative min-h-[300px] transition-colors duration-500 ${borderColor}`}>

                {/* Header with Toggle */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${bgThemeColor} shadow-[0_0_10px_currentColor]`}></span>
                        {graphType === 'github' ? 'GitHub Contributions' : 'LeetCode Submissions'}
                    </h3>

                    {/* Custom Toggle */}
                    <div className="flex bg-white/5 rounded-full p-1 border border-white/10 relative">
                        <motion.div
                            className={`absolute top-1 bottom-1 rounded-full ${graphType === 'github' ? 'bg-neon-blue' : 'bg-yellow-500'}`}
                            initial={false}
                            animate={{
                                x: graphType === 'github' ? 0 : '100%',
                                width: '50%'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => setGraphType('github')}
                            className={`relative z-10 px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${graphType === 'github' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            GitHub
                        </button>
                        <button
                            onClick={() => setGraphType('leetcode')}
                            className={`relative z-10 px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${graphType === 'leetcode' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            LeetCode
                        </button>
                    </div>
                </div>

                {/* Graph Grid */}
                <div className="flex gap-1 min-w-max pb-4">
                    {loading && currentData.length === 0 ? (
                        Array.from({ length: 52 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                {Array.from({ length: 7 }).map((_, j) => (
                                    <div key={j} className="w-3 h-3 rounded-sm bg-white/5 animate-pulse" />
                                ))}
                            </div>
                        ))
                    ) : (
                        Array.from({ length: 52 }).map((_, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1">
                                {Array.from({ length: 7 }).map((_, dayIndex) => {
                                    const index = weekIndex * 7 + dayIndex;
                                    const level = currentData[index] || 0;
                                    return (
                                        <motion.div
                                            key={dayIndex}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: (weekIndex * 0.005) + (dayIndex * 0.005) }}
                                            className={`w-3 h-3 rounded-sm ${getColor(level)}`}
                                            title={loading ? "Loading..." : `Level: ${level}`}
                                        />
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Info */}
                <div className="flex justify-between items-center mt-4 text-xs text-gray-500 font-mono border-t border-white/5 pt-4">
                    <a
                        href={graphType === 'github' ? `https://github.com/${githubUsername}` : `https://leetcode.com/u/${leetcodeUsername}`}
                        target="_blank"
                        className={`hover:${themeColor} transition-colors`}
                    >
                        @{graphType === 'github' ? githubUsername : leetcodeUsername}
                    </a>

                    {!loading && (
                        <span>{totalContributions} {graphType === 'github' ? 'contributions' : 'submissions'} in the last year</span>
                    )}

                    <div className="flex items-center gap-2">
                        <span>Less</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-white/5" />
                            <div className={`w-3 h-3 rounded-sm ${graphType === 'github' ? 'bg-neon-blue/20' : 'bg-yellow-500/20'}`} />
                            <div className={`w-3 h-3 rounded-sm ${graphType === 'github' ? 'bg-neon-blue/40' : 'bg-yellow-500/40'}`} />
                            <div className={`w-3 h-3 rounded-sm ${graphType === 'github' ? 'bg-neon-blue/70' : 'bg-yellow-500/70'}`} />
                            <div className={`w-3 h-3 rounded-sm ${bgThemeColor}`} />
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
