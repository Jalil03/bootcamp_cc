import Announcement from '../models/Announcement.js';

// GET /api/announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};

// POST /api/announcements
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;

    const newAnnouncement = new Announcement({ title, message });
    await newAnnouncement.save();

    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
};
