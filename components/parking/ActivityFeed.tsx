'use client';

import { motion } from 'framer-motion';
import { Activity as ActivityIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { useRealtimeActivityLogs } from '@/lib/hooks/useRealtime';
import { formatTime } from '@/lib/utils/formatters';
import { fadeIn } from '@/lib/utils/animations';

export function ActivityFeed() {
    const { logs, loading } = useRealtimeActivityLogs(10);

    return (
        <Card hover={false}>
            <div className="flex items-center gap-2 mb-4">
                <ActivityIcon className="w-5 h-5 text-accent-cyan" />
                <h3 className="text-lg font-bold">Live Activity Feed</h3>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {loading ? (
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="skeleton h-16 rounded-lg" />
                        ))}
                    </div>
                ) : logs.length > 0 ? (
                    logs.map((log, index) => (
                        <motion.div
                            key={log.id}
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div
                                className={`w-2 h-2 rounded-full mt-2 ${log.newStatus === 'available' ? 'bg-available' : 'bg-occupied'
                                    }`}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm">
                                    <span className="font-semibold">{log.slotId}</span> became{' '}
                                    <span
                                        className={
                                            log.newStatus === 'available' ? 'text-available' : 'text-occupied'
                                        }
                                    >
                                        {log.newStatus.toUpperCase()}
                                    </span>
                                    {log.source === 'admin' && (
                                        <span className="text-brand-gold"> (manual override)</span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {formatTime(log.timestamp)}
                                    {log.adminEmail && ` • ${log.adminEmail}`}
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        No recent activity
                    </div>
                )}
            </div>
        </Card>
    );
}
