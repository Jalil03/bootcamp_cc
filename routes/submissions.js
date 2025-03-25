import express from 'express';
import { submitProject, getSubmissionsByStudent } from '../controllers/submissionController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminOnly.js';
import { reviewSubmission } from '../controllers/submissionController.js';
const router = express.Router(); // ✅ Don't forget this line!

// POST a new project submission
router.post('/', protect, submitProject);

// GET all submissions by logged-in student
router.get('/me', protect, getSubmissionsByStudent);


router.patch('/:id/review', protect, adminOnly, reviewSubmission);


export default router;
