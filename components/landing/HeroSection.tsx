'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { slideInFromLeft, slideInFromRight } from '@/lib/utils/animations';

export function HeroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center pt-20 px-4">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <motion.div
                    variants={slideInFromLeft}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <Badge variant="success" dot>
                        System Online
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight">
                        <span className="bg-gradient-to-r from-brand-gold via-accent-cyan to-accent-blue bg-clip-text text-transparent">
                            Smart Parking
                        </span>
                        <br />
                        <span className="text-white">System</span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-xl">
                        Real-time parking availability using IoT technology. Find your perfect parking spot instantly with our intelligent monitoring system.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/parking">
                            <Button variant="primary" size="lg" className="glow-cyan group">
                                View Live Parking
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <Button variant="secondary" size="lg">
                            How It Works
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-8 pt-4">
                        <div>
                            <div className="text-3xl font-bold text-available">5</div>
                            <div className="text-sm text-gray-400">Total Slots</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-accent-cyan">
                                <Activity className="w-8 h-8 inline" />
                            </div>
                            <div className="text-sm text-gray-400">Real-time Updates</div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Animated Illustration */}
                <motion.div
                    variants={slideInFromRight}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                >
                    <div className="relative w-full h-96 lg:h-[500px]">
                        {/* Animated Parking Illustration */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="relative w-full h-full glass rounded-3xl p-8 flex items-center justify-center">
                                {/* Simple Parking Lot Visualization */}
                                <div className="grid grid-cols-2 gap-6">
                                    <ParkingSlotPreview status="occupied" label="A1" />
                                    <ParkingSlotPreview status="occupied" label="A2" />
                                    <ParkingSlotPreview status="available" label="A3" />
                                    <ParkingSlotPreview status="occupied" label="A4" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 to-brand-gold/20 blur-3xl -z-10" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ParkingSlotPreview({ status, label }: { status: 'available' | 'occupied'; label: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`w-24 h-32 rounded-lg border-2 flex flex-col items-center justify-center gap-2 ${status === 'available'
                ? 'border-available bg-available/10 glow-available'
                : 'border-occupied bg-occupied/10'
                }`}
        >
            <div className={`w-3 h-3 rounded-full ${status === 'available' ? 'bg-available animate-pulse' : 'bg-occupied'
                }`} />
            <span className="text-sm font-bold">{label}</span>
            <span className="text-xs text-gray-400">{status}</span>
        </motion.div>
    );
}
