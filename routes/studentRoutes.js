import express from 'express';
import { signup, login } from '../controllers/studentController.js';
import protect from '../middleware/authMiddleware.js';
import { promoteToAdmin } from '../controllers/studentController.js';
import adminOnly from '../middleware/adminOnly.js';

import { getStudentProfile } from '../controllers/studentController.js';


const router = express.Router();

router.post('/signup',signup);

router.patch('/:id/promote', protect, adminOnly, promoteToAdmin);


router.get('/me', protect, getStudentProfile);


router.post('/login', login);

export default router;
