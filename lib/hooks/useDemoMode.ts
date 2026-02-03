'use client';

import { useState, useEffect, useCallback } from 'react';
import { ParkingSlot } from '../firebase/slots';

export function useDemoMode() {
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [demoSlots, setDemoSlots] = useState<ParkingSlot[]>([]);

    const initializeDemoSlots = useCallback(() => {
        // Fixed demo configuration:
        // A1, A2, A4 = Always Occupied (Red)
        // A3, A5 = Always Available (Green)
        const slotStatuses: Record<string, 'available' | 'occupied'> = {
            'A1': 'occupied',
            'A2': 'occupied',
            'A3': 'available',
            'A4': 'occupied',
            'A5': 'available',
        };

        const slots: ParkingSlot[] = ['A1', 'A2', 'A3', 'A4', 'A5'].map((slotId) => ({
            id: slotId,
            slotId,
            status: slotStatuses[slotId],
            lastUpdated: new Date(),
            sensorId: `DEMO_SENSOR_${slotId}`,
        }));
        setDemoSlots(slots);
    }, []);

    useEffect(() => {
        if (isDemoMode) {
            initializeDemoSlots();
            // No interval - slots stay fixed with no updates
        }
    }, [isDemoMode, initializeDemoSlots]);

    const toggleDemoMode = () => {
        setIsDemoMode((prev) => !prev);
    };

    return { isDemoMode, demoSlots, toggleDemoMode };
}
