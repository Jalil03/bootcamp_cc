// routes/testRoutes.js
import express from 'express';
import { submitTest } from '../controllers/testController.js';
import protect from '../middleware/authMiddleware.js';
import { createTest } from '../controllers/testController.js';
import { getTestByWeek } from '../controllers/testController.js';
import { submitTest2 } from '../controllers/submitTest .js';
import TestResult from '../models/TestResult.js';

const router = express.Router();

router.post('/submit', protect, submitTest);
import adminOnly from '../middleware/adminOnly.js';

router.post('/', protect, adminOnly, createTest);
router.get('/:weekNumber', protect, getTestByWeek);
router.post('/:weekNumber/submit', protect, submitTest2);
// GET /api/tests/results/me
router.get('/results/me', protect, async (req, res) => {
    try {
      const results = await TestResult.find({ student: req.user._id }).sort({ weekNumber: 1 });
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch your test results' });
    }
  });
  

export default router;
