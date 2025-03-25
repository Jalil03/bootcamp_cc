// models/TestResult.js
import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  weekNumber: { type: Number, required: true },
  score: { type: Number, required: true },
  totalQuestions: Number,
  correctAnswers: Number,
  submittedAnswers: [String], // or [ { questionId, answer } ]
  passed: { type: Boolean, default: false }
}, { timestamps: true });

const TestResult = mongoose.model('TestResult', testResultSchema);
export default TestResult;
