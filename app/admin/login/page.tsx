'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogIn } from 'lucide-react';
import { signIn } from '@/lib/firebase/auth';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { scaleIn } from '@/lib/utils/animations';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { user, error: authError } = await signIn(email, password);

        if (authError) {
            setError(authError);
            setLoading(false);
        } else if (user) {
            router.push('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <Card className="glass-dark">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                            <Image
                                src="/unisiraj-logo.jpg"
                                alt="UniSiraj Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
                        <p className="text-gray-400">Access the parking management dashboard</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-occupied/10 border border-occupied text-occupied text-sm">
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                placeholder="admin@unisiraj.edu"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type="submit" variant="primary" className="w-full" loading={loading}>
                            <LogIn className="w-5 h-5 mr-2" />
                            Sign In
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-gray-400">
                        <p>Authorized personnel only</p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
