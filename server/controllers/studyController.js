import StudySession from '../models/StudySession.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listSessions = asyncHandler(async (req, res) => {
  const sessions = await StudySession.find({ userId: req.user._id }).populate('subjectId', 'name').sort({ date: 1 });
  res.json(sessions);
});

export const createSession = asyncHandler(async (req, res) => {
  const data = req.validated.body;
  const session = await StudySession.create({ ...data, date: new Date(data.date), userId: req.user._id });
  res.status(201).json(session);
});

export const updateSession = asyncHandler(async (req, res) => {
  const session = await StudySession.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true });
  if (!session) return res.status(404).json({ message: 'Study session not found' });
  res.json(session);
});

export const deleteSession = asyncHandler(async (req, res) => {
  const session = await StudySession.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!session) return res.status(404).json({ message: 'Study session not found' });
  res.json({ message: 'Study session deleted' });
});
