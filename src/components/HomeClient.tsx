'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ProjectModal from '@/components/ProjectModal';
import InfiniteMarquee from '@/components/InfiniteMarquee';
import JourneyTimeline from '@/components/JourneyTimeline';
import ProblemSolving from '@/components/ProblemSolving';
import Values from '@/components/Values';
import TypewriterText from '@/components/TypewriterText';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

// --- Data ---
const projects = [
    {
        title: 'GenAI Project',
        tech: ['Streamlit', 'GenAI', 'Python'],
        description: 'A generative AI application with an interactive web interface.',
        links: { live: 'https://cosmicmagnetar-genai-project-srcapp-d5sbcx.streamlit.app/', github: 'https://github.com/CosmicMagnetar/GenAI_Project' },
        featured: true,
        features: ["Generative AI Models", "Interactive UI", "Data Processing"]
    },
    {
        title: 'ExamAi Assistant',
        tech: ['Next.js', 'AI', 'Vercel'],
        description: 'An AI-powered assistant designed to aid students in exam preparation.',
        links: { live: 'https://exam-ai-assistant-rho.vercel.app/', github: 'https://github.com/A1B2C3D4E5F6G7H8I9J0164-hack/ExamAi_Assistant' },
        featured: false,
        features: ["AI Study Guide Generation", "Interactive Quizzes", "Progress Tracking"]
    },
    {
        title: 'Cinerama',
        tech: ['Streamlit', 'Python', 'Machine Learning'],
        description: 'A comprehensive movie recommendation system based on user preferences.',
        links: { live: 'https://moviesrecommendationsystem-ttryehqsvtwsclnsbtk9ry.streamlit.app/', github: 'https://github.com/A1B2C3D4E5F6G7H8I9J0164-hack/Cinerama' },
        featured: true,
        features: ["Personalized Recommendations", "Collaborative Filtering", "Search & Discovery"]
    },
    {
        title: 'Learnsphere',
        tech: ['Next.js', 'Node.js', 'MongoDB'],
        description: 'Personal deep-work and learning dashboard with Pomodoro timer and AI summaries.',
        links: { live: 'https://capstone-sem-3.vercel.app/', github: 'https://github.com/A1B2C3D4E5F6G7H8I9J0164-hack/capstone_sem_3' },
        featured: false,
        features: ["Pomodoro Timer & Deep Work Analytics", "AI Learning Summaries", "Personalized Dashboard"]
    },
    {
        title: 'AI Resume Builder',
        tech: ['Next.js 15', 'Gemini AI', 'Mongoose', 'Tailwind'],
        description: 'AI-powered resume builder that generates professional resumes from user descriptions.',
        links: { live: 'https://resume-builder-two-puce.vercel.app/', github: 'https://github.com/A1B2C3D4E5F6G7H8I9J0164-hack/resume-builder' },
        featured: true,
        features: ["AI-Powered Content Generation", "Professional Templates", "Real-time Customization"]
    },
    {
        title: 'CookCulture',
        tech: ['React', 'Firebase', 'Tailwind'],
        description: 'Responsive recipe app with cultural blogs, authentication, and smooth animations.',
        links: { live: 'https://capstone-project-murex-three.vercel.app/', github: 'https://github.com/A1B2C3D4E5F6G7H8I9J0164-hack/capstone_project' },
        featured: false,
        features: ["Recipe Sharing & Discovery", "Cultural Blogs", "User Authentication & Profiles"]
    }
];

interface HomeClientProps {
    splineSlot: React.ReactNode;
    aboutSplineSlot: React.ReactNode;
}

