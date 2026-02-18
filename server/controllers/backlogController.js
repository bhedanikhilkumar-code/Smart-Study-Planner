import Backlog from '../models/Backlog.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listBacklogs = asyncHandler(async (req, res) => {
  const filter = { userId: req.user._id };
  if (req.query.subjectId) filter.subjectId = req.query.subjectId;
  const data = await Backlog.find(filter).populate('subjectId', 'name').sort({ createdAt: -1 });
  res.json(data);
});

export const createBacklog = asyncHandler(async (req, res) => {
  const backlog = await Backlog.create({ ...req.validated.body, userId: req.user._id });
  res.status(201).json(backlog);
});

export const updateBacklog = asyncHandler(async (req, res) => {
  const backlog = await Backlog.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true });
  if (!backlog) return res.status(404).json({ message: 'Backlog not found' });
  res.json(backlog);
});

export const deleteBacklog = asyncHandler(async (req, res) => {
  const backlog = await Backlog.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!backlog) return res.status(404).json({ message: 'Backlog not found' });
  res.json({ message: 'Backlog deleted' });
});
