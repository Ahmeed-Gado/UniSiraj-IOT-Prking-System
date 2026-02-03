import { useState, useEffect } from 'react';
import { ParkingSlot, ActivityLog, Device } from '../firebase/slots';
import {
    subscribeToActivityLogs,
    subscribeToDevices,
} from '../firebase/slots';
import { subscribeToSlots as subscribeToSlotsRTDB } from '../firebase/rtdb';

export function useRealtimeSlots() {
    const [slots, setSlots] = useState<ParkingSlot[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use RTDB for real-time slot updates
        const unsubscribe = subscribeToSlotsRTDB((updatedSlots) => {
            setSlots(updatedSlots);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { slots, loading };
}

export function useRealtimeActivityLogs(limit: number = 20) {
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToActivityLogs((updatedLogs) => {
            setLogs(updatedLogs);
            setLoading(false);
        }, limit);

        return () => unsubscribe();
    }, [limit]);

    return { logs, loading };
}

export function useRealtimeDevices() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToDevices((updatedDevices) => {
            setDevices(updatedDevices);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { devices, loading };
}
