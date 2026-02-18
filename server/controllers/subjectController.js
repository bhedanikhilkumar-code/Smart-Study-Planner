import Subject from '../models/Subject.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({ userId: req.user._id }).sort({ priority: -1 });
  res.json(subjects);
});

export const createSubject = asyncHandler(async (req, res) => {
  const data = req.validated.body;
  const subject = await Subject.create({ ...data, userId: req.user._id });
  res.status(201).json(subject);
});

export const updateSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true });
  if (!subject) return res.status(404).json({ message: 'Subject not found' });
  res.json(subject);
});

export const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!subject) return res.status(404).json({ message: 'Subject not found' });
  res.json({ message: 'Subject deleted' });
});
