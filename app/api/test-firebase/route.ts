import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/config';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
    try {
        const config = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '❌ Missing',
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing',
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing',
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing',
        };

        return NextResponse.json({
            status: 'Firebase Configuration Check',
            config,
            authInitialized: auth ? '✅ Auth initialized' : '❌ Auth not initialized',
            dbInitialized: db ? '✅ Firestore initialized' : '❌ Firestore not initialized',
            message: 'If all values show ✅, Firebase is configured correctly!',
            nextSteps: [
                '1. Enable Email/Password authentication in Firebase Console',
                '2. Create admin user: GADO21774@GMAIL.COM',
                '3. Try logging in at /admin/login'
            ]
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'Error',
            error: error.message,
            message: 'There was an error checking Firebase configuration'
        }, { status: 500 });
    }
}
