import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    examDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Exam', examSchema);
