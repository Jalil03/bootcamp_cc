// controllers/testController.js
import Test from '../models/Test.js';
import Student from '../models/Student.js';

export const submitTest = async (req, res) => {
  try {
    const { weekNumber, answer } = req.body;

    const test = await Test.findOne({ weekNumber });
    if (!test) return res.status(404).json({ msg: 'Test not found' });

    if (test.correctAnswer.toLowerCase() === answer.toLowerCase()) {
      // Avoid duplicate progress entries
      if (!req.user.progress.includes(weekNumber)) {
        req.user.progress.push(weekNumber);
        await req.user.save();
      }
      return res.json({ msg: '✅ Correct! Progress updated.' });
    }

    res.status(400).json({ msg: '❌ Incorrect answer. Try again!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit test' });
  }
};
export const createTest = async (req, res) => {
    try {
      const { weekNumber, question, correctAnswer } = req.body;
  
      const test = new Test({ weekNumber, question, correctAnswer });
      await test.save();
  
      res.status(201).json({ msg: 'Test created successfully', test });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create test' });
    }
  };

// controllers/testController.js
export const getTestByWeek = async (req, res) => {
    try {
      const { weekNumber } = req.params;
  
      const test = await Test.findOne({ weekNumber });
  
      if (!test) return res.status(404).json({ msg: 'Test not found' });
  
      // Don’t expose correct answer!
      const { _id, question } = test;
      res.json({ _id, question });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch test' });
    }
  };
  