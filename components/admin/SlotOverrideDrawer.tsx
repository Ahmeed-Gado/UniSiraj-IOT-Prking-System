'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit } from 'lucide-react';
import { ParkingSlot, overrideSlotStatus } from '@/lib/firebase/slots';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { slideInFromRight } from '@/lib/utils/animations';

interface SlotOverrideDrawerProps {
    slot: ParkingSlot | null;
    onClose: () => void;
    adminEmail: string;
}

export function SlotOverrideDrawer({ slot, onClose, adminEmail }: SlotOverrideDrawerProps) {
    const [newStatus, setNewStatus] = useState<'available' | 'occupied'>('available');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleOverride = async () => {
        if (!slot) return;

        setLoading(true);
        try {
            await overrideSlotStatus(slot.slotId, newStatus, adminEmail, note);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 1500);
        } catch (error) {
            console.error('Override failed:', error);
        } finally {
            setLoading(false);
        }
    };

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
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        variants={slideInFromRight}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed top-0 right-0 h-full w-full sm:w-96 glass-dark border-l border-white/10 p-6 z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Manual Override</h3>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Current Status */}
                        <div className="mb-6 p-4 rounded-lg bg-white/5">
                            <div className="text-sm text-gray-400 mb-2">Current Slot</div>
                            <div className="text-3xl font-bold mb-2">{slot.slotId}</div>
                            <Badge
                                variant={slot.status === 'available' ? 'success' : 'error'}
                                dot
                            >
                                {slot.status.toUpperCase()}
                            </Badge>
                        </div>

                        {/* Override Form */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    New Status
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setNewStatus('available')}
                                        className={`p-4 rounded-lg border-2 transition-all ${newStatus === 'available'
                                                ? 'border-available bg-available/10 text-available'
                                                : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="text-sm font-medium">Available</div>
                                    </button>
                                    <button
                                        onClick={() => setNewStatus('occupied')}
                                        className={`p-4 rounded-lg border-2 transition-all ${newStatus === 'occupied'
                                                ? 'border-occupied bg-occupied/10 text-occupied'
                                                : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="text-sm font-medium">Occupied</div>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="note" className="block text-sm font-medium mb-2">
                                    Note (Optional)
                                </label>
                                <textarea
                                    id="note"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    rows={3}
                                    placeholder="Reason for manual override..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan resize-none"
                                />
                            </div>

                            <Button
                                onClick={handleOverride}
                                variant="primary"
                                className="w-full"
                                loading={loading}
                                disabled={success}
                            >
                                {success ? (
                                    'Override Successful! ✓'
                                ) : (
                                    <>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Apply Override
                                    </>
                                )}
                            </Button>

                            <div className="text-xs text-gray-400 text-center">
                                This action will be logged with your admin email
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
