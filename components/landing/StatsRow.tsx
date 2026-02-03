'use client';

import { motion } from 'framer-motion';
import { Car, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { staggerContainer, scaleIn } from '@/lib/utils/animations';
import { useRealtimeSlots } from '@/lib/hooks/useRealtime';

export function StatsRow() {
    const { slots, loading } = useRealtimeSlots();

    // Calculate real values from slots
    const totalSlots = slots.length || 5;
    const availableSlots = slots.filter(s => s.status === 'available').length;
    const occupiedSlots = slots.filter(s => s.status === 'occupied').length;

    // Default to 0 if loading to avoid NaN
    const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

    const stats = [
        {
            label: 'Total Slots',
            value: totalSlots,
            icon: Car,
            color: 'text-accent-cyan',
            bgColor: 'bg-accent-cyan/10',
        },
        {
            label: 'Available',
            value: availableSlots,
            icon: CheckCircle,
            color: 'text-available',
            bgColor: 'bg-available/10',
        },
        {
            label: 'Occupied',
            value: occupiedSlots,
            icon: XCircle,
            color: 'text-occupied',
            bgColor: 'bg-occupied/10',
        },
        {
            label: 'Occupancy Rate',
            value: occupancyRate,
            icon: Car,
            color: 'text-brand-gold',
            bgColor: 'bg-brand-gold/10',
            suffix: '%',
        },
    ];

    if (loading && slots.length === 0) {
        return (
            <div className="py-20 px-4 text-center text-gray-400">
                <div className="animate-pulse">Loading live parking data...</div>
            </div>
        );
    }

    return (
        <section className="py-20 px-4">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, index) => (
                    <motion.div key={index} variants={scaleIn}>
                        <Card className="text-center">
                            <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center mx-auto mb-4`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                                <AnimatedCounter value={stat.value} />
                                {stat.suffix && <span>{stat.suffix}</span>}
                            </div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
