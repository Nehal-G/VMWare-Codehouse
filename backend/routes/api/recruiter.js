const recruiterrouter = require('express').Router();
const keys = require("../../config/keys");
const bcrypt = require("bcryptjs");
let Recruiter = require('../../models/recruiter.model');
let Job = require('../../models/job.model');
let Apptype = require('../../models/usertype.model');
let Applicant = require('../../models/applicant.model')

const jwt = require("jsonwebtoken");
const key = require("../../config/keys").secretOrkey;
const authenticateJWT=require('../../config/middleware');
typ = require('mongoose').Types

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

recruiterrouter.get("/getbyid/:recid", (req, res) => {
  id=req.params.recid;
  console.log("TQAAAAAAAAAA",id);
  Recruiter.findById(id).then(user => {
    console.log()
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });}
    return res.json(user)
  })
  .catch(err => console.log(err))

})

recruiterrouter.post("/update", (req, res) => {
  Recruiter.findByIdAndUpdate(req.body.recruiter_id, {contact: req.body.contact, bio: req.body.bio, name: req.body.name})
  .then(() => {
    res.json({"success": true});
  })
})

recruiterrouter.post("/register", (req, res) => {
  // Form validation
const { errors, isValid } = validateRegisterInput(req.body);
console.log(req.body);
// Check validation
  if (!isValid) {
    console.log("BRUUUUUUUUUUUUUUU");
    return res.status(400).json(errors);
  }
registration_type = req.body.type;
Recruiter.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ err: "Email already exists" });
    } else {
    Applicant.findOne({ email: req.body.email }).then(user1 => {
      if (user1) {
      return res.status(400).json({ err: "Email already exists" });
    } else {
      console.log("YAAY")
       const newType =new Apptype({
        email: req.body.email,
        password: req.body.password
      });
      const newrecruiter = new Recruiter({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        contact: req.body.contact,
        bio: req.body.bio
      });
// Hash password before saving in database
      bcrypt.genSalt(1, (err, salt) => {
        bcrypt.hash(newrecruiter.password, salt, (err, hash) => {
          if (err) throw err;
          newrecruiter.password = hash;
          newrecruiter
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
         });
      });
    }
    })
  }
});
});



//Get all jobs available
recruiterrouter.route('/jobs').get(authenticateJWT, (req, res) => {
    const token = req.headers.authorization;
  const decoded = jwt.verify(token, key);
  const recruiter_id = decoded.id;
  Job.find({recruiter_id: recruiter_id})
    .then(Job => res.json(Job))
    .catch(err => res.status(400).json('Error: ' + err));
});


recruiterrouter.post("/login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email;
  const password = req.body.password;
// Find user by email
  Recruiter.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 60000 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: token,
              id: user.id,
              user_type: "Recruiter"
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


module.exports = recruiterrouter;

// {
// 	"email": "abc@xyvzaa.com",
// 	"reg_type": "recruiter",
// 	"name": "ABC",
// 	"password": "dsasdasdaASAsdasdsadasd",
// 	"password2": "dsasdasdaASAsdasdsadasd"
// }