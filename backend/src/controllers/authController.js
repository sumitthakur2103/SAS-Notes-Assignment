const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { error, success } = require('../utils/response');

const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return error(res, 'User already exists', 400);
    const user = await User.create({ name, email, password });
    return success(res, { user: { id: user._id, name: user.name, email: user.email }, token: generateToken(user) }, 201);
  } catch (err) {
    console.error(err);
    return error(res);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return error(res, 'Invalid credentials', 401);
    const matched = await user.matchPassword(password);
    if (!matched) return error(res, 'Invalid credentials', 401);
    return success(res, { user: { id: user._id, name: user.name, email: user.email }, token: generateToken(user) });
  } catch (err) {
    console.error(err);
    return error(res);
  }
};

exports.me = async (req, res) => {
  if (!req.user) return error(res, 'Not authorized', 401);
  return success(res, { user: req.user });
};
