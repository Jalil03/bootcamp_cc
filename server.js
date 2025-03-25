import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import protect from './middleware/authMiddleware.js';
import testRoutes from './routes/testRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import weekRoutes from './routes/weeks.js';
import submissionRoutes from './routes/submissions.js';
import announcementRoutes from './routes/announcements.js';
import adminRoutes from './routes/admin.js';


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
// Routes
app.use('/api/students', studentRoutes);
app.use('/api/weeks', weekRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tests', testRoutes);



// Protected test route
app.get('/api/protected', protect, (req, res) => {
  res.send(`🔒 Hello, you are authenticated! Your ID: ${req.user.id}`);
});

// Root route (optional)
app.get('/', (req, res) => {
  res.send('👋 Welcome to CodeCrafters Bootcamp API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
