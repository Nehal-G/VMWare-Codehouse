const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  job_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
  applicant_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Applicant'},
  sop: {type: String},
  status: {type: Number, default: 0},
  date_of_accept: {type: Date, default: null},
  job_rating: {type: Number, default: -1},
  applicant_rating: {type: Number, default: -1},
  recruiter_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter'}
}, {
  timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;