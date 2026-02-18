import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    weeklyHours: { type: Number, required: true, min: 0 },
    priority: { type: Number, min: 1, max: 5, default: 3 }
  },
  { timestamps: true }
);

subjectSchema.index({ userId: 1, name: 1 }, { unique: true });

export default mongoose.model('Subject', subjectSchema);
