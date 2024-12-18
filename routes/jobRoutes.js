const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Assuming this is the Job model

// Add Job Route
router.post('/add-job', async (req, res) => {
  const {
    jobPost,
    positions,
    companyName,
    email,
    phoneNumber,
    jobDescription,
    postedBy, // This should ideally come from the token
  } = req.body;

  if (!jobPost || !positions || !companyName || !email || !phoneNumber || !jobDescription) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newJob = new Job({
      jobPost,
      positions,
      companyName,
      email,
      phoneNumber,
      jobDescription,
      postedBy,
    });

    const savedJob = await newJob.save();
    res.status(201).json({ message: 'Job post created successfully', job: savedJob });
  } catch (error) {
    console.error('Error creating job post:', error);
    res.status(500).json({ message: 'Failed to create job post', error });
  }
});

module.exports = router;
