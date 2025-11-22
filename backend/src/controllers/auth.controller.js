const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { success } = require('../utils/response');
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,   // IMPORTANT
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};


exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { name, phone, email, password } = req.body;

    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ success: false, message: 'Phone already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, phone, email, password: hashedPassword });

    const token = generateToken(user);

    return success(res, {
      message: 'Registration successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
      },
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    return success(res, {
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    return success(res, {
      message: 'Profile fetched',
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    );

    return success(res, {
      message: "Profile updated successfully",
      data: {
        user: {
          id: updated._id,
          name: updated.name,
          phone: updated.phone,
          email: updated.email,
          role: updated.role,
        }
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

