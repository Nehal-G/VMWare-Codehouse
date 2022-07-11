const commonrouter = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
let Applicant = require('../../models/applicant.model');
let Recruiter = require('../../models/recruiter.model');
let Apptype = require('../../models/usertype.model');
let Job = require('../../models/job.model');
typ = require('mongoose').Types

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const authenticateJWT=require('../../config/middleware');
const Application=require('../../models/application.model');

commonrouter.get("/getbyid/:recid", (req, res) => {
  id=req.params.recid;
  console.log("TQAAAAAAAAAA",id);
  Applicant.findById(id).then(user => {
    console.log()
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });}
      console.log(user)
    return res.json(user)
  })
  .catch(err => console.log(err))

})

commonrouter.post("/update", (req, res) => {
  Applicant.findByIdAndUpdate(req.body.applicant_id, {
    name: req.body.name,
    institute: req.body.institute,
    start_year: req.body.start_year,
    end_year: req.body.end_year,
    skills: req.body.skills,
    resumee: req.body.resumee,
    profile_pic: req.body.profile_pic

  })
  .then(() => {
    res.json({"success": true});
  })
})

// @route POST api/users/register
// @desc Register user
// @access Public
commonrouter.post("/register", (req, res) => {
  console.log(req.body)
  // Form validation
const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    console.log("NOOO")
    return res.status(400).json(errors);
  }
Applicant.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ err: "Email already exists" });
    }
    else {
    Recruiter.findOne({ email: req.body.email }).then(user1 => {
       if (user1) {
      return res.status(400).json({ err: "Email already exists" });
    }
    else{
      const newApplicant = new Applicant({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        institute: req.body.institute,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        skills: req.body.skills,
        resumee: req.body.resumee,
        profile_pic: req.body.profile_pic
      });
      console.log("YAAY")
// Hash password before saving in database
      bcrypt.genSalt(1, (err, salt) => {
        bcrypt.hash(newApplicant.password, salt, (err, hash) => {
          if (err) throw err;
          newApplicant.password = hash;
          newApplicant
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

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
commonrouter.post("/login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email;
  const password = req.body.password;
// Find user by email
  Applicant.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ err: "Email not found" });
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
              user_type: "Applicant"
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ err: "Password incorrect" });
      }
    });
  });
});

commonrouter.route('/update').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username: username});
  console.log(newUser)
  // console.log(req.body)

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json({ err: err}));
});


commonrouter.get("/getcount/:applid", (req, res) => {
  console.log("YAAAY");
  id=req.params.applid;
  console.log("TQAAAAAAAAAA",id);
  Application.countDocuments({applicant_id: id, status: {$gt: -1}}, function(err, count){
    console.log(count);
    res.json({"count": count});
  })
})

commonrouter.get("/checkaccept/:applid", (req, res) => {
  console.log("YAAAY");
  id=req.params.applid;
  console.log("TQAAAAAAAAAA",id);
  Application.findOne({applicant_id: id, status: 2})
  .then((result) => {
    if(!result)
    {
      res.json({"accept": false});
    }
    else
    {
      res.json({"accept": true});
    }
  })
})

module.exports = commonrouter;

// {
// 	"email": "abc@xzyz.com",
// 	"name": "ABC",
// 	"password": "dsasdasdaASAsdasdsadasd",
// 	"password2": "dsasdasdaASAsdasdsadasd"
// }