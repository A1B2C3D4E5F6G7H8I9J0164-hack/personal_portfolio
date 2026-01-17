'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const words = ["Full Stack Developer", "Competitive Programmer", "AI Enthusiast", "Frontend Developer"];

export default function TypewriterText() {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor
    useEffect(() => {
        const timeout2 = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(timeout2);
    }, []);

    // Typing logic
    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 75 : 150); // Deleting is faster than typing

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse]);

    return (
        <span className="inline-block min-w-[200px] text-left">
            {words[index].substring(0, subIndex)}
            <motion.span
                animate={{ opacity: blink ? 1 : 0 }}
                className="inline-block w-[3px] h-[1em] bg-neon-blue ml-1 align-middle"
            />
        </span>
    );
}
