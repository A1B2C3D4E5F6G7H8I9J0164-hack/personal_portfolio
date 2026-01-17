'use client';

import { motion } from 'framer-motion';

export default function Values() {
    const values = [
        {
            title: "Learning by building",
            desc: "I believe the best way to learn is to get my hands dirty and build real things.",
            color: "bg-blue-500"
        },
        {
            title: "Consistency over motivation",
            desc: "Motivation fades, but discipline and consistent effort yield long-term results.",
            color: "bg-purple-500"
        },
        {
            title: "Growth mindset",
            desc: "Challenges are opportunities. I embrace failure as a stepping stone to mastery.",
            color: "bg-green-500"
        },
        {
            title: "Clean code matters",
            desc: "Code is read more often than it is written. Readability and maintainability are key.",
            color: "bg-pink-500"
        }
    ];

    return (
        <section className="w-full max-w-7xl mx-auto py-20 px-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
                My <span className="text-gradient">Values</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 left-0 w-full h-1 ${item.color} opacity-50`} />
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
