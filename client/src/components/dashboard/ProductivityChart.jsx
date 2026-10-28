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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-150 bg-white/95 dark:bg-slate-800 dark:border-slate-700 p-3 shadow-lg backdrop-blur-sm space-y-1">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{label}</p>
          {payload.map((item, idx) => (
            <p key={idx} className="text-xs font-semibold flex items-center gap-1.5" style={{ color: item.color || item.fill }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color || item.fill }}></span>
              <span>{item.name}: {item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bar Chart: Last 7 Days Tasks */}
      <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-cardDark">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Activity & Productivity (Last 7 Days)
          </h3>
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block"></span>
              Created
            </span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>
              Completed
            </span>
          </div>
        </div>
        
        {barData.length === 0 ? (
          <div className="flex h-[240px] items-center justify-center text-slate-400">
            <span className="text-xs font-semibold">No tasks logged yet</span>
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
                  dataKey="created"
                  name="Created"
                  fill="#6366F1"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
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
