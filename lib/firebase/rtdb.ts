import { rtdb } from './config';
import { ref, onValue, set, get, update } from 'firebase/database';

export interface ParkingSlot {
    id: string;
    slotId: string;
    status: 'available' | 'occupied';
    lastUpdated: number;
    sensorId?: string;
}

// Subscribe to real-time slot updates
export function subscribeToSlots(callback: (slots: ParkingSlot[]) => void) {
    const slotsRef = ref(rtdb, 'slots');

    console.log('[RTDB] Subscribing to slots...');

    return onValue(slotsRef, (snapshot) => {
        const data = snapshot.val();
        const slots: ParkingSlot[] = [];

        console.log('[RTDB] Received data:', data);

        if (data) {
            Object.keys(data).forEach((slotId) => {
                slots.push({
                    id: slotId,
                    slotId: slotId,
                    status: data[slotId].status || 'available',
                    lastUpdated: data[slotId].lastUpdated || Date.now(),
                    sensorId: data[slotId].sensorId,
                });
            });
        }

        console.log('[RTDB] Parsed slots:', slots);
        callback(slots);
    }, (error) => {
        console.error('[RTDB] Error subscribing to slots:', error);
        if (error && typeof error === 'object' && 'code' in error) {
            console.error('[RTDB] Error code:', (error as any).code);
            console.error('[RTDB] Error message:', (error as any).message);
        }
        // Return empty array on error
        callback([]);
    });
}

// Get all slots (one-time read)
export async function getAllSlots(): Promise<ParkingSlot[]> {
    const slotsRef = ref(rtdb, 'slots');
    const snapshot = await get(slotsRef);
    const data = snapshot.val();
    const slots: ParkingSlot[] = [];

    if (data) {
        Object.keys(data).forEach((slotId) => {
            slots.push({
                id: slotId,
                slotId: slotId,
                status: data[slotId].status || 'available',
                lastUpdated: data[slotId].lastUpdated || Date.now(),
                sensorId: data[slotId].sensorId,
            });
        });
    }

    return slots;
}

// Update slot status
export async function updateSlotStatus(
    slotId: string,
    status: 'available' | 'occupied',
    sensorId?: string
) {
    const slotRef = ref(rtdb, `slots/${slotId}`);

    await set(slotRef, {
        status,
        lastUpdated: Date.now(),
        ...(sensorId && { sensorId }),
    });
}

// Initialize slots if they don't exist
export async function initializeSlots() {
    const slots = ['A1', 'A2', 'A3', 'A4', 'A5'];

    for (const slotId of slots) {
        const slotRef = ref(rtdb, `slots/${slotId}`);
        const snapshot = await get(slotRef);

        if (!snapshot.exists()) {
            await set(slotRef, {
                status: 'available',
                lastUpdated: Date.now(),
                sensorId: null,
            });
        }
    }
}
