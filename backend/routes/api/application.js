const applicationrouter = require('express').Router();
let Recruiter = require('../../models/recruiter.model');
let Applicant = require('../../models/applicant.model');
let Job = require('../../models/job.model');
let Application = require('../../models/application.model');
const jwt = require("jsonwebtoken");
const key = require("../../config/keys").secretOrkey;
const authenticateJWT=require('../../config/middleware');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dassassignment@gmail.com',
    pass: 'dassbest'
  }
});

//Get all jobs available
applicationrouter.route('/create').post((req, res) => {
  console.log("YAAAY");
  console.log(req.body);
  const newapp = new Application({
        job_id: req.body.job_id,
        applicant_id: req.body.applicant_id,
        sop: req.body.sop,
        recruiter_id: req.body.recruiter_id
      });
  newapp.save()
    .then(() => {
        Job.findOneAndUpdate({_id: req.body.job_id}, {$inc: {'curr_applications': 1}})
        .then(() => {})
      res.json(newapp)
      })
    .catch(err => res.status(400).json('Error: ' + err));
});


applicationrouter.get("/recruiter/:recid", (req, res) => {
  id=req.params.recid;
  console.log("TQAAAAAAAAAA",id);
  Application.find({recruiter_id: id})
  .populate('job_id')
  .populate('recruiter_id')
  .then(user => {
    console.log()
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });}
    return res.json(user)
  })
  .catch(err => console.log(err))

})
applicationrouter.get("/applicant/:recid", (req, res) => {
  id=req.params.recid;
  console.log("TQAAAAAAAAAA",id);
  Application.find({applicant_id: id})
  .populate({
    path: 'job_id',
    populate: {
      path: 'recruiter_id'
    }
  })
  .populate("recruiter_id")
  .then(user => {
    console.log(user)
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });}
    return res.json(user)
  })
  .catch(err => console.log(err))

})

applicationrouter.get("/job", (req, res) => {
  job_id=mongoose.Types.ObjectId(req.query.job_id);
  recruiter_id=mongoose.Types.ObjectId(req.query.recruiter_id);
  Application.find({job_id: job_id, status: {$ne: -1}})
  .populate("applicant_id")
  .populate("job_id")
  .populate("recruiter_id")
  .lean()
  .then(async user => {
    console.log(user)
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });}
    var results = await Promise.all(user.map(async (element, index) => {
        if(user[index].applicant_id.ratingcount==0 || user[index].applicant_id.ratingcount==null)
        {user[index].rating=0;}
        else
        {user[index].rating=1.0*user[index].applicant_id.ratingsum/user[index].applicant_id.ratingcount;}
        console.log("XXXXX", user[index].applicant_id.ratingsum, user[index].applicant_id.ratingcount)
        // console.log("ELEMEMME",element)
        }));
        // console.log("YAYYYY0");
      // console.log(Job);
          console.log("BBBBBBBB")
          console.log(user);
    return res.json(user)
        })
  .catch(err => console.log(err))
  })

applicationrouter.get("/acceptedjobs", (req, res) => {
  recruiter_id=mongoose.Types.ObjectId(req.query.recruiter_id);
  console.log(recruiter_id);
  Application.find({status: {$eq: 2}, recruiter_id: recruiter_id})
  .populate("applicant_id")
  .populate({path: "job_id",
  match: { recruiter_id: recruiter_id }})
  .lean()
  .then(async user => {
    console.log(user)
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });}
      console.log("YASSS");
      var results = await Promise.all(user.map(async (element, index) => {
        if(user[index].applicant_id.ratingcount==0 || user[index].applicant_id.ratingcount==null)
        {user[index].rating=0;}
        else
        {user[index].rating=1.0*user[index].applicant_id.ratingsum/user[index].applicant_id.ratingcount;}
        console.log("XXXXX", user[index].applicant_id.ratingsum, user[index].applicant_id.ratingcount)
        // console.log("ELEMEMME",element)
        }));
        // console.log("YAYYYY0");
      // console.log(Job);
    return res.json(user)
        })
  .catch(err => console.log(err))
  })

applicationrouter.route('/status').post((req, res) => {
  Application.findByIdAndUpdate(req.body.application_id, {status: req.body.value})
  .then(() => res.json({}))
  .catch(err => res.status(400).json('Error: ' + err));
});

applicationrouter.route('/accept').post((req, res) => {
    Job.findByIdAndUpdate(req.body.job_id, {$inc: {'curr_positions': 1}})
    .then(() => {
      Application.updateMany({applicant_id: req.body.applicant_id, job_id: {$ne: req.body.job_id}}, {status: -1})
      .then(() => {
        var mailOptions = {
        from: 'LinkedOut Recruiter',
        to: req.body.applicant_email,
        subject: 'Acceptance of Job',
        text: 'Hello '+req.body.applicant_name+"! Recruiter "+req.body.recruiter_name+" has accepted your application for job "+req.body.job_name+". Congratulations!"
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      Application.findByIdAndUpdate(req.body.application_id, {date_of_accept: Date.now()})
      .then(() => {
        res.json({"success": true});
      })
      .catch(err => res.status(400).json('Error: ' + err));
      })
    })
});

applicationrouter.route('/ratejob').post((req, res) => {
  console.log("YUMMMM");
    Application.findByIdAndUpdate(req.body.application_id, {job_rating: req.body.job_rating})
    .then(() => {
      Job.findByIdAndUpdate( req.body.job_id, {$inc: {'ratingsum': req.body.job_rating, 'ratingcount': 1}})
      .then(() => {
      res.json({"success": true});
      })
    })
});

applicationrouter.route('/rateapplicant').post((req, res) => {
  console.log("YUMMMM");
    Application.findByIdAndUpdate(req.body.application_id, {applicant_rating: req.body.applicant_rating})
    .then(() => {
      Applicant.findByIdAndUpdate( req.body.applicant_id, {$inc: {'ratingsum': req.body.applicant_rating, 'ratingcount': 1}})
      .then(() => {
      res.json({"success": true});
      })
    })
});

applicationrouter.route('/rejectothers').post((req, res) => {
      console.log("YASSSSSS");
      Application.updateMany({job_id: req.body.job_id, status: {$ne: 2}}, {status: -1}, function(err, docs){
        if(err){
          res.status(400).json("Error: "+err);
        }
        else{
          console.log(docs);
          res.json(docs);
        }
      })
});

module.exports = applicationrouter;

// {
// 	"email": "abc@xyvzaa.com",
// 	"reg_type": "recruiter",
// 	"name": "ABC",
// 	"password": "dsasdasdaASAsdasdsadasd",
// 	"password2": "dsasdasdaASAsdasdsadasd"
// }