import StudySession from '../models/StudySession.js';
import Backlog from '../models/Backlog.js';
import Exam from '../models/Exam.js';
import Subject from '../models/Subject.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todaySessions, pendingBacklogs, upcomingExams, subjects, weeklySessions] = await Promise.all([
    StudySession.find({ userId, date: { $gte: today } }),
    Backlog.countDocuments({ userId, status: 'pending' }),
    Exam.find({ userId, examDate: { $gte: new Date() } }).populate('subjectId', 'name').sort({ examDate: 1 }).limit(5),
    Subject.find({ userId }),
    StudySession.find({ userId, date: { $gte: new Date(Date.now() - 7 * 86400000) } }).populate('subjectId', 'name')
  ]);

  const dailyStudyHours = todaySessions.reduce((sum, s) => sum + s.duration, 0);
  const streak = Math.min(weeklySessions.length, 7);

  const bySubject = subjects.map((subject) => {
    const hours = weeklySessions
      .filter((s) => String(s.subjectId?._id || s.subjectId) === String(subject._id))
      .reduce((sum, session) => sum + session.duration, 0);
    return { name: subject.name, hours };
  });

  res.json({ dailyStudyHours, pendingBacklogs, upcomingExams, streak, weeklyProductivity: bySubject });
});
