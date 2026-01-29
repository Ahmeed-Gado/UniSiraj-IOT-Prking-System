'use client';

import { cn } from '@/lib/utils/cn';

interface DemoModeToggleProps {
    enabled: boolean;
    onToggle: () => void;
}

export function DemoModeToggle({ enabled, onToggle }: DemoModeToggleProps) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Demo Mode</span>
            <button
                onClick={onToggle}
                className={cn(
                    'relative w-14 h-7 rounded-full transition-colors duration-300',
                    enabled ? 'bg-brand-gold' : 'bg-white/20'
                )}
            >
                <div
                    className={cn(
                        'absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300',
                        enabled && 'translate-x-7'
                    )}
                />
            </button>
            {enabled && (
                <span className="text-xs text-brand-gold font-medium">ON</span>
            )}
        </div>
    );
}
