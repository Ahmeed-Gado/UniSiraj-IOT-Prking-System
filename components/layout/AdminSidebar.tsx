'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Car,
    Cpu,
    FileText,
    BarChart3,
    Settings,
    LogOut,
} from 'lucide-react';
import { onAuthChange, signOut } from '@/lib/firebase/auth';
import { cn } from '@/lib/utils/cn';

const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/slots', icon: Car, label: 'Slot Management' },
    { href: '/admin/devices', icon: Cpu, label: 'Devices' },
    { href: '/admin/logs', icon: FileText, label: 'Logs' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminSidebar() {
    const router = useRouter();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const handleLogout = async () => {
        await signOut();
        router.push('/admin/login');
    };

    return (
        <div className="w-64 h-screen fixed left-0 top-0 glass-dark border-r border-white/10 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">
                    Admin Panel
                </h2>
                <p className="text-xs text-gray-400 mt-1">UniSiraj Parking</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = currentPath === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer',
                                    isActive
                                        ? 'bg-accent-cyan/20 text-accent-cyan'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
