'use client';

import Image from 'next/image';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="glass-dark border-t border-white/10 mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                <Image
                                    src="/unisiraj-logo.jpg"
                                    alt="UniSiraj Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold font-display bg-gradient-to-r from-brand-gold to-brand-navy bg-clip-text text-transparent">
                                    UniSiraj
                                </span>
                                <span className="text-xs text-gray-400">Smart Parking System</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            Real-time IoT parking management system for modern campuses.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <FooterLink href="/">Home</FooterLink>
                            <FooterLink href="/parking">Live Parking</FooterLink>
                            <FooterLink href="/about">About</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Connect</h3>
                        <div className="flex gap-4 mb-4">
                            <SocialLink href="https://github.com/Ahmeed-Gado" icon={<Github className="w-5 h-5" />} />
                            <SocialLink href="https://www.linkedin.com/in/ahmed-jado-88a932365" icon={<Linkedin className="w-5 h-5" />} />
                            <SocialLink href="mailto:GADO21774@GMAIL.COM" icon={<Mail className="w-5 h-5" />} />
                        </div>
                        <p className="text-sm text-gray-400">
                            Final Year Project<br />
                            Tiankiu Syed Sirajuddin International Islamic University
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} UniSiraj Smart Parking System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <a
                href={href}
                className="text-gray-400 hover:text-white transition-colors text-sm"
            >
                {children}
            </a>
        </li>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
            {icon}
        </a>
    );
}
