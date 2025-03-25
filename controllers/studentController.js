import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Announcement from '../models/Announcement.js';
import Week from '../models/Week.js';

const JWT_SECRET = process.env.JWT_SECRET || 'jl_secret';

// POST /api/students/signup
export const signup = async (req, res) => {
  try {
    const { name, email, github, password } = req.body;
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    const student = new Student({ name, email, github, password });
    await student.save();

    res.status(201).json({ msg: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

// POST /api/students/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, student: { id: student._id, name: student.name, email: student.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
export const promoteToAdmin = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    student.isAdmin = true;
    await student.save();

    res.json({ msg: `${student.name} is now an admin.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to promote student' });
  }
};


export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id)
      .select('-password')
      .populate('submissions'); // shows actual submission docs instead of just IDs

    const announcements = await Announcement.find().sort({ date: -1 });
    const weeks = await Week.find().sort({ weekNumber: 1 });

    res.json({
      profile: student,
      announcements,
      availableWeeks: weeks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load profile' });
  }
};