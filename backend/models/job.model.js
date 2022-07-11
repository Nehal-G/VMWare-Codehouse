const {EventAvailable}=require('@material-ui/icons');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {type: String, required: true},
  recruiter_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter'},
  max_applications: {type: Number},
  curr_applications: {type: Number, default: 0},
  max_positions: {type: Number},
  curr_positions: {type: Number, default: 0},
  posting_date: {type: Date, default: Date.now},
  deadline: {type: Date},
  skills: [String],
  job_type: {type: String, default: ""},
  duration: {type: Number, default: 0},
  salary: {type: Number},
  ratingsum: {type: Number, default: 0},
  ratingcount: {type: Number, default: 0},
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;