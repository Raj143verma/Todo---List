const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res, next) => {
  try {
    const { search, category, priority, completed, sortBy, order } = req.query;

    const query = { user: req.user._id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (priority) {
      query.priority = priority;
    }

    if (completed !== undefined) {
      query.completed = completed === 'true';
    }

    let queryBuilder = Todo.find(query);

    // Sorting - defaults to drag-and-drop order
    const sortField = sortBy || 'order';
    const sortOrder = order === 'desc' ? -1 : 1;

    if (sortField !== 'priority') {
      queryBuilder = queryBuilder.sort({ [sortField]: sortOrder });
    }

    let todos = await queryBuilder;

    // Handle priority sorting manually in JavaScript to respect High > Medium > Low weightings
    if (sortField === 'priority') {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      todos.sort((a, b) => {
        const wA = priorityWeight[a.priority] || 0;
        const wB = priorityWeight[b.priority] || 0;
        return order === 'desc' ? wB - wA : wA - wB;
      });
    }

    res.json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res, next) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;

    // Find the current highest order value for this user's todos
    const maxOrderTodo = await Todo.findOne({ user: req.user._id })
      .sort({ order: -1 })
      .select('order');
    const order = maxOrderTodo ? maxOrderTodo.order + 1 : 0;

    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
      priority: priority || 'medium',
      category,
      dueDate,
      order,
    });

    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res, next) => {
  try {
    const { title, description, priority, category, dueDate, completed } = req.body;

    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    todo.title = title !== undefined ? title : todo.title;
    todo.description = description !== undefined ? description : todo.description;
    todo.priority = priority !== undefined ? priority : todo.priority;
    todo.category = category !== undefined ? category : todo.category;
    todo.dueDate = dueDate !== undefined ? dueDate : todo.dueDate;
    
    if (completed !== undefined) {
      todo.completed = completed;
      // The schema pre-save hook will also set completedAt, but we can set it explicitly here too
      todo.completedAt = completed ? new Date() : null;
    }

    await todo.save();

    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    res.json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle todo completed status
// @route   PATCH /api/todos/:id/toggle
// @access  Private
const toggleTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date() : null;

    await todo.save();

    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Reorder todos (Drag and Drop)
// @route   PATCH /api/todos/reorder
// @access  Private
const reorderTodos = async (req, res, next) => {
  try {
    const { todos } = req.body;

    if (!todos || !Array.isArray(todos)) {
      res.status(400);
      throw new Error('Please provide an array of todo items with their new order indices');
    }

    // Execute bulk update operations to optimize performance
    const bulkOps = todos.map((item) => ({
      updateOne: {
        filter: { _id: item._id, user: req.user._id },
        update: { order: item.order },
      },
    }));

    await Todo.bulkWrite(bulkOps);

    res.json({ success: true, message: 'Todos reordered successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/todos/stats
// @access  Private
const getTodoStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Total counts
    const totalCount = await Todo.countDocuments({ user: userId });
    const completedCount = await Todo.countDocuments({ user: userId, completed: true });
    const pendingCount = await Todo.countDocuments({ user: userId, completed: false });

    // Completion Rate
    const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Categories Breakdown
    const categoriesBreakdown = await Todo.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const formattedCategories = ['study', 'work', 'personal', 'health'].map((cat) => {
      const found = categoriesBreakdown.find((item) => item._id === cat);
      return { name: cat.charAt(0).toUpperCase() + cat.slice(1), value: found ? found.count : 0 };
    });

    // Last 7 days completed tasks tracker (for the Bar Chart)
    const productivityStats = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

      const count = await Todo.countDocuments({
        user: userId,
        completed: true,
        completedAt: { $gte: startOfDay, $lte: endOfDay },
      });

      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = startOfDay.toISOString().split('T')[0];

      productivityStats.push({
        day: dayLabel,
        date: dateStr,
        completed: count,
      });
    }

    // Last 30 days heatmap activity tracker
    const heatmapStats = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

      const count = await Todo.countDocuments({
        user: userId,
        completed: true,
        completedAt: { $gte: startOfDay, $lte: endOfDay },
      });

      const dateStr = startOfDay.toISOString().split('T')[0];

      heatmapStats.push({
        date: dateStr,
        count,
      });
    }

    // Fetch the 5 most recent todos (sorted by creation date)
    const recentTodos = await Todo.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        total: totalCount,
        completed: completedCount,
        pending: pendingCount,
        completionRate,
        categories: formattedCategories,
        productivity: productivityStats,
        heatmap: heatmapStats,
        recentTodos,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleTodo,
  reorderTodos,
  getTodoStats,
};
