'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3, // Trailing effect
            });
        };

        const handleHover = () => setIsHovering(true);
        const handleUnhover = () => setIsHovering(false);

        // Attach listeners to interactive elements
        const links = document.querySelectorAll('a, button, input, textarea');
        links.forEach((link) => {
            link.addEventListener('mouseenter', handleHover);
            link.addEventListener('mouseleave', handleUnhover);
        });

        window.addEventListener('mousemove', moveCursor);

        // Re-attach on route change
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            links.forEach((link) => {
                link.removeEventListener('mouseenter', handleHover);
                link.removeEventListener('mouseleave', handleUnhover);
            });
            document.body.style.cursor = 'auto';
        };
    }, [pathname]); // Re-run when route changes to attach to new links

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
            />
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference transition-transform duration-300 transform -translate-x-1/2 -translate-y-1/2 ${isHovering ? 'scale-150 bg-white/10' : 'scale-100'
                    }`}
            />
        </>
    );
}
