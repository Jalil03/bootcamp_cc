// controllers/adminController.js
import Student from '../models/Student.js';
import Submission from '../models/Submission.js';

export const adminOverview = async (req, res) => {
  console.log('🔍 Fetching admin overview...');
  try {
    const students = await Student.find().select('-password');
    const submissions = await Submission.find().populate('studentId', 'name email github');
    res.json({ students, submissions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin overview' });
  }
};

export const getAdminOverview = async (req, res) => {
    try {
      return res.json({ msg: 'Admin route works!' });
    } catch (err) {
      console.error('❌ Admin overview error:', err);
      res.status(500).json({ error: 'Failed to fetch admin overview' });
    }
  };
  