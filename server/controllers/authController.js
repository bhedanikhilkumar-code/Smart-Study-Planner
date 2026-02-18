import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createToken } from '../utils/token.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.validated.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role: role || 'student' });
  const token = createToken({ id: user._id, role: user.role });
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return res.status(401).json({ message: 'Invalid credentials' });

  const token = createToken({ id: user._id, role: user.role });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
