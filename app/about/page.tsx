'use client';

import { motion } from 'framer-motion';
import { Code, Database, Wifi, Monitor } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { slideInFromBottom } from '@/lib/utils/animations';

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold font-display mb-4">
                        About <span className="bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">UniSiraj</span> Smart Parking
                    </h1>
                    <p className="text-xl text-gray-400">
                        Final Year Project - IoT-Based Parking Management System
                    </p>
                </motion.div>

                {/* University Logo & Info */}
                <motion.div
                    variants={slideInFromBottom}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <Card className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="relative w-32 h-32">
                                <Image
                                    src="/unisiraj-logo.jpg"
                                    alt="UniSiraj Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Tiankiu Syed Sirajuddin International Islamic University</h2>
                        <p className="text-gray-400">Final Year Project 2026</p>
                    </Card>
                </motion.div>

                {/* Project Description */}
                <motion.div
                    variants={slideInFromBottom}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <Card>
                        <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                The UniSiraj Smart Parking System is an innovative IoT-based solution designed to modernize parking management for university campuses and public facilities. By leveraging real-time sensor data and cloud technology, we provide instant parking availability information to users.
                            </p>
                            <p>
                                This system eliminates the frustration of searching for parking spots by displaying live occupancy status through an intuitive web interface. IR sensors detect vehicle presence with precision, ESP32 microcontrollers process the data and control servo motors for automated gate operation, while LCD displays show real-time information on-site. Firebase ensures real-time synchronization across all devices.
                            </p>
                            <p>
                                Our goal is to reduce traffic congestion, save time, and improve the overall parking experience through smart technology.
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                    variants={slideInFromBottom}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TechCard
                            icon={Code}
                            title="Frontend"
                            items={['Next.js 15', 'React 18', 'TypeScript', 'TailwindCSS', 'Framer Motion']}
                        />
                        <TechCard
                            icon={Database}
                            title="Backend & Database"
                            items={['Firebase Firestore', 'Firebase Authentication', 'Next.js API Routes']}
                        />
                        <TechCard
                            icon={Wifi}
                            title="Hardware"
                            items={['ESP32 Microcontroller', 'IR Sensors', 'Servo Motors (Gate Control)', 'LCD Display (16x2)', 'WiFi Module']}
                        />
                        <TechCard
                            icon={Monitor}
                            title="Deployment"
                            items={['Vercel (Frontend)', 'Firebase Hosting', 'Real-time Database']}
                        />
                    </div>
                </motion.div>

                {/* Features */}
                <motion.div
                    variants={slideInFromBottom}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Card>
                        <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-available text-xl">✓</span>
                                <span>Real-time parking availability updates (1-3 second latency)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-available text-xl">✓</span>
                                <span>Interactive parking map with visual status indicators</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-available text-xl">✓</span>
                                <span>Admin dashboard for monitoring and manual overrides</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-available text-xl">✓</span>
                                <span>Activity logs and analytics for usage insights</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-available text-xl">✓</span>
                                <span>Demo mode for presentations and testing</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-available text-xl">✓</span>
                                <span>Responsive design for desktop and mobile devices</span>
                            </li>
                        </ul>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

function TechCard({ icon: Icon, title, items }: { icon: React.ElementType; title: string; items: string[] }) {
    return (
        <Card>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-accent-cyan/10">
                    <Icon className="w-6 h-6 text-accent-cyan" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="text-gray-400 text-sm">• {item}</li>
                ))}
            </ul>
        </Card>
    );
}
