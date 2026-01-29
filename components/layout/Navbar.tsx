'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/hooks/useTheme';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils/cn';

export function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                                src="/unisiraj-logo.jpg"
                                alt="UniSiraj Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold font-display bg-gradient-to-r from-brand-gold to-brand-navy bg-clip-text text-transparent">
                                UniSiraj
                            </span>
                            <span className="text-xs text-gray-400">Smart Parking System</span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/parking">Live Parking</NavLink>
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                        <NavLink href="/admin/login">Admin</NavLink>
                    </div>

                    {/* CTA and Theme Toggle */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-brand-gold" />
                            ) : (
                                <Moon className="w-5 h-5 text-brand-navy" />
                            )}
                        </button>

                        <Link href="/parking">
                            <Button variant="primary" size="sm" className="glow-cyan hidden md:block">
                                View Live Parking
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-gray-300 hover:text-white transition-colors relative group"
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-gold to-accent-cyan group-hover:w-full transition-all duration-300" />
        </Link>
    );
}
