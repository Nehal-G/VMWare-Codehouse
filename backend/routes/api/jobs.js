const commonrouter = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
let Applicant = require('../../models/applicant.model');
let Recruiter = require('../../models/recruiter.model');
let Job = require('../../models/job.model');
let Application = require('../../models/application.model')
var mongoose = require('mongoose')

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const authenticateJWT=require('../../config/middleware');

commonrouter.route('/create').post((req, res) => {
  console.log("YAAAY");
  console.log(req.body);
  const job = new Job(
        req.body
      );
  job.save()
    .then(() => res.json('Job added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

commonrouter.get("/getbyid/:jobid", (req, res) => {
  id=req.params.jobid;
  Job.findById(id).then(user => {
    console.log()
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });}
    return res.json(user)
  })
  .catch(err => console.log(err))
})

commonrouter.get('/show/:applid', async (req, res) => {
  applid=req.params.applid;
  console.log(applid);
  applid=mongoose.Types.ObjectId(applid);
  dt = new Date(Date.now())
  console.log(dt);
  Job.find({deadline: {$gt: dt}})
  .populate('recruiter_id')
    .lean()
    .then(async job => {
      console.log(job);
      var results = await Promise.all(job.map(async (element, index) => {
        if(job[index].ratingcount==0 || job[index].ratingcount==null)
        {job[index].rating=0;}
        else
        {job[index].rating=1.0*job[index].ratingsum/job[index].ratingcount;}
        // console.log("ELEMEMME",element)
        console.log("TYPEEEEEE Job", typeof(job));
        console.log("TYPEEEEEE Job[0]", typeof(job[0]));
        console.log(job[index]._id)
        jobid = (job[index]._id);
        application = await Application.findOne({job_id: jobid, applicant_id: applid})
        console.log(application)
          if(!application)
          {
            job[index].status=0;
            if(element.max_applications==element.curr_applications || element.max_positions == element.curr_positions)
          {
            // console.log("BRUUUUU");
            job[index].status=-1;
          }
            // console.log("Modiffff");
          }
          else
          {
            // console.log("BRUUUUU");
            job[index].status=1;
          }

          console.log("AAAAAAAAAAA")
        }));
        // console.log("YAYYYY0");
      // console.log(Job);
          console.log("BBBBBBBB")

      res.json(job);
        })
      .catch(error => {
        console.log(error);
      });
});
// commonrouter.route('/show').get((req, res) => {
//   Job.find(req.body)
//     .then(Job => res.json(Job))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

commonrouter.route('/showbyid').get((req, res) => {
  Job.findById(req.body.id)
    .then(Job => res.json(Job))
    .catch(err => res.status(400).json('Error: ' + err));
});

commonrouter.route('/delete').post((req, res) => {
  console.log("YYAAY");
  Application.remove({job_id: req.body.job_id})
  .then((Application) => console.log(Application))
  Job.findByIdAndDelete(req.body.job_id)
    .then(Job => res.json(Job))
    .catch(err => res.status(400).json('Error: ' + err));
});

commonrouter.post("/update", (req, res) => {
  Job.findByIdAndUpdate(req.body.job_id, {max_applications: req.body.max_applications, max_positions: req.body.max_positions, deadline: req.body.deadline})
  .then(() => {
    res.json({"success": true});
  })
})

commonrouter.get('/showrec/:applid', async (req, res) => {
  applid=req.params.applid;
  console.log(applid);
  applid=mongoose.Types.ObjectId(applid);
  Job.find({recruiter_id: applid, $expr: { $gt: ["$max_positions", "$curr_positions"]}})
    .then((Job) => {
      console.log(Job);
      res.json(Job)
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = commonrouter;
