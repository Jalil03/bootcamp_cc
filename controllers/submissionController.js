import Submission from '../models/Submission.js';

// POST /api/submissions
import Week from '../models/Week.js';

export const submitProject = async (req, res) => {
  try {
    const { title, url, week } = req.body;

    // Fetch weekNumber from Week model
    const foundWeek = await Week.findById(week);
    if (!foundWeek) {
      return res.status(404).json({ error: 'Week not found' });
    }

    const submission = new Submission({
      githubRepo: url,
      weekNumber: foundWeek.weekNumber,
      studentId: req.user._id
    });

    await submission.save();

    // Optional: add submission to student's record
    req.user.submissions.push(submission._id);
    await req.user.save();

    res.status(201).json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit project' });
  }
};

// GET /api/submissions/me
export const getSubmissionsByStudent = async (req, res) => {
  try {
    const submissions = await Submission.find({ studentId: req.user.id }).sort({ weekNumber: 1 });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get your submissions' });
  }
};

export const reviewSubmission = async (req, res) => {
  const { status, feedback } = req.body;

  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ msg: 'Submission not found' });

    submission.status = status || submission.status;
    submission.feedback = feedback || submission.feedback;

    await submission.save();
    res.json({ msg: 'Submission reviewed', submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to review submission' });
  }
};
