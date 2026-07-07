import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function ProductivityChart({ barData = [], pieData = [] }) {
  // Curated premium color palette for charts matching category rules
  const COLORS = {
    Study: '#3B82F6', // Blue
    Work: '#6366F1', // Indigo
    Personal: '#8B5CF6', // Violet
    Health: '#EC4899', // Pink
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-150 bg-white/95 dark:bg-slate-800 dark:border-slate-700 p-3 shadow-lg backdrop-blur-sm">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {payload[0].name === 'completed'
              ? `${payload[0].value} Tasks Completed`
              : `${payload[0].name}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bar Chart: Last 7 Days Completed Tasks */}
      <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-cardDark">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-wider">
          Productivity (Last 7 Days)
        </h3>
        
        {barData.length === 0 ? (
          <div className="flex h-[240px] items-center justify-center text-slate-400">
            <span className="text-xs font-semibold">No completed tasks logged yet</span>
          </div>
        ) : (
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.04)' }} />
                <Bar
                  dataKey="completed"
                  fill="#6366F1"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Donut Chart: Tasks Category Distribution */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-cardDark">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-wider">
          Task Distribution
        </h3>

        {pieData.every((item) => item.value === 0) ? (
          <div className="flex h-[240px] items-center justify-center text-slate-400">
            <span className="text-xs font-semibold">No tasks created yet</span>
          </div>
        ) : (
          <div className="h-[240px] w-full flex flex-col items-center justify-center">
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#6366F1'} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom chart legend labels */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[entry.name] || '#6366F1' }}
                  />
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
