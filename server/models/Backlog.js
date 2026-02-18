import mongoose from 'mongoose';

const backlogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    topic: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
  },
  { timestamps: true }
);

export default mongoose.model('Backlog', backlogSchema);
