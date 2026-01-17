'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Projects', path: '#projects' },
    { name: 'Contact', path: '#contact' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 p-4 flex justify-center items-start transition-all duration-300">

            {/* Ghost Container -> Visible Container */}
            <div className="glass px-8 py-4 rounded-full flex gap-8 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md bg-black/50 border border-white/10 pointer-events-auto mt-4">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`text-sm font-medium transition-all hover:text-neon-blue hover:scale-110 ${pathname === item.path ? 'text-white' : 'text-gray-400'
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

        </nav>
    );
}
