import { NextRequest, NextResponse } from 'next/server';
import { getAllSlots, initializeSlots } from '@/lib/firebase/slots';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
    try {
        // Initialize slots if they don't exist
        await initializeSlots();

        const slots = await getAllSlots();

        return NextResponse.json({
            success: true,
            data: slots,
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
