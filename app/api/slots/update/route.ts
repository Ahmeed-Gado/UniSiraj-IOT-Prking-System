import { NextRequest, NextResponse } from 'next/server';
import { updateSlotStatus, updateDeviceStatus } from '@/lib/firebase/slots';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slotId, status, sensorId } = body;

        // Validate input
        if (!slotId || !status) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required fields: slotId and status',
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

        // Update slot status
        await updateSlotStatus(slotId, status, sensorId);

        // Update device status to online if sensorId is provided
        if (sensorId) {
            await updateDeviceStatus(sensorId, 'online');
        }

        return NextResponse.json({
            success: true,
            message: `Slot ${slotId} updated to ${status}`,
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
