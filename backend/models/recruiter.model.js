const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {type: String,unique: true,  required: true},
  password: {type: String, required: true},
  contact: {type: Number},
  bio: {type: String},
  job_listings: {type: Number, default: 0}
}, {
  timestamps: true,
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;