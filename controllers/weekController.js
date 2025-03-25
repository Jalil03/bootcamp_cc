import Week from '../models/Week.js';

// GET /api/weeks
export const getWeeks = async (req, res) => {
  try {
    const today = new Date();
    const weeks = await Week.find({ releaseDate: { $lte: today } }).sort({ weekNumber: 1 });
    res.json(weeks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weeks' });
  }
};


// POST /api/weeks
export const createWeek = async (req, res) => {
  try {
    const { weekNumber, title, content, releaseDate } = req.body;
    const week = new Week({ weekNumber, title, content, releaseDate });
    await week.save();
    res.status(201).json(week);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create week' });
  }
};

