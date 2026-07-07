import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema } from '../../utils/validators';
import Input from '../ui/Input';
import Button from '../ui/Button';


import { cn } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function TodoForm({ onSubmit, initialData, loading, onCancel }) {


  const defaultValues = initialData
    ? {
        title: initialData.title,
        description: initialData.description || '',
        category: initialData.category,
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
      }
    : {
        title: '',
        description: '',
        category: 'work',
        priority: 'medium',
        dueDate: '',
      };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues,
  });

  const watchTitle = watch('title');
  const watchDescription = watch('description');



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title block with AI Improve Title action */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Task Title
          </label>

        </div>
        <input
          {...register('title')}
          placeholder="What needs to be done?"
          className={cn(
            'w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50 disabled:pointer-events-none',
            errors.title
              ? 'border-danger focus:ring-danger/20 focus:border-danger'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
          )}
        />
        {errors.title && (
          <span className="text-xs font-semibold text-danger">
            {errors.title.message}
          </span>
        )}
      </div>

      {/* Description block with AI Time Estimation action */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Description
          </label>

        </div>
        <textarea
          placeholder="Add details about this task..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none h-24"
          {...register('description')}
        />
        {errors.description && (
          <span className="text-xs font-semibold text-danger">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Category
          </label>
          <select
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            {...register('category')}
          >
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
          </select>
          {errors.category && (
            <span className="text-xs font-semibold text-danger">
              {errors.category.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Priority
          </label>
          <select
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            {...register('priority')}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.priority && (
            <span className="text-xs font-semibold text-danger">
              {errors.priority.message}
            </span>
          )}
        </div>
      </div>

      <Input
        label="Due Date"
        type="date"
        error={errors.dueDate?.message}
        {...register('dueDate')}
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60 mt-4">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={loading} size="sm">
            Cancel
          </Button>
        )}
        <Button type="submit" loading={loading} size="sm">
          {initialData ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}

