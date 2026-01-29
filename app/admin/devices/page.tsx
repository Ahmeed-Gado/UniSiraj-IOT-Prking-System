'use client';

import { motion } from 'framer-motion';
import { useRealtimeDevices } from '@/lib/hooks/useRealtime';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Cpu } from 'lucide-react';
import { formatDateTime } from '@/lib/utils/formatters';

export default function AdminDevicesPage() {
    const { devices, loading } = useRealtimeDevices();

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold font-display mb-2">
                    Device <span className="bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">Management</span>
                </h1>
                <p className="text-gray-400">Monitor ESP32 devices and sensors</p>
            </motion.div>

            {/* Devices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <div className="skeleton h-32 rounded" />
                        </Card>
                    ))
                ) : devices.length > 0 ? (
                    devices.map((device) => (
                        <Card key={device.id}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-lg bg-accent-cyan/10">
                                    <Cpu className="w-6 h-6 text-accent-cyan" />
                                </div>
                                <Badge
                                    variant={device.status === 'online' ? 'success' : 'error'}
                                    dot
                                >
                                    {device.status}
                                </Badge>
                            </div>

                            <h3 className="text-xl font-bold mb-2">{device.deviceId}</h3>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Status:</span>
                                    <span className={device.status === 'online' ? 'text-available' : 'text-occupied'}>
                                        {device.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Last Seen:</span>
                                    <span>{formatDateTime(device.lastSeen)}</span>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card className="col-span-full">
                        <div className="text-center py-12 text-gray-400">
                            <Cpu className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No devices registered yet</p>
                            <p className="text-sm mt-2">Devices will appear here once they connect to the system</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
