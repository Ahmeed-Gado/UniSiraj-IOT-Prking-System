'use client';

import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import { ParkingSlot } from '@/lib/firebase/slots';
import { cn } from '@/lib/utils/cn';

interface SlotCardProps {
    slot: ParkingSlot;
    onClick: () => void;
    selected: boolean;
}

export function SlotCard({ slot, onClick, selected }: SlotCardProps) {
    const isAvailable = slot.status === 'available';

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                'relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300',
                isAvailable
                    ? 'border-available bg-available/10 hover:bg-available/20'
                    : 'border-occupied bg-occupied/10 hover:bg-occupied/20',
                selected && 'ring-4 ring-accent-cyan',
                isAvailable && 'animate-pulse-glow'
            )}
            style={{
                '--glow-color': isAvailable ? 'var(--available-glow)' : 'var(--occupied-glow)',
            } as React.CSSProperties}
        >
            {/* Status Indicator */}
            <div className="absolute top-2 right-2">
                <div
                    className={cn(
                        'w-3 h-3 rounded-full',
                        isAvailable ? 'bg-available animate-pulse' : 'bg-occupied'
                    )}
                />
            </div>

            {/* Car Icon */}
            <div className="flex flex-col items-center justify-center gap-3">
                <Car
                    className={cn(
                        'w-12 h-12',
                        isAvailable ? 'text-available' : 'text-occupied'
                    )}
                />

                {/* Slot ID */}
                <div className="text-center">
                    <div className="text-2xl font-bold">{slot.slotId}</div>
                    <div className={cn(
                        'text-xs font-medium uppercase',
                        isAvailable ? 'text-available' : 'text-occupied'
                    )}>
                        {slot.status}
                    </div>
                </div>
            </div>

            {/* Glow Effect */}
            {isAvailable && (
                <div className="absolute inset-0 rounded-xl bg-available/5 blur-xl -z-10" />
            )}
        </motion.div>
    );
}
