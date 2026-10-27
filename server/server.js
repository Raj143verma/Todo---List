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

// Trust reverse proxies (Render, Vercel, Heroku, etc.) for rate limiter & IP detection
app.set('trust proxy', 1);

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
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) {
        callback(null, true);
        return;
      }

      const allowedOrigins = getAllowedOrigins();

      // Check exact matches, localhost, or any vercel.app domain
      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        /^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/.test(origin)
      ) {
        callback(null, true);
        return;
      }

      console.warn(`[CORS] Blocked request from unauthorized origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Ensure DB is connected before processing requests (critical for serverless / cold starts)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection middleware error:', err);
    res.status(500).json({
      success: false,
      message: 'Database connection failed. Please ensure MONGODB_URI is correct.',
    });
  }
});

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

if (!process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

module.exports = app;
