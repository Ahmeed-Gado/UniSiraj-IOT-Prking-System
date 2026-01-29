import { NextRequest, NextResponse } from 'next/server';
import { getActivityLogs } from '@/lib/firebase/slots';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');

        const logs = await getActivityLogs(limit);

        return NextResponse.json({
            success: true,
            data: logs,
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
