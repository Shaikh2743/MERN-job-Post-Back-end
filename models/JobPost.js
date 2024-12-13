const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  contactDetails: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('JobPost', jobPostSchema);

