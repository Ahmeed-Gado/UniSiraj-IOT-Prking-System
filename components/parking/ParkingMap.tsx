'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { ParkingSlot } from '@/lib/firebase/slots';
import { SlotCard } from './SlotCard';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ParkingMapProps {
    slots: ParkingSlot[];
    onSlotSelect: (slot: ParkingSlot) => void;
    selectedSlot: ParkingSlot | null;
}

export function ParkingMap({ slots, onSlotSelect, selectedSlot }: ParkingMapProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'available' | 'occupied'>('all');

    const filteredSlots = slots.filter(slot => {
        const matchesSearch = slot.slotId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || slot.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <Card className="h-full" hover={false}>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Parking Map (Outdoor Lot)</h2>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search slot ID (A1, A2...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        />
                    </div>

                    {/* Filter */}
                    <div className="flex gap-2">
                        <FilterButton
                            active={filter === 'all'}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </FilterButton>
                        <FilterButton
                            active={filter === 'available'}
                            onClick={() => setFilter('available')}
                        >
                            Available
                        </FilterButton>
                        <FilterButton
                            active={filter === 'occupied'}
                            onClick={() => setFilter('occupied')}
                        >
                            Occupied
                        </FilterButton>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-available animate-pulse" />
                        <span className="text-gray-400">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-occupied" />
                        <span className="text-gray-400">Occupied</span>
                    </div>
                </div>
            </div>

            {/* Parking Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot) => (
                        <SlotCard
                            key={slot.id}
                            slot={slot}
                            onClick={() => onSlotSelect(slot)}
                            selected={selectedSlot?.id === slot.id}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-400">
                        No slots found matching your criteria
                    </div>
                )}
            </div>
        </Card>
    );
}

function FilterButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active
                    ? 'bg-accent-cyan text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
        >
            {children}
        </button>
    );
}
