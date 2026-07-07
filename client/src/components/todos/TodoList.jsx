import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Kanban, List } from 'lucide-react';
import TodoCard from './TodoCard';
import useTodos from '../../hooks/useTodos';
import EmptyState from './EmptyState';

export default function TodoList({ onEditClick, onDeleteClick, onAddClick }) {
  const { todos, toggleTodo, deleteTodo, reorderTodos } = useTodos();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (viewMode === 'list') {
      // Reordering within the list view
      const items = Array.from(todos);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      reorderTodos(items);
    } else {
      // Kanban mode drag operations between status columns
      const sourceCol = source.droppableId;
      const destCol = destination.droppableId;

      if (sourceCol !== destCol) {
        // Dragging cards from pending column to completed column triggers completion update
        toggleTodo(draggableId);
      }
    }
  };

  const pendingTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  if (todos.length === 0) {
    return <EmptyState onAddClick={onAddClick} searchActive={true} />;
  }

  return (
    <div className="space-y-4">
      {/* List/Kanban Mode Switcher buttons */}
      <div className="flex justify-between items-center bg-slate-100/60 dark:bg-slate-800/40 p-1 rounded-xl border border-slate-100 dark:border-slate-800 w-fit ml-auto">
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'list'
              ? 'bg-white dark:bg-cardDark text-slate-800 dark:text-slate-150 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          <span>List View</span>
        </button>
        <button
          onClick={() => setViewMode('kanban')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'kanban'
              ? 'bg-white dark:bg-cardDark text-slate-800 dark:text-slate-150 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Kanban className="w-3.5 h-3.5" />
          <span>Kanban Board</span>
        </button>
      </div>

      {/* Drag & Drop Context wraps */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {viewMode === 'list' ? (
          <Droppable droppableId="todo-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-1 min-h-[220px]"
              >
                {todos.map((todo, index) => (
                  <Draggable key={todo._id} draggableId={todo._id} index={index}>
                    {(dragProvided, snapshot) => (
                      <TodoCard
                        todo={todo}
                        onToggle={toggleTodo}
                        onEdit={onEditClick}
                        onDelete={onDeleteClick}
                        dragProvided={dragProvided}
                        isDragging={snapshot.isDragging}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Column 1 - Pending list */}
            <div className="flex flex-col rounded-2xl bg-slate-50 dark:bg-slate-900/30 p-4 border border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">
                    Pending Tasks
                  </h3>
                </div>
                <span className="text-xs font-bold bg-slate-200/50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
                  {pendingTodos.length}
                </span>
              </div>
              
              <Droppable droppableId="pending-column">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[400px] flex flex-col"
                  >
                    {pendingTodos.map((todo, index) => (
                      <Draggable key={todo._id} draggableId={todo._id} index={index}>
                        {(dragProvided, snapshot) => (
                          <TodoCard
                            todo={todo}
                            onToggle={toggleTodo}
                            onEdit={onEditClick}
                            onDelete={onDeleteClick}
                            dragProvided={dragProvided}
                            isDragging={snapshot.isDragging}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {pendingTodos.length === 0 && (
                      <div className="flex-1 flex flex-col items-center justify-center py-16 text-center text-slate-450 dark:text-slate-500">
                        <p className="text-xs font-semibold">No pending items</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>

            {/* Column 2 - Completed list */}
            <div className="flex flex-col rounded-2xl bg-slate-50 dark:bg-slate-900/30 p-4 border border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">
                    Completed
                  </h3>
                </div>
                <span className="text-xs font-bold bg-slate-200/50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
                  {completedTodos.length}
                </span>
              </div>

              <Droppable droppableId="completed-column">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[400px] flex flex-col"
                  >
                    {completedTodos.map((todo, index) => (
                      <Draggable key={todo._id} draggableId={todo._id} index={index}>
                        {(dragProvided, snapshot) => (
                          <TodoCard
                            todo={todo}
                            onToggle={toggleTodo}
                            onEdit={onEditClick}
                            onDelete={onDeleteClick}
                            dragProvided={dragProvided}
                            isDragging={snapshot.isDragging}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {completedTodos.length === 0 && (
                      <div className="flex-1 flex flex-col items-center justify-center py-16 text-center text-slate-450 dark:text-slate-500">
                        <p className="text-xs font-semibold">No completed items</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </DragDropContext>
    </div>
  );
}
