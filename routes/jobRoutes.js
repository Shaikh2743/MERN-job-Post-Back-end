const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Assuming 'Job' is the correct model
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication

// Create a Job Post (Protected Route)
router.post('/add-job', authMiddleware, async (req, res) => {
  const { jobTitle, positions, companyName, email, phoneNumber, jobDescription } = req.body;

  try {
    // Create a new job post
    const newJob = new Job({
      jobTitle,
      positions,
      companyName,
      email,
      phoneNumber,
      jobDescription,
      postedBy: req.user.id, // Assuming the middleware adds `req.user`
    });

    // Save to database
    await newJob.save();
    res.status(201).json({ message: 'Job post created successfully', job: newJob });
  } catch (error) {
    console.error('Error creating job post:', error);
    res.status(500).json({ message: 'Failed to create job post' });
  }
});

// Get All Job Posts
router.get('/', async (req, res) => {
  try {
    const jobPosts = await Job.find().populate('postedBy', 'username'); // Populate user details
    res.status(200).json(jobPosts);
  } catch (error) {
    console.error('Error fetching job posts:', error);
    res.status(500).json({ message: 'Failed to fetch job posts' });
  }
});

// Get Job Posts by Logged-in User (Protected Route)
router.get('/my-jobs', authMiddleware, async (req, res) => {
  try {
    const userJobs = await Job.find({ postedBy: req.user.id }); // Fetch jobs posted by the logged-in user
    res.status(200).json(userJobs);
  } catch (error) {
    console.error('Error fetching user job posts:', error);
    res.status(500).json({ message: 'Failed to fetch your job posts' });
  }
});

module.exports = router;
