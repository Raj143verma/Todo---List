import React, { useEffect, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import TodoFilter from '../components/todos/TodoFilter';
import TodoList from '../components/todos/TodoList';
import TodoForm from '../components/todos/TodoForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { Plus, ShieldAlert } from 'lucide-react';
import useTodos from '../hooks/useTodos';


export default function TodosPage() {
  const {
    todos,
    loading,
    offline,
    filters,
    fetchTodos,
    fetchStats,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);


  // Sync with filters context
  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const handleAddClick = () => {
    setEditingTodo(null);
    setFormModalOpen(true);
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setFormModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setTodoToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingTodo) {
        await updateTodo(editingTodo._id, data);
      } else {
        await createTodo(data);
      }
      setFormModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setSubmitting(true);
    try {
      await deleteTodo(todoToDelete);
      setDeleteDialogOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout title="My Task Board">
      <div className="space-y-6">
        {/* Offline Warning Banner */}
        {offline && (
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-450 p-4 rounded-2xl">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold">
              Offline mode — displaying cached tasks from local storage backup.
            </span>
          </div>
        )}

        {/* Action Header Row */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              Tasks List
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Drag tasks to reorder them or drag across column status pools to complete/revert.
            </p>
          </div>

          <div className="flex items-center gap-2">

            <Button onClick={handleAddClick} icon={Plus} size="sm">
              Add Task
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        <TodoFilter />

        {/* Todo List Board */}
        <TodoList onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} onAddClick={handleAddClick} />

        {/* Add/Edit Modal */}
        <Modal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          title={editingTodo ? 'Edit Task Details' : 'Create New Task'}
          size="md"
        >
          <TodoForm
            onSubmit={handleFormSubmit}
            initialData={editingTodo}
            loading={submitting}
            onCancel={() => setFormModalOpen(false)}
          />
        </Modal>

        {/* Confirm Delete Dialog */}
        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete task?"
          description="This task will be removed permanently from your list."
          confirmText="Delete"
          loading={submitting}
        />


      </div>
    </AppLayout>
  );
}
