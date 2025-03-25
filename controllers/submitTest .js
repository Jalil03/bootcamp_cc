import Test from '../models/Test.js';
import TestResult from '../models/TestResult.js';

export const submitTest2 = async (req, res) => {
  try {
    const { answers } = req.body; // example: ["B", "A", "C"]
    const weekNumber = parseInt(req.params.weekNumber);

    const questions = await Test.find({ weekNumber });

    if (questions.length === 0) {
      return res.status(404).json({ msg: 'No test found for this week.' });
    }

    let correct = 0;

    questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) correct++;
    });

    const score = Math.round((correct / questions.length) * 100);

    const result = await TestResult.create({
      student: req.user._id,
      weekNumber,
      score,
      totalQuestions: questions.length,
      correctAnswers: correct,
      submittedAnswers: answers,
      passed: score >= 50
    });

    // Optional: update student progress
    if (score >= 50) {
      req.user.progress.push(weekNumber);
      await req.user.save();
    }

    res.status(201).json({ msg: 'Test submitted', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit test' });
  }
};

