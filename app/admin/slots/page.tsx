'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';
import { useRealtimeSlots } from '@/lib/hooks/useRealtime';
import { onAuthChange } from '@/lib/firebase/auth';
import { ParkingSlot } from '@/lib/firebase/slots';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SlotOverrideDrawer } from '@/components/admin/SlotOverrideDrawer';
import { formatRelativeTime } from '@/lib/utils/formatters';

export default function AdminSlotsPage() {
    const { slots, loading } = useRealtimeSlots();
    const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
    const [adminEmail, setAdminEmail] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user?.email) {
                setAdminEmail(user.email);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold font-display mb-2">
                    Slot <span className="bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">Management</span>
                </h1>
                <p className="text-gray-400">Manage parking slots and manual overrides</p>
            </motion.div>

            {/* Slots Table */}
            <Card hover={false}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Slot ID</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Last Updated</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Sensor ID</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-8">
                                        <div className="skeleton h-8 w-full rounded" />
                                    </td>
                                </tr>
                            ) : slots.length > 0 ? (
                                slots.map((slot) => (
                                    <tr key={slot.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-3 px-4 text-sm font-bold">{slot.slotId}</td>
                                        <td className="py-3 px-4 text-sm">
                                            <Badge variant={slot.status === 'available' ? 'success' : 'error'} dot>
                                                {slot.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-400">
                                            {formatRelativeTime(slot.lastUpdated)}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-400">
                                            {slot.sensorId || '-'}
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <button
                                                onClick={() => setSelectedSlot(slot)}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Override
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-gray-400">
                                        No slots found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Override Drawer */}
            <SlotOverrideDrawer
                slot={selectedSlot}
                onClose={() => setSelectedSlot(null)}
                adminEmail={adminEmail}
            />
        </div>
    );
}
