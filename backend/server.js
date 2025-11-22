const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./src/config/db');
const { notFoundHandler, errorHandler } = require('./src/middleware/errorHandler');
const logger = require('./src/utils/logger');

// Initialize Express App
const app = express();

// CORS FIX (for mobile login)
app.use(
  cors({
    origin: [
      "https://scapdeal.netlify.app",   // frontend
      "http://localhost:5173"          // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Preflight CORS (IMPORTANT)
app.options("*", cors());

// JSON middleware
app.use(express.json());

// Connect DB FIRST
connectDB();

// AUTH middleware must be AFTER CORS & JSON
const authMiddleware = require('./src/middleware/authMiddleware');
app.use(authMiddleware);

// Logger
app.use(morgan('dev'));

// Routes
app.use("/api", require('./src/routes'));

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'scrap-deal-backend' });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
