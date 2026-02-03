import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
    try {
        console.log('🚀 Initializing Firebase Database...');

        // Create 5 parking slots (A1-A5)
        const slots = ['A1', 'A2', 'A3', 'A4', 'A5'];

        for (const slotId of slots) {
            await setDoc(doc(db, 'slots', slotId), {
                id: slotId,
                status: 'available',
                lastUpdated: new Date().toISOString(),
                deviceId: `ESP32-${slotId}`,
            });
            console.log(`✅ Created slot: ${slotId}`);
        }

        return NextResponse.json({
            success: true,
            message: 'Database initialized successfully!',
            slots: slots,
        });
    } catch (error: any) {
        console.error('❌ Error initializing database:', error);
        return NextResponse.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}
