require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const { errorHandler } = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();

// Security Headers
app.use(helmet());

// Request Parsing
app.use(express.json());

const getAllowedOrigins = () => {
  const configuredOrigins = [process.env.CLIENT_URL, process.env.FRONTEND_URL]
    .filter(Boolean)
    .map((origin) => origin.trim().replace(/\/$/, ''));

  return Array.from(new Set([...configuredOrigins, 'http://localhost:5173', 'http://127.0.0.1:5173']));
};

// Enable CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || getAllowedOrigins().includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('short'));
}

// Rate limiting (max 200 requests per 15 mins)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: 'Too many requests from this IP address, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


// Health check endpoint
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Todo List SaaS Backend API is active.' });
});

// Global Error Handler (must be registered last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  server.close(() => process.exit(1));
});
