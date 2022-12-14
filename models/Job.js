import mongoose from 'mongoose';
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company'],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxLength: 50,
    },
    status: {
      type: String,
      enum: ['pending', 'interview', 'declined'],
      default: 'pending',
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'internship'],
      default: 'full-time',
    },
    setting: {
      type: String,
      enum: ['office', 'hybrid', 'remote'],
      default: 'office',
    },
    officeLocation: {
      type: String,
      default: 'my-city',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User must be provided'],
    },
    interviewDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
export default mongoose.model('Job', JobSchema);
