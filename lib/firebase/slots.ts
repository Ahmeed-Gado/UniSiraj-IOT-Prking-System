import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    Timestamp,
    where,
} from 'firebase/firestore';
import { db } from './config';

export interface ParkingSlot {
    id: string;
    slotId: string;
    status: 'available' | 'occupied';
    lastUpdated: Date;
    sensorId?: string;
}

export interface ActivityLog {
    id: string;
    slotId: string;
    oldStatus: 'available' | 'occupied';
    newStatus: 'available' | 'occupied';
    timestamp: Date;
    source: 'sensor' | 'admin';
    adminEmail?: string;
    note?: string;
}

export interface Device {
    id: string;
    deviceId: string;
    status: 'online' | 'offline';
    lastSeen: Date;
}

// Initialize parking slots (call this once to set up the database)
export async function initializeSlots() {
    const slots = ['A1', 'A2', 'A3', 'A4', 'A5'];

    for (const slotId of slots) {
        const slotRef = doc(db, 'slots', slotId);
        const slotDoc = await getDoc(slotRef);

        if (!slotDoc.exists()) {
            await setDoc(slotRef, {
                slotId,
                status: 'available',
                lastUpdated: Timestamp.now(),
                sensorId: null,
            });
        }
    }
}

// Get all parking slots
export async function getAllSlots(): Promise<ParkingSlot[]> {
    const slotsCol = collection(db, 'slots');
    const slotsSnapshot = await getDocs(slotsCol);

    return slotsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastUpdated: doc.data().lastUpdated?.toDate() || new Date(),
    })) as ParkingSlot[];
}

// Subscribe to real-time slot updates
export function subscribeToSlots(callback: (slots: ParkingSlot[]) => void) {
    const slotsCol = collection(db, 'slots');

    return onSnapshot(slotsCol, (snapshot) => {
        const slots = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            lastUpdated: doc.data().lastUpdated?.toDate() || new Date(),
        })) as ParkingSlot[];

        callback(slots);
    });
}

// Update slot status (from sensor)
export async function updateSlotStatus(
    slotId: string,
    status: 'available' | 'occupied',
    sensorId?: string
) {
    const slotRef = doc(db, 'slots', slotId);
    const slotDoc = await getDoc(slotRef);

    if (!slotDoc.exists()) {
        throw new Error(`Slot ${slotId} not found`);
    }

    const oldStatus = slotDoc.data().status;

    await updateDoc(slotRef, {
        status,
        lastUpdated: Timestamp.now(),
        ...(sensorId && { sensorId }),
    });

    // Log the change
    await addActivityLog(slotId, oldStatus, status, 'sensor');
}

// Admin override slot status
export async function overrideSlotStatus(
    slotId: string,
    status: 'available' | 'occupied',
    adminEmail: string,
    note?: string
) {
    const slotRef = doc(db, 'slots', slotId);
    const slotDoc = await getDoc(slotRef);

    if (!slotDoc.exists()) {
        throw new Error(`Slot ${slotId} not found`);
    }

    const oldStatus = slotDoc.data().status;

    await updateDoc(slotRef, {
        status,
        lastUpdated: Timestamp.now(),
    });

    // Log the admin override
    await addActivityLog(slotId, oldStatus, status, 'admin', adminEmail, note);
}

// Add activity log
async function addActivityLog(
    slotId: string,
    oldStatus: 'available' | 'occupied',
    newStatus: 'available' | 'occupied',
    source: 'sensor' | 'admin',
    adminEmail?: string,
    note?: string
) {
    const logsCol = collection(db, 'logs');

    await addDoc(logsCol, {
        slotId,
        oldStatus,
        newStatus,
        timestamp: Timestamp.now(),
        source,
        ...(adminEmail && { adminEmail }),
        ...(note && { note }),
    });
}

// Get activity logs
export async function getActivityLogs(limit: number = 50): Promise<ActivityLog[]> {
    const logsCol = collection(db, 'logs');
    const logsQuery = query(logsCol, orderBy('timestamp', 'desc'));
    const logsSnapshot = await getDocs(logsQuery);

    return logsSnapshot.docs.slice(0, limit).map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
    })) as ActivityLog[];
}

// Subscribe to real-time activity logs
export function subscribeToActivityLogs(
    callback: (logs: ActivityLog[]) => void,
    limit: number = 20
) {
    const logsCol = collection(db, 'logs');
    const logsQuery = query(logsCol, orderBy('timestamp', 'desc'));

    return onSnapshot(logsQuery, (snapshot) => {
        const logs = snapshot.docs.slice(0, limit).map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date(),
        })) as ActivityLog[];

        callback(logs);
    });
}

// Update device status
export async function updateDeviceStatus(
    deviceId: string,
    status: 'online' | 'offline'
) {
    const deviceRef = doc(db, 'devices', deviceId);

    await setDoc(deviceRef, {
        deviceId,
        status,
        lastSeen: Timestamp.now(),
    }, { merge: true });
}

// Get all devices
export async function getAllDevices(): Promise<Device[]> {
    const devicesCol = collection(db, 'devices');
    const devicesSnapshot = await getDocs(devicesCol);

    return devicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastSeen: doc.data().lastSeen?.toDate() || new Date(),
    })) as Device[];
}

// Subscribe to real-time device updates
export function subscribeToDevices(callback: (devices: Device[]) => void) {
    const devicesCol = collection(db, 'devices');

    return onSnapshot(devicesCol, (snapshot) => {
        const devices = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            lastSeen: doc.data().lastSeen?.toDate() || new Date(),
        })) as Device[];

        callback(devices);
    });
}
