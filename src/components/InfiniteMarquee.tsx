'use client';

import { motion } from 'framer-motion';

const techs = [
    'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'SQL', 'TypeScript', 'Python', 'Tailwind', 'Framer Motion', 'GSAP', 'Figma'
];

export default function InfiniteMarquee() {
    return (
        <div className="relative w-full overflow-hidden py-10 bg-black/50 border-y border-white/5 backdrop-blur-sm">
            <motion.div
                className="flex gap-16 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {/* Repeat list twice for seamless loop */}
                {[...techs, ...techs].map((tech, i) => (
                    <span key={i} className="text-2xl md:text-3xl font-bold text-gray-500 hover:text-neon-blue transition-colors cursor-default uppercase tracking-wider">
                        {tech}
                    </span>
                ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
    );
}
