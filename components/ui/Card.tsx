'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { hoverLift } from '@/lib/utils/animations';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glass?: boolean;
}

export function Card({ children, className, hover = true, glass = true }: CardProps) {
    return (
        <motion.div
            variants={hover ? hoverLift : undefined}
            initial="rest"
            whileHover="hover"
            className={cn(
                'rounded-xl p-6',
                glass && 'glass',
                className
            )}
        >
            {children}
        </motion.div>
    );
}
