import express from 'express';
import { getWeeks, createWeek } from '../controllers/weekController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminOnly.js';

const router = express.Router();

router.get('/', protect, getWeeks);
router.post('/', protect, adminOnly, createWeek);

export default router;
