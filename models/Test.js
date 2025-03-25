// models/Test.js
import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  score: {
    type: Number, // out of 100 or based on number of questions
  },
  totalQuestions: Number,
  correctAnswers: Number,
  submittedAnswers: [String], // or objects like { questionId, answer }
});

const Test = mongoose.model('Test', testSchema);
export default Test;
