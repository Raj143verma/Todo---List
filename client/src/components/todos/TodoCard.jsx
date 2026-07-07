import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Calendar, GripVertical } from 'lucide-react';
import Badge from '../ui/Badge';
import { formatDate, isOverdue, cn } from '../../utils/helpers';

export default function TodoCard({
  todo,
  onToggle,
  onEdit,
  onDelete,
  dragProvided,
  isDragging,
}) {
  const overdue = isOverdue(todo.dueDate, todo.completed);

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      layoutId={todo._id}
      className={cn(
        'group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-cardDark',
        todo.completed ? 'opacity-70' : '',
        isDragging ? 'shadow-lg border-indigo-200 ring-2 ring-indigo-500/10' : '',
        'mb-4 hover:-translate-y-0.5'
      )}
      ref={dragProvided?.innerRef}
      {...dragProvided?.draggableProps}
    >
      <div className="flex items-start gap-3">
        {/* Grip Handle for Drag and Drop */}
        {dragProvided && (
          <div
            {...dragProvided.dragHandleProps}
            className="mt-0.5 flex items-center justify-center p-1 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 cursor-grab active:cursor-grabbing"
            aria-label="Drag handle"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        )}

        {/* Complete Checkbox */}
        <button
          onClick={() => onToggle(todo._id)}
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-150',
            todo.completed
              ? 'bg-success border-success text-white'
              : 'border-slate-300 hover:border-primary dark:border-slate-600 text-transparent'
          )}
        >
          {todo.completed && (
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        {/* Main Details Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h4
              className={cn(
                'text-sm font-bold text-slate-800 dark:text-slate-100 truncate',
                todo.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
              )}
            >
              {todo.title}
            </h4>
            
            {/* Contextual Action Overlay Buttons */}
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity duration-150 shrink-0">
              <button
                onClick={() => onEdit(todo)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
                aria-label="Edit Task"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-colors"
                aria-label="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Optional Short Description */}
          {todo.description && (
            <p
              className={cn(
                'text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2',
                todo.completed ? 'text-slate-400 dark:text-slate-500/80' : ''
              )}
            >
              {todo.description}
            </p>
          )}

          {/* Badges and Dates Footer line */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3.5 border-t border-slate-100/60 dark:border-slate-800/40">
            <Badge variant={todo.priority}>{todo.priority}</Badge>
            <Badge variant={todo.category}>{todo.category}</Badge>

            {todo.dueDate && (
              <span
                className={cn(
                  'flex items-center gap-1 text-[11px] font-semibold ml-auto',
                  overdue
                    ? 'text-danger dark:text-rose-400 font-bold'
                    : 'text-slate-450 dark:text-slate-500'
                )}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(todo.dueDate)}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
