import User from '../models/User.js';
import StudySession from '../models/StudySession.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getStats = asyncHandler(async (_, res) => {
  const [users, admins, sessions] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ role: 'admin' }),
    StudySession.countDocuments({})
  ]);

  res.json({ totalUsers: users, adminUsers: admins, totalStudySessions: sessions });
});

export const listUsers = asyncHandler(async (_, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
});

export const deleteInactiveUsers = asyncHandler(async (req, res) => {
  const days = Number(req.query.days || 120);
  const cutoff = new Date(Date.now() - days * 86400000);
  const result = await User.deleteMany({ lastActiveAt: { $lte: cutoff }, role: { $ne: 'admin' } });
  res.json({ deletedCount: result.deletedCount });
});
