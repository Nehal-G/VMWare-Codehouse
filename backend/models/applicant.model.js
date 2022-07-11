const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {type: String, required: true},
  password: {type: String, required: true},
  institute: [String],
  start_year: [String],
  end_year: [String],
  skills: [String],
  ratingsum: {type: Number, default: 0},
  ratingcount: {type: Number, default: 0},
   resumee: {
      type: String,
    },
    profile_pic: {type: String}
}, {
  timestamps: true,
});

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;