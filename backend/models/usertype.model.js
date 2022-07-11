const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usertypeSchema = new Schema({
  email: {type: String, required: true},
  type: {type: String, required:true}
}, {
  timestamps: true,
});

const Usertype = mongoose.model('Usertype', usertypeSchema);

module.exports = Usertype;