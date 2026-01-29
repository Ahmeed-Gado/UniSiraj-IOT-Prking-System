import { NextRequest, NextResponse } from 'next/server';
import { overrideSlotStatus } from '@/lib/firebase/slots';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slotId, status, adminEmail, note } = body;

        // Validate input
        if (!slotId || !status || !adminEmail) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required fields: slotId, status, and adminEmail',
                },
                { status: 400 }
            );
        }

        if (status !== 'available' && status !== 'occupied') {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid status. Must be "available" or "occupied"',
                },
                { status: 400 }
            );
        }

        // Override slot status
        await overrideSlotStatus(slotId, status, adminEmail, note);

        return NextResponse.json({
            success: true,
            message: `Slot ${slotId} manually overridden to ${status}`,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
