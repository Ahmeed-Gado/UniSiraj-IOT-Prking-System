'use client';

import { motion } from 'framer-motion';
import { Car, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { ParkingSlot } from '@/lib/firebase/slots';
import { scaleIn } from '@/lib/utils/animations';

interface KPICardsProps {
    slots: ParkingSlot[];
    loading: boolean;
}

export function KPICards({ slots, loading }: KPICardsProps) {
    const totalSlots = slots.length || 5;
    const availableSlots = slots.filter(s => s.status === 'available').length;
    const occupiedSlots = slots.filter(s => s.status === 'occupied').length;
    const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

    const kpis = [
        {
            label: 'Total Slots',
            value: totalSlots,
            icon: Car,
            color: 'text-accent-cyan',
            bgColor: 'bg-accent-cyan/10',
            borderColor: 'border-accent-cyan/30',
        },
        {
            label: 'Available',
            value: availableSlots,
            icon: CheckCircle,
            color: 'text-available',
            bgColor: 'bg-available/10',
            borderColor: 'border-available/30',
        },
        {
            label: 'Occupied',
            value: occupiedSlots,
            icon: XCircle,
            color: 'text-occupied',
            bgColor: 'bg-occupied/10',
            borderColor: 'border-occupied/30',
        },
        {
            label: 'Occupancy Rate',
            value: occupancyRate,
            icon: TrendingUp,
            color: 'text-brand-gold',
            bgColor: 'bg-brand-gold/10',
            borderColor: 'border-brand-gold/30',
            suffix: '%',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, index) => (
                <motion.div
                    key={index}
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className={`border ${kpi.borderColor}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                            </div>
                        </div>

                        <div className={`text-3xl font-bold ${kpi.color} mb-1`}>
                            {loading ? (
                                <div className="skeleton h-9 w-16 rounded" />
                            ) : (
                                <>
                                    <AnimatedCounter value={kpi.value} />
                                    {kpi.suffix && <span>{kpi.suffix}</span>}
                                </>
                            )}
                        </div>

                        <div className="text-sm text-gray-400">{kpi.label}</div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
