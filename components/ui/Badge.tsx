'use client';

import { cn } from '@/lib/utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'error' | 'warning' | 'info';
    className?: string;
    dot?: boolean;
}

export function Badge({ children, variant = 'info', className, dot = false }: BadgeProps) {
    const variants = {
        success: 'bg-available/20 text-available border-available',
        error: 'bg-occupied/20 text-occupied border-occupied',
        warning: 'bg-brand-gold/20 text-brand-gold border-brand-gold',
        info: 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border',
                variants[variant],
                className
            )}
        >
            {dot && (
                <span className={cn('w-2 h-2 rounded-full animate-pulse', {
                    'bg-available': variant === 'success',
                    'bg-occupied': variant === 'error',
                    'bg-brand-gold': variant === 'warning',
                    'bg-accent-cyan': variant === 'info',
                })} />
            )}
            {children}
        </span>
    );
}
