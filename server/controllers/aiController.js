import Subject from '../models/Subject.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateStudyPlan } from '../services/openaiService.js';

export const getAiPlan = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({ userId: req.user._id }).select('name weeklyHours priority');
  const payload = {
    subjects,
    weeklyAvailableHours: req.validated.body.weeklyAvailableHours,
    weakSubjects: req.validated.body.weakSubjects,
    upcomingExams: req.validated.body.upcomingExams
  };

  const aiPlan = await generateStudyPlan(payload);
  res.json(aiPlan);
});
