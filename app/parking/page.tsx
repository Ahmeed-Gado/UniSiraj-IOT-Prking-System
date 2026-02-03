'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sun, Moon } from 'lucide-react';
import { useRealtimeSlots } from '@/lib/hooks/useRealtime';
import { useDemoMode } from '@/lib/hooks/useDemoMode';
import { useTheme } from '@/lib/hooks/useTheme';
import { ParkingSlot } from '@/lib/firebase/slots';
import { Badge } from '@/components/ui/Badge';
import { KPICards } from '@/components/parking/KPICards';
import { ParkingMap } from '@/components/parking/ParkingMap';
import { SlotDetailsPanel } from '@/components/parking/SlotDetailsPanel';
import { ActivityFeed } from '@/components/parking/ActivityFeed';
import { AnalyticsCharts } from '@/components/parking/AnalyticsCharts';
import { DemoModeToggle } from '@/components/parking/DemoModeToggle';
import { formatTime } from '@/lib/utils/formatters';

export default function ParkingPage() {
    const { slots: realSlots, loading } = useRealtimeSlots();
    const { isDemoMode, demoSlots, toggleDemoMode } = useDemoMode();
    const { theme, toggleTheme } = useTheme();
    const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // Use demo slots if demo mode is enabled, otherwise use real slots
    const slots = isDemoMode ? demoSlots : realSlots;

    // Update last updated time when slots change
    useEffect(() => {
        setLastUpdated(new Date());
    }, [slots]);

    if (!mounted) {
        return <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
                >
                    <div>
                        <h1 className="text-4xl font-bold font-display mb-2">
                            Live Parking <span className="bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">Availability</span>
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <Badge variant="success" dot>
                                System Online
                            </Badge>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Last updated: {formatTime(lastUpdated)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <DemoModeToggle enabled={isDemoMode} onToggle={toggleDemoMode} />

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-brand-gold" />
                            ) : (
                                <Moon className="w-5 h-5 text-brand-navy" />
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* KPI Cards */}
                <div className="mb-8">
                    <KPICards slots={slots} loading={loading && !isDemoMode} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Parking Map (2/3 width) */}
                    <div className="lg:col-span-2">
                        <ParkingMap
                            slots={slots}
                            onSlotSelect={setSelectedSlot}
                            selectedSlot={selectedSlot}
                        />
                    </div>

                    {/* Slot Details Panel (1/3 width) */}
                    <div className="hidden lg:block">
                        {selectedSlot ? (
                            <SlotDetailsPanel
                                slot={selectedSlot}
                                onClose={() => setSelectedSlot(null)}
                            />
                        ) : (
                            <div className="glass rounded-xl p-6 h-full flex items-center justify-center text-gray-400 text-center">
                                <div>
                                    <p className="text-lg mb-2">No slot selected</p>
                                    <p className="text-sm">Click on a parking slot to view details</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Slot Details Panel */}
                    <div className="lg:hidden">
                        <SlotDetailsPanel
                            slot={selectedSlot}
                            onClose={() => setSelectedSlot(null)}
                        />
                    </div>
                </div>

                {/* Bottom Section: Activity Feed & Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ActivityFeed />
                    <div>
                        <AnalyticsCharts />
                    </div>
                </div>
            </div>
        </div>
    );
}
