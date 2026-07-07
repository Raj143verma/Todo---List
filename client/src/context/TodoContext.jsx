import React, { createContext, useReducer, useEffect } from 'react';
import todoService from '../services/todoService';
import { STORAGE_KEYS } from '../utils/constants';
import toast from 'react-hot-toast';

export const TodoContext = createContext();

const initialState = {
  todos: [],
  loading: false,
  error: null,
  offline: false,
  filters: {
    search: '',
    category: 'all',
    priority: 'all',
    completed: 'all',
    sortBy: 'order',
    order: 'asc',
  },
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
    categories: [],
    productivity: [],
    heatmap: [],
    recentTodos: [],
  },
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: action.payload,
        offline: false,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SET_OFFLINE':
      return {
        ...state,
        offline: true,
        todos: action.payload,
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload].sort((a, b) => a.order - b.order),
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) => (t._id === action.payload._id ? action.payload : t)),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((t) => t._id !== action.payload),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case 'SET_STATS':
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
}

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Sync state changes to local storage for recovery options
  useEffect(() => {
    if (state.todos.length > 0 && !state.offline) {
      localStorage.setItem(STORAGE_KEYS.TODOS_BACKUP, JSON.stringify(state.todos));
    }
  }, [state.todos, state.offline]);

  const fetchTodos = async (customFilters = {}) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const activeFilters = { ...state.filters, ...customFilters };
      const response = await todoService.getTodos(activeFilters);
      if (response.success) {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      }
    } catch (error) {
      console.warn('Backend unavailable. Restoring local state backup...', error);
      const cached = localStorage.getItem(STORAGE_KEYS.TODOS_BACKUP);
      if (cached) {
        const cachedTodos = JSON.parse(cached);
        const activeFilters = { ...state.filters, ...customFilters };
        let filtered = [...cachedTodos];

        // Apply filters in memory
        if (activeFilters.search) {
          const s = activeFilters.search.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.title.toLowerCase().includes(s) ||
              (t.description && t.description.toLowerCase().includes(s))
          );
        }
        if (activeFilters.category && activeFilters.category !== 'all') {
          filtered = filtered.filter((t) => t.category === activeFilters.category);
        }
        if (activeFilters.priority && activeFilters.priority !== 'all') {
          filtered = filtered.filter((t) => t.priority === activeFilters.priority);
        }
        if (activeFilters.completed && activeFilters.completed !== 'all') {
          const complVal = activeFilters.completed === 'true';
          filtered = filtered.filter((t) => t.completed === complVal);
        }

        // Apply manual sorting matching backend criteria
        const sf = activeFilters.sortBy;
        const isDesc = activeFilters.order === 'desc';
        
        if (sf === 'priority') {
          const weights = { high: 3, medium: 2, low: 1 };
          filtered.sort((a, b) => {
            const wA = weights[a.priority] || 0;
            const wB = weights[b.priority] || 0;
            return isDesc ? wB - wA : wA - wB;
          });
        } else if (sf === 'dueDate') {
          filtered.sort((a, b) => {
            const dA = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
            const dB = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);
            return isDesc ? dB - dA : dA - dB;
          });
        } else if (sf === 'createdAt') {
          filtered.sort((a, b) => {
            const dA = new Date(a.createdAt || 0);
            const dB = new Date(b.createdAt || 0);
            return isDesc ? dB - dA : dA - dB;
          });
        } else {
          filtered.sort((a, b) => (isDesc ? b.order - a.order : a.order - b.order));
        }

        dispatch({ type: 'SET_OFFLINE', payload: filtered });
      } else {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      }
    }
  };

  const fetchStats = async () => {
    try {
      const response = await todoService.getStats();
      if (response.success) {
        dispatch({ type: 'SET_STATS', payload: response.data });
      }
    } catch (error) {
      console.warn('Backend unavailable. Computing offline dashboard statistics...', error);
      const cached = localStorage.getItem(STORAGE_KEYS.TODOS_BACKUP);
      if (cached) {
        const cachedTodos = JSON.parse(cached);
        const total = cachedTodos.length;
        const completed = cachedTodos.filter((t) => t.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        const cats = ['study', 'work', 'personal', 'health'].map((c) => ({
          name: c.charAt(0).toUpperCase() + c.slice(1),
          value: cachedTodos.filter((t) => t.category === c).length,
        }));

        dispatch({
          type: 'SET_STATS',
          payload: {
            total,
            completed,
            pending,
            completionRate,
            categories: cats,
            productivity: [],
            heatmap: [],
            recentTodos: cachedTodos.slice(0, 5),
          },
        });
      }
    }
  };

  const createTodo = async (todoData) => {
    try {
      const response = await todoService.createTodo(todoData);
      if (response.success) {
        dispatch({ type: 'ADD_TODO', payload: response.data });
        toast.success('Task created successfully!');
        fetchStats();
        return response.data;
      }
    } catch (error) {
      const newTodo = {
        _id: `temp-${Date.now()}`,
        ...todoData,
        completed: false,
        order: state.todos.length,
        createdAt: new Date().toISOString(),
      };
      
      const cached = localStorage.getItem(STORAGE_KEYS.TODOS_BACKUP);
      const list = cached ? JSON.parse(cached) : [];
      list.push(newTodo);
      localStorage.setItem(STORAGE_KEYS.TODOS_BACKUP, JSON.stringify(list));

      dispatch({ type: 'ADD_TODO', payload: newTodo });
      toast.success('Saved locally (Offline mode)');
      return newTodo;
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const response = await todoService.updateTodo(id, todoData);
      if (response.success) {
        dispatch({ type: 'UPDATE_TODO', payload: response.data });
        toast.success('Task updated!');
        fetchStats();
        return response.data;
      }
    } catch (error) {
      const cached = localStorage.getItem(STORAGE_KEYS.TODOS_BACKUP);
      if (cached) {
        let list = JSON.parse(cached);
        list = list.map((t) => (t._id === id ? { ...t, ...todoData } : t));
        localStorage.setItem(STORAGE_KEYS.TODOS_BACKUP, JSON.stringify(list));
        
        const updated = list.find((t) => t._id === id);
        dispatch({ type: 'UPDATE_TODO', payload: updated });
        toast.success('Updated locally (Offline mode)');
        return updated;
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await todoService.deleteTodo(id);
      if (response.success) {
        dispatch({ type: 'DELETE_TODO', payload: id });
        toast.success('Task deleted');
        fetchStats();
      }
    } catch (error) {
      const cached = localStorage.getItem(STORAGE_KEYS.TODOS_BACKUP);
      if (cached) {
        let list = JSON.parse(cached);
        list = list.filter((t) => t._id !== id);
        localStorage.setItem(STORAGE_KEYS.TODOS_BACKUP, JSON.stringify(list));
        dispatch({ type: 'DELETE_TODO', payload: id });
        toast.success('Deleted from local backup (Offline mode)');
      }
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await todoService.toggleTodo(id);
      if (response.success) {
        dispatch({ type: 'UPDATE_TODO', payload: response.data });
        fetchStats();
      }
    } catch (error) {
      const cached = localStorage.getItem(STORAGE_KEYS.TODOS_BACKUP);
      if (cached) {
        let list = JSON.parse(cached);
        list = list.map((t) =>
          t._id === id
            ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : null }
            : t
        );
        localStorage.setItem(STORAGE_KEYS.TODOS_BACKUP, JSON.stringify(list));
        const updated = list.find((t) => t._id === id);
        dispatch({ type: 'UPDATE_TODO', payload: updated });
        toast.success('Task marked locally (Offline mode)');
      }
    }
  };

  const reorderTodos = async (reorderedList) => {
    dispatch({ type: 'FETCH_SUCCESS', payload: reorderedList });
    try {
      const payload = reorderedList.map((item, index) => ({ _id: item._id, order: index }));
      await todoService.reorderTodos(payload);
    } catch (error) {
      console.warn('API error sorting, saving order mapping locally:', error);
      const cached = localStorage.getItem(STORAGE_KEYS.TODOS_BACKUP);
      if (cached) {
        const cachedTodos = JSON.parse(cached);
        const mapped = cachedTodos.map((t) => {
          const idx = reorderedList.findIndex((item) => item._id === t._id);
          if (idx !== -1) {
            return { ...t, order: idx };
          }
          return t;
        });
        localStorage.setItem(STORAGE_KEYS.TODOS_BACKUP, JSON.stringify(mapped));
      }
    }
  };

  const setFilters = (newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        offline: state.offline,
        filters: state.filters,
        stats: state.stats,
        fetchTodos,
        fetchStats,
        createTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        reorderTodos,
        setFilters,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
