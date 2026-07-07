import api from './api';

const todoService = {
  getTodos: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);
    if (filters.completed && filters.completed !== 'all') params.append('completed', filters.completed);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.order) params.append('order', filters.order);

    const response = await api.get(`/todos?${params.toString()}`);
    return response.data;
  },
  createTodo: async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },
  getTodoById: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },
  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },
  toggleTodo: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },
  reorderTodos: async (todos) => {
    const response = await api.patch('/todos/reorder', { todos });
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/todos/stats');
    return response.data;
  },
};

export default todoService;
