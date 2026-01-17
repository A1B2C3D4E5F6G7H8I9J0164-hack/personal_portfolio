'use client';

import { motion } from 'framer-motion';

const timelineData = [
    {
        year: "2021 - 2022",
        title: "Matriculation (Class X)",
        description: "Modern Sandeepni School (91.0%). Built a strong academic foundation.",
        icon: "🏫"
    },
    {
        year: "2023 - 2024",
        title: "Intermediate (Class XII)",
        description: "Modern Sandeepni School (82.6%). Focused on PCM and computer science basics.",
        icon: "🎓"
    },
    {
        year: "2024 - 2028",
        title: "B.Tech (AI)",
        description: "Newton School of Technology (7.2/10.0). Specializing in Artificial Intelligence and Full Stack Development.",
        icon: "🏛️"
    },
    {
        year: "Jun 2025 - Jul 2025",
        title: "Frontend Developer Intern",
        description: "TechQRT (Remote). Built React-based UI for a finance broker app. Integrated REST APIs.",
        icon: "💼"
    },
    {
        year: "2025",
        title: "Projects & Hackathons",
        description: "Built Learnsphere and CookCulture. Active in Dev Club and Hackathons.",
        icon: "🚀"
    }
];

export default function JourneyTimeline() {
    return (
        <div className="w-full max-w-4xl mx-auto py-20 px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                My <span className="text-gradient">Journey</span>
            </h2>

            <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:pl-10 space-y-12">
                {timelineData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-8 md:pl-0"
                    >
                        {/* Dot on line */}
                        <span className="absolute -left-[41px] md:-left-[49px] top-6 w-4 h-4 rounded-full bg-neon-blue shadow-[0_0_10px_#00f3ff]" />

                        <div className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-neon-blue/30 transition-colors group">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl">{item.icon}</span>
                                <div>
                                    <span className="text-neon-blue font-mono text-sm tracking-widest uppercase block mb-1">{item.year}</span>
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">{item.title}</h3>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
