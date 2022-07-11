const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
app.use(express.json());

// file upload api
app.post('/upload', (req, res) => {
  console.log("BRUUUUU");
  console.log(req.files);
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    const timefactor = Date.now();
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${timefactor}${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: "-"+timefactor+myFile.name, path: `/${timefactor}${myFile.name}`});
    });
})

const uri = "mongodb+srv://JobPortal:nehal@cluster0.8owixki.mongodb.net/jobs"
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// const exercisesRouter = require('./routes/exercises');
const commonrouter = require('./routes/api/common');
const recruiterrouter = require('./routes/api/recruiter')
const applicantrouter = require('./routes/api/applicant')
const applicationrouter = require('./routes/api/application')
const jobrouter = require('./routes/api/jobs')
// app.use('/exercises', exercisesRouter);
app.use('', commonrouter)
app.use('/recruiter', recruiterrouter)
app.use('/applicant', applicantrouter)
app.use('/jobs', jobrouter)
app.use('/application', applicationrouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
