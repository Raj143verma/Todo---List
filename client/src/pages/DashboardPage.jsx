import React, { useEffect, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import StatsCard from '../components/dashboard/StatsCard';
import ProgressRing from '../components/dashboard/ProgressRing';
import ProductivityChart from '../components/dashboard/ProductivityChart';
import StreakBadge from '../components/dashboard/StreakBadge';
import { ListTodo, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import useTodos from '../hooks/useTodos';
import useAuth from '../hooks/useAuth';
import Badge from '../components/ui/Badge';
import { formatDate } from '../utils/helpers';


export default function DashboardPage() {
  const { stats, fetchStats, fetchTodos, offline } = useTodos();
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
    fetchTodos();
  }, []);

  return (
    <AppLayout title="Dashboard Summary">
      <div className="space-y-6">
        {/* Offline Warning Banner */}
        {offline && (
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-450 p-4 rounded-2xl">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold">
              Offline mode — showing cached tasks and metrics from local storage.
            </span>
          </div>
        )}



        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Tasks"
            value={stats.total}
            icon={ListTodo}
            colorClass="bg-indigo-50 text-primary dark:bg-indigo-950/20 dark:text-indigo-400"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            colorClass="bg-emerald-50 text-success dark:bg-emerald-950/20 dark:text-emerald-400"
          />
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            colorClass="bg-amber-50 text-warning dark:bg-amber-950/20 dark:text-warning-400"
          />
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-cardDark">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Completion Rate
              </p>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                {stats.completionRate}%
              </h3>
            </div>
            <ProgressRing progress={stats.completionRate} radius={38} stroke={6} />
          </div>
        </div>

        {/* Productivity Graphs and Streak Calendar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          <div className="xl:col-span-2">
            <ProductivityChart barData={stats.productivity} pieData={stats.categories} />
          </div>
          <div>
            <StreakBadge streak={user?.streak || 0} heatmapData={stats.heatmap} />
          </div>
        </div>

        {/* Recent Task List */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-cardDark">
          <h3 className="text-xs font-bold text-slate-450 dark:text-slate-500 mb-4 uppercase tracking-wider">
            Recently Added Tasks
          </h3>
          
          {!stats.recentTodos || stats.recentTodos.length === 0 ? (
            <div className="text-center py-6 text-slate-400 dark:text-slate-500">
              <span className="text-xs font-semibold">No recent tasks created yet</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-850 text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
                    <th className="py-3">Task Title</th>
                    <th className="py-3">Category</th>
                    <th className="py-3">Priority</th>
                    <th className="py-3">Created</th>
                    <th className="py-3">Due Date</th>
                    <th className="py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60 dark:divide-slate-800/40">
                  {stats.recentTodos.map((todo) => (
                    <tr key={todo._id} className="text-xs font-semibold text-slate-700 dark:text-slate-350">
                      <td className="py-3.5 pr-4 truncate max-w-[200px]">
                        {todo.title}
                      </td>
                      <td className="py-3.5">
                        <Badge variant={todo.category}>{todo.category}</Badge>
                      </td>
                      <td className="py-3.5">
                        <Badge variant={todo.priority}>{todo.priority}</Badge>
                      </td>
                      <td className="py-3.5 text-slate-500 dark:text-slate-400 font-medium">
                        {todo.createdAt ? formatDate(todo.createdAt) : 'Recently'}
                      </td>
                      <td className="py-3.5 text-slate-400 dark:text-slate-500">
                        {todo.dueDate ? formatDate(todo.dueDate) : 'No due date'}
                      </td>
                      <td className="py-3.5 text-right">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            todo.completed
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                              : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                          }`}
                        >
                          {todo.completed ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
