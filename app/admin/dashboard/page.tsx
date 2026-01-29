'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRealtimeSlots, useRealtimeDevices } from '@/lib/hooks/useRealtime';
import { KPICards } from '@/components/parking/KPICards';
import { ParkingMap } from '@/components/parking/ParkingMap';
import { SlotDetailsPanel } from '@/components/parking/SlotDetailsPanel';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ParkingSlot } from '@/lib/firebase/slots';
import { formatRelativeTime } from '@/lib/utils/formatters';

export default function AdminDashboardPage() {
    const { slots, loading } = useRealtimeSlots();
    const { devices } = useRealtimeDevices();
    const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold font-display mb-2">
                    Admin <span className="bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">Dashboard</span>
                </h1>
                <p className="text-gray-400">Monitor and manage parking system</p>
            </motion.div>

            {/* KPI Cards */}
            <div className="mb-8">
                <KPICards slots={slots} loading={loading} />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Parking Map */}
                <div className="lg:col-span-2">
                    <ParkingMap
                        slots={slots}
                        onSlotSelect={setSelectedSlot}
                        selectedSlot={selectedSlot}
                    />
                </div>

                {/* Slot Details or Device Status */}
                <div>
                    {selectedSlot ? (
                        <SlotDetailsPanel
                            slot={selectedSlot}
                            onClose={() => setSelectedSlot(null)}
                        />
                    ) : (
                        <Card hover={false}>
                            <h3 className="text-lg font-bold mb-4">Device Status</h3>
                            <div className="space-y-3">
                                {devices.length > 0 ? (
                                    devices.map((device) => (
                                        <div
                                            key={device.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                                        >
                                            <div>
                                                <div className="font-medium">{device.deviceId}</div>
                                                <div className="text-xs text-gray-400">
                                                    {formatRelativeTime(device.lastSeen)}
                                                </div>
                                            </div>
                                            <Badge
                                                variant={device.status === 'online' ? 'success' : 'error'}
                                                dot
                                            >
                                                {device.status}
                                            </Badge>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        No devices registered
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
