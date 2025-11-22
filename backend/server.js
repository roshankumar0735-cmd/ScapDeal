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

// Connect DB FIRST
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
// after app.use(express.json())
const authMiddleware = require('./src/middleware/authMiddleware');
app.use(authMiddleware); // optional global parsing of token

app.use(morgan('dev'));

// Load All Routes
app.use("/api", require('./src/routes'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'scrap-deal-backend' });
});

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
