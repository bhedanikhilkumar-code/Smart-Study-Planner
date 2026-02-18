import mongoose from 'mongoose';

const studySessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true, min: 0.25 },
    completed: { type: Boolean, default: false },
    priority: { type: Number, min: 1, max: 5, default: 3 },
    timeBlock: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('StudySession', studySessionSchema);
