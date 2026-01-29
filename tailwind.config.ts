import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // UniSiraj brand colors
                brand: {
                    navy: '#1e3a5f',
                    gold: '#f4c430',
                },
                // Parking status colors
                available: {
                    DEFAULT: '#00ff88',
                    glow: 'rgba(0, 255, 136, 0.5)',
                },
                occupied: {
                    DEFAULT: '#ff3366',
                    glow: 'rgba(255, 51, 102, 0.5)',
                },
                accent: {
                    cyan: '#00d9ff',
                    blue: '#0066ff',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Poppins', 'Inter', 'sans-serif'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-in-right': 'slide-in-right 0.3s ease-out',
                'slide-in-left': 'slide-in-left 0.3s ease-out',
                'fade-in': 'fade-in 0.5s ease-out',
                'count-up': 'count-up 1s ease-out',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': {
                        opacity: '1',
                        boxShadow: '0 0 20px var(--glow-color)',
                    },
                    '50%': {
                        opacity: '0.8',
                        boxShadow: '0 0 40px var(--glow-color)',
                    },
                },
                'slide-in-right': {
                    '0%': {
                        transform: 'translateX(100%)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                        opacity: '1',
                    },
                },
                'slide-in-left': {
                    '0%': {
                        transform: 'translateX(-100%)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                        opacity: '1',
                    },
                },
                'fade-in': {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                'count-up': {
                    '0%': {
                        transform: 'scale(0.5)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}

export default config
