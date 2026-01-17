'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GsapMagneticTextProps {
    text: string;
    className?: string;
}

export default function GsapMagneticText({ text, className }: GsapMagneticTextProps) {
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Scramble Text Effect on Load
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        const originalText = text.split('');
        let iterations = 0;

        // Initial Animation
        gsap.fromTo(element,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                onUpdate: function () {
                    // Determine how much of the text is revealed based on progress
                    const progress = this.progress();
                    const revealedIndex = Math.floor(progress * originalText.length);

                    element.innerText = originalText
                        .map((char, index) => {
                            if (index < revealedIndex) return char;
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');
                },
                onComplete: () => {
                    element.innerText = text;
                }
            }
        );

        // Hover Animation (Magnetic + Glitch)
        const handleMouseEnter = () => {
            gsap.to(element, { color: '#00f3ff', duration: 0.3 }); // Neon blue
        };

        const handleMouseLeave = () => {
            gsap.to(element, { color: 'white', duration: 0.3 });
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, [text]);

    return (
        <span ref={elementRef} className={`cursor-default ${className}`}>
            {text}
        </span>
    );
}
