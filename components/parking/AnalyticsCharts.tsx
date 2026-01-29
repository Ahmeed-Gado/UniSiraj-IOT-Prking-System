'use client';

import { Card } from '../ui/Card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - in production, this would come from Firebase
const occupancyData = [
    { time: '08:00', occupancy: 20 },
    { time: '09:00', occupancy: 40 },
    { time: '10:00', occupancy: 60 },
    { time: '11:00', occupancy: 80 },
    { time: '12:00', occupancy: 100 },
    { time: '13:00', occupancy: 80 },
    { time: '14:00', occupancy: 60 },
    { time: '15:00', occupancy: 40 },
];

const usageData = [
    { slot: 'A1', usage: 85 },
    { slot: 'A2', usage: 65 },
    { slot: 'A3', usage: 90 },
    { slot: 'A4', usage: 75 },
    { slot: 'A5', usage: 80 },
];

export function AnalyticsCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Occupancy Over Time */}
            <Card hover={false}>
                <h3 className="text-lg font-bold mb-4">Occupancy Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={occupancyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="time" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="occupancy"
                            stroke="#00d9ff"
                            strokeWidth={2}
                            dot={{ fill: '#00d9ff', r: 4 }}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            {/* Slot Usage Frequency */}
            <Card hover={false}>
                <h3 className="text-lg font-bold mb-4">Slot Usage Frequency</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={usageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="slot" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                            }}
                        />
                        <Bar
                            dataKey="usage"
                            fill="#f4c430"
                            radius={[8, 8, 0, 0]}
                            animationDuration={1500}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
}
