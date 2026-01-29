'use client';

import { useState, useEffect, useCallback } from 'react';
import { ParkingSlot } from '../firebase/slots';

export function useDemoMode() {
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [demoSlots, setDemoSlots] = useState<ParkingSlot[]>([]);

    const initializeDemoSlots = useCallback(() => {
        const slots: ParkingSlot[] = ['A1', 'A2', 'A3', 'A4', 'A5'].map((slotId) => ({
            id: slotId,
            slotId,
            status: Math.random() > 0.5 ? 'available' : 'occupied',
            lastUpdated: new Date(),
            sensorId: `DEMO_SENSOR_${slotId}`,
        }));
        setDemoSlots(slots);
    }, []);

    useEffect(() => {
        if (isDemoMode) {
            initializeDemoSlots();

            // Simulate random status changes every 5-10 seconds
            const interval = setInterval(() => {
                setDemoSlots((prevSlots) => {
                    const randomIndex = Math.floor(Math.random() * prevSlots.length);
                    const newSlots = [...prevSlots];
                    newSlots[randomIndex] = {
                        ...newSlots[randomIndex],
                        status: newSlots[randomIndex].status === 'available' ? 'occupied' : 'available',
                        lastUpdated: new Date(),
                    };
                    return newSlots;
                });
            }, Math.random() * 5000 + 5000); // Random interval between 5-10 seconds

            return () => clearInterval(interval);
        }
    }, [isDemoMode, initializeDemoSlots]);

    const toggleDemoMode = () => {
        setIsDemoMode((prev) => !prev);
    };

    return { isDemoMode, demoSlots, toggleDemoMode };
}
