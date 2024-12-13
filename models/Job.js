const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobPost: { type: String, required: true },
  positions: { type: Number, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  jobDescription: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming you're using User model for authentication
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
