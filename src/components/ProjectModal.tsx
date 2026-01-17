'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // Using lucide-react for icons if available, or simple SVG

interface Project {
    title: string;
    tech: string[];
    description: string;
    links: { live: string; github: string };
    featured?: boolean;
    features?: string[];
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    return (
        <AnimatePresence>
            {isOpen && project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-2xl w-full p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>

                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{project.title}</h2>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((t) => (
                                    <span key={t} className="px-3 py-1 text-sm font-mono rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Features List */}
                            {project.features && (
                                <ul className="mb-6 space-y-2">
                                    {project.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-300">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-purple shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <div className="flex gap-4">
                                <a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 bg-neon-blue text-black font-bold text-center rounded-lg hover:bg-white transition-colors"
                                >
                                    Live Demo
                                </a>
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 border border-white/20 text-white font-bold text-center rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    GitHub
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
