// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next(); // allow routes to decide if auth is required
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach minimal user object
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      req.user = null;
    } else {
      req.user = user;
    }
    return next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    req.user = null;
    return next();
  }
};
