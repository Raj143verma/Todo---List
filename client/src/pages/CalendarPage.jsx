import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import CalendarView from '../components/calendar/CalendarView';
import Modal from '../components/ui/Modal';
import TodoForm from '../components/todos/TodoForm';
import useTodos from '../hooks/useTodos';
import { ShieldAlert } from 'lucide-react';

export default function CalendarPage() {
  const { fetchTodos, updateTodo, offline } = useTodos();
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEventClick = (todo) => {
    setSelectedTodo(todo);
    setFormModalOpen(true);
  };

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      await updateTodo(selectedTodo._id, data);
      setFormModalOpen(false);
      fetchTodos();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout title="Calendar Schedule">
      <div className="space-y-6">
        {/* Offline Warning Banner */}
        {offline && (
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-450 p-4 rounded-2xl">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold">
              Offline mode — showing cached calendar tasks from local memory.
            </span>
          </div>
        )}

        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Task Calendar
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Visualize your schedule. Click on any event to edit details.
          </p>
        </div>

        {/* Big Calendar grid */}
        <CalendarView onEventClick={handleEventClick} />

        {/* Edit Task Modal */}
        <Modal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          title="Edit Task Details"
          size="md"
        >
          <TodoForm
            onSubmit={handleFormSubmit}
            initialData={selectedTodo}
            loading={submitting}
            onCancel={() => setFormModalOpen(false)}
          />
        </Modal>
      </div>
    </AppLayout>
  );
}
