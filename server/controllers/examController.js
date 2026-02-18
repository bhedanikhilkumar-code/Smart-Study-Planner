import Exam from '../models/Exam.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find({ userId: req.user._id }).populate('subjectId', 'name').sort({ examDate: 1 });
  res.json(exams);
});

export const createExam = asyncHandler(async (req, res) => {
  const exam = await Exam.create({ ...req.validated.body, userId: req.user._id });
  res.status(201).json(exam);
});

export const updateExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true });
  if (!exam) return res.status(404).json({ message: 'Exam not found' });
  res.json(exam);
});

export const deleteExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!exam) return res.status(404).json({ message: 'Exam not found' });
  res.json({ message: 'Exam deleted' });
});
