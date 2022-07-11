const commonrouter = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
let Applicant = require('../../models/applicant.model');
let Recruiter = require('../../models/recruiter.model');
let Job = require('../../models/job.model');

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const authenticateJWT=require('../../config/middleware');

commonrouter.post("/login", (req, res) => {
  console.log(req.body);
  // Form validation
  console.log(req.body);
const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    console.log("NOOOOOOOOOO");
    return res.status(400).json(errors);
  }
const email = req.body.email;
const password = req.body.password;
console.log(password);
// Find user by email
  Applicant.findOne({ email: email }).then(user => {
    // Check if user exists
    if(!user){
      console.log("NOOOOOOOOOoo");
      Recruiter.findOne({email: email})
      .then(user1 => {
        if(!user1)
        {
         return res.status(400).json(errors);
        }
        console.log(user1)
        bcrypt.compare(password, user1.password).then(isMatch => {
      if (isMatch) {
            res.json({
              success: true,
              id: user1._id,
              name: user1.name,
              type: "Recruiter"
            });
          }
      else
      {
        return res.status(400).json(errors);
      }
    })
    .catch(err => {
      console.log(err)
      });
      })
    }
    if(user){

    console.log(user);
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
            res.json({
              success: true,
              id: user._id,
              name: user.name,
              type: "Applicant"
            });
          }
         else
      {
        return res.status(400).json(errors);
      }
    })
    .catch(err => {
      console.log(err)
      })};
    });
  });

commonrouter.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username: username});
  console.log(newUser)
  // console.log(req.body)


  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = commonrouter;

// {
// 	"email": "abc@xzyz.com",
// 	"name": "ABC",
// 	"password": "dsasdasdaASAsdasdsadasd",
// 	"password2": "dsasdasdaASAsdasdsadasd"
// }