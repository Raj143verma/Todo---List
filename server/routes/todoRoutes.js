const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleTodo,
  reorderTodos,
  getTodoStats,
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');
const { validateTodo } = require('../middleware/validate');

// All routes here are protected with JWT
router.use(protect);

router.get('/stats', getTodoStats);
router.patch('/reorder', reorderTodos);

router.route('/')
  .get(getTodos)
  .post(validateTodo, createTodo);

router.route('/:id')
  .get(getTodoById)
  .put(validateTodo, updateTodo)
  .delete(deleteTodo);

router.patch('/:id/toggle', toggleTodo);

module.exports = router;
