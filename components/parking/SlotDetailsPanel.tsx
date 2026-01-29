'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Cpu } from 'lucide-react';
import { ParkingSlot } from '@/lib/firebase/slots';
import { Badge } from '../ui/Badge';
import { formatRelativeTime } from '@/lib/utils/formatters';
import { slideInFromRight } from '@/lib/utils/animations';

interface SlotDetailsPanelProps {
    slot: ParkingSlot | null;
    onClose: () => void;
}

export function SlotDetailsPanel({ slot, onClose }: SlotDetailsPanelProps) {
    return (
        <AnimatePresence>
            {slot && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    />

                    {/* Panel */}
                    <motion.div
                        variants={slideInFromRight}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed lg:relative top-0 right-0 h-full w-full sm:w-96 glass-dark border-l border-white/10 p-6 z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Slot Details</h3>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Slot ID */}
                        <div className="text-center mb-6">
                            <div className="text-5xl font-bold mb-2">{slot.slotId}</div>
                            <Badge
                                variant={slot.status === 'available' ? 'success' : 'error'}
                                dot
                            >
                                {slot.status.toUpperCase()}
                            </Badge>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <DetailItem
                                icon={MapPin}
                                label="Location"
                                value="Outdoor Parking Lot"
                            />

                            <DetailItem
                                icon={Clock}
                                label="Last Updated"
                                value={formatRelativeTime(slot.lastUpdated)}
                            />

                            {slot.sensorId && (
                                <DetailItem
                                    icon={Cpu}
                                    label="Sensor ID"
                                    value={slot.sensorId}
                                />
                            )}
                        </div>

                        {/* Status History (Mock Data) */}
                        <div className="mt-8">
                            <h4 className="text-sm font-semibold text-gray-400 mb-4">Recent Activity</h4>
                            <div className="space-y-3">
                                <ActivityItem
                                    status={slot.status}
                                    time={formatRelativeTime(slot.lastUpdated)}
                                />
                                {/* You can add more historical data here */}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function DetailItem({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
            <Icon className="w-5 h-5 text-accent-cyan mt-0.5" />
            <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">{label}</div>
                <div className="text-sm font-medium">{value}</div>
            </div>
        </div>
    );
}

function ActivityItem({ status, time }: { status: string; time: string }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <div
                className={`w-2 h-2 rounded-full ${status === 'available' ? 'bg-available' : 'bg-occupied'
                    }`}
            />
            <div className="flex-1">
                <div className="text-sm">
                    Status changed to <span className="font-semibold">{status}</span>
                </div>
                <div className="text-xs text-gray-400">{time}</div>
            </div>
        </div>
    );
}
