'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useRealtimeActivityLogs } from '@/lib/hooks/useRealtime';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDateTime } from '@/lib/utils/formatters';

export default function AdminLogsPage() {
    const { logs, loading } = useRealtimeActivityLogs(100);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSource, setFilterSource] = useState<'all' | 'sensor' | 'admin'>('all');

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.slotId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterSource === 'all' || log.source === filterSource;
        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold font-display mb-2">
                    Activity <span className="bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">Logs</span>
                </h1>
                <p className="text-gray-400">View all parking slot status changes</p>
            </motion.div>

            {/* Filters */}
            <Card className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by slot ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        />
                    </div>

                    {/* Filter */}
                    <div className="flex gap-2">
                        <FilterButton
                            active={filterSource === 'all'}
                            onClick={() => setFilterSource('all')}
                        >
                            All
                        </FilterButton>
                        <FilterButton
                            active={filterSource === 'sensor'}
                            onClick={() => setFilterSource('sensor')}
                        >
                            Sensor
                        </FilterButton>
                        <FilterButton
                            active={filterSource === 'admin'}
                            onClick={() => setFilterSource('admin')}
                        >
                            Admin
                        </FilterButton>
                    </div>
                </div>
            </Card>

            {/* Logs Table */}
            <Card hover={false}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Timestamp</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Slot ID</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Old Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">New Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Source</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8">
                                        <div className="skeleton h-8 w-full rounded" />
                                    </td>
                                </tr>
                            ) : filteredLogs.length > 0 ? (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-3 px-4 text-sm text-gray-400">
                                            {formatDateTime(log.timestamp)}
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium">{log.slotId}</td>
                                        <td className="py-3 px-4 text-sm">
                                            <Badge variant={log.oldStatus === 'available' ? 'success' : 'error'}>
                                                {log.oldStatus}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <Badge variant={log.newStatus === 'available' ? 'success' : 'error'}>
                                                {log.newStatus}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <Badge variant={log.source === 'admin' ? 'warning' : 'info'}>
                                                {log.source}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-400">
                                            {log.adminEmail || '-'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-400">
                                        No logs found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

function FilterButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active
                    ? 'bg-accent-cyan text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
        >
            {children}
        </button>
    );
}
