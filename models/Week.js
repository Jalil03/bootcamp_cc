import mongoose from 'mongoose';

const weekSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true, unique: true },
  title: String,
  content: {
    objectives: [String],
    lessons: [String],
    miniProject: String,
    exercises: [String]
  },
  githubTemplate: String,
  createdAt: { type: Date, default: Date.now } ,
  releaseDate: { type: Date }, // 👈 New field
});

const Week = mongoose.model('Week', weekSchema);
export default Week;
