const logger = require('../utils/logger');

const notFoundHandler = (req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { notFoundHandler, errorHandler };