export default function HomeClient({ splineSlot, aboutSplineSlot }: HomeClientProps) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const projectsRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: projectsRef, offset: ["start end", "end start"] });

    // Zoom Effect Logic for Projects
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    const openModal = (project: any) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden scroll-smooth">
            <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* --- HERO SECTION --- */}
            <section id="home" className="min-h-screen flex items-center justify-center p-8 relative w-full overflow-hidden">

                {/* Split Layout Container */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl z-10 gap-16 md:gap-32">

                    {/* Left: Text Content */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <h2 className="text-xl md:text-2xl font-mono text-neon-blue mb-4 tracking-widest uppercase">
                                Hello, I am
                            </h2>

                            {/* Static Name */}
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                                Aditya Rana
                            </h1>

                            {/* Typewriter Roles */}
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-400 mb-8 flex flex-col md:flex-row gap-2 md:gap-4 justify-center md:justify-start">
                                <span>I am a</span>
                                <span className="text-neon-purple">
                                    <TypewriterText />
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-12 leading-relaxed"
                        >
                            Passionate and future AI Engineer building scalable systems and crafting immersive digital experiences.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="flex flex-col md:flex-row gap-6 justify-center md:justify-start items-center"
                        >
                            <Link href="#projects" className="group relative px-8 py-4 bg-transparent border border-neon-blue rounded-full overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                                <span className="absolute inset-0 w-full h-full bg-neon-blue/10 group-hover:bg-neon-blue/20 transition-all duration-300"></span>
                                <span className="relative text-white font-bold tracking-wider group-hover:tracking-widest transition-all">VIEW WORK</span>
                            </Link>
                            <Link href="#contact" className="group px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:border-white/30 backdrop-blur-sm">
                                <span className="text-gray-300 group-hover:text-white transition-colors font-medium">Contact Me</span>
                            </Link>
                            <a href="/resume.pdf" download className="group px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:border-white/30 backdrop-blur-sm">
                                <span className="text-gray-300 group-hover:text-white transition-colors font-medium">Download Resume</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Spline 3D Robot */}
                    <div className="flex-1 flex justify-center md:justify-end relative h-[600px] w-full min-w-[50%]">
                        <div className="relative w-full h-full scale-110 md:scale-125 origin-center">
                            {splineSlot}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section id="about" className="min-h-screen py-20 px-8 w-full max-w-7xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">About <span className="text-gradient">Me</span></h2>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="glass p-8 rounded-3xl border-l-4 border-neon-blue">
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            I am a <span className="text-white font-semibold">passionate and future AI Engineer</span>. Aspiring to grow into a well-rounded professional capable of building scalable, intelligent, and impactful products. My experience has shaped my understanding of production-level development and teamwork.
                        </p>
                        <div className="space-y-4">
                            {['Intern @ TechQRT', 'Student @ NST'].map((job, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className="w-2 h-2 rounded-full bg-neon-blue" />
                                    <span className="text-gray-400">{job}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[400px] flex items-center justify-center">
                        {aboutSplineSlot}
                    </div>
                </div>

                {/* Infinite Tech Marquee */}
                <InfiniteMarquee />

                {/* Journey Timeline */}
                <JourneyTimeline />
            </section>

            {/* --- PROJECTS SECTION --- */}
            <section id="projects" ref={projectsRef} className="min-h-screen py-20 px-8 w-full max-w-7xl">
                <motion.h2
                    style={{ scale, opacity }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-center"
                >
                    Featured <span className="text-gradient">Projects</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            style={{ scale, opacity }}
                            className={`glass group p-8 rounded-3xl border border-white/5 relative overflow-hidden cursor-pointer hover:border-neon-blue/50 transition-all duration-300 ${project.featured ? 'md:col-span-2' : ''}`}
                            onClick={() => openModal(project)}
                        >
                            <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-blue transition-colors">{project.title}</h3>
                            <p className="text-gray-400 mb-6">{project.description}</p>
                            <div className="flex gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="px-2 py-1 text-xs bg-white/10 rounded-full text-neon-blue">{t}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- PROBLEM SOLVING SECTION --- */}
            <ProblemSolving />

            {/* --- VALUES SECTION --- */}
            <Values />

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="min-h-screen py-20 px-8 w-full max-w-7xl text-center flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's <span className="text-gradient">Connect</span></h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    Always open to learning, collaborating, or building cool stuff.
                </p>

                {/* Contact Form */}
                <ContactForm />

                {/* Social Links Footer */}
                <div className="flex justify-center gap-8 mt-16 opacity-70">
                    <a href="mailto:aditya.rana2024@nst.rishihood.edu.in" className="hover:text-neon-blue transition-colors">Email</a>
                    <span className="text-gray-600">|</span>
                    <a href="https://linkedin.com" target="_blank" className="hover:text-neon-blue transition-colors">LinkedIn</a>
                    <span className="text-gray-600">|</span>
                    <a href="https://github.com" target="_blank" className="hover:text-neon-blue transition-colors">GitHub</a>
                </div>
            </section>

            {/* Floating CTA */}
            <motion.a
                href="mailto:aditya.rana2024@nst.rishihood.edu.in"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-neon-purple text-white font-bold rounded-full shadow-[0_0_20px_rgba(188,19,254,0.5)] hover:scale-110 transition-transform"
            >
                Hire Me
            </motion.a>

        </main>
    );
}
