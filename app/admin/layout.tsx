'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthChange } from '@/lib/firebase/auth';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if current page is login page
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            setIsAuthenticated(!!user);
            setLoading(false);

            // Only redirect to login if not authenticated and not already on login page
            if (!user && !isLoginPage) {
                router.push('/admin/login');
            }
            // Redirect to dashboard if authenticated and on login page
            else if (user && isLoginPage) {
                router.push('/admin/dashboard');
            }
        });

        return () => unsubscribe();
    }, [router, isLoginPage]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Render login page without sidebar
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Render protected pages with sidebar
    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="flex">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
