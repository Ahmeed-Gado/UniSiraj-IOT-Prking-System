'use client';

import { motion } from 'framer-motion';
import { AnalyticsCharts } from '@/components/parking/AnalyticsCharts';

export default function AdminAnalyticsPage() {
    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold font-display mb-2">
                    <span className="bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">Analytics</span>
                </h1>
                <p className="text-gray-400">Parking usage insights and trends</p>
            </motion.div>

            {/* Charts */}
            <AnalyticsCharts />
        </div>
    );
}
