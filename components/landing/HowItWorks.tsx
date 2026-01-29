'use client';

import { motion } from 'framer-motion';
import { Wifi, Cloud, Monitor, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import { slideInFromBottom } from '@/lib/utils/animations';

const steps = [
    {
        number: '01',
        title: 'Sensor Detection',
        description: 'Ultrasonic sensors detect vehicle presence in each parking slot',
        icon: Wifi,
        color: 'from-available to-accent-cyan',
    },
    {
        number: '02',
        title: 'ESP32 Processing',
        description: 'ESP32 microcontroller processes sensor data and sends updates',
        icon: Zap,
        color: 'from-accent-cyan to-accent-blue',
    },
    {
        number: '03',
        title: 'Cloud Sync',
        description: 'Data is synchronized to Firebase Firestore in real-time',
        icon: Cloud,
        color: 'from-accent-blue to-brand-gold',
    },
    {
        number: '04',
        title: 'Live Updates',
        description: 'Website updates instantly, showing current parking availability',
        icon: Monitor,
        color: 'from-brand-gold to-available',
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                        How It <span className="bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">Works</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Our IoT-powered system provides real-time parking updates through a seamless four-step process
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={slideInFromBottom}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="relative h-full">
                                {/* Step Number */}
                                <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 absolute top-4 right-4`}>
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} p-0.5 mb-6`}>
                                    <div className="w-full h-full bg-[#0a0e27] rounded-xl flex items-center justify-center">
                                        <step.icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>

                                {/* Connection Line (except for last item) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
