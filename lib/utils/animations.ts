import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const slideInFromLeft: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const slideInFromRight: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const slideInFromBottom: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const scaleIn: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const hoverLift = {
    rest: { y: 0, scale: 1 },
    hover: { y: -8, scale: 1.02, transition: { duration: 0.3 } },
};

export const pulseGlow = {
    initial: { boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)' },
    animate: {
        boxShadow: [
            '0 0 20px rgba(0, 255, 136, 0.5)',
            '0 0 40px rgba(0, 255, 136, 0.8)',
            '0 0 20px rgba(0, 255, 136, 0.5)',
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};
