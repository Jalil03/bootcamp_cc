// routes/admin.js
import express from 'express';
import { adminOverview } from '../controllers/adminController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminOnly.js';

const router = express.Router();

// Admin-only dashboard overview
router.get('/overview', protect, adminOnly, adminOverview);

export default router;