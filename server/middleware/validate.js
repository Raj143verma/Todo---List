const { check, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({ field: err.path, message: err.msg })),
    });
  }
  next();
};

const validateRegister = [
  check('name', 'Name is required').notEmpty().trim(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  handleValidationErrors,
];

const validateLogin = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists(),
  handleValidationErrors,
];

const validateTodo = [
  check('title', 'Title is required and must be under 100 characters')
    .notEmpty()
    .isLength({ max: 100 })
    .trim(),
  check('description', 'Description must be under 500 characters')
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .trim(),
  check('category', 'Category must be one of: work, study, personal, health')
    .isIn(['work', 'study', 'personal', 'health']),
  check('priority', 'Priority must be one of: high, medium, low')
    .optional()
    .isIn(['high', 'medium', 'low']),
  check('dueDate', 'Due date must be a valid ISO8601 date').optional({ nullable: true, checkFalsy: true }).isISO8601(),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateTodo,
};
