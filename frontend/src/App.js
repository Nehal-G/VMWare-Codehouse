import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Common/Home'
import Register from './components/Recruiter/Register'
import Navbar from './components/templates/Navbar'
import Login from './components/Common/login'
import JobDashboard from './components/Applicant/JobDashboard'
import Myapplication from './components/Applicant/Myapplication'
import Applregister from './components/Applicant/Register'
import CommonReg from './components/Common/commonReg'
import RecDashboard from './components/Recruiter/RecDashboard'
import newJob from './components/Recruiter/NewJob'
import RecrApps from './components/Recruiter/Myapplication'
import RecEdit from './components/Recruiter/EditProfile'
import RecProfile from './components/Recruiter/viewProfile'
import editJob from './components/Recruiter/editJob'
import AcceptedApps from './components/Recruiter/AcceptedApplications'
import ApplicantProfile from './components/Applicant/viewProfile'
import EditApplicant from './components/Applicant/editprofile'
import GoogleReg from './components/Common/Google-register'

let user_id=localStorage.getItem('id');
let user_type=localStorage.getItem('id');


function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/register" component={CommonReg}/>
        <Route path="/googleregister" component={GoogleReg}/>
        <Route path="/login" component={Login}/>
        <Route path="/applicant" exact component={JobDashboard}/>
        <Route path="/applicant/register" exact component={Applregister}/>
        <Route path="/applicant/myjobs" exact component={Myapplication}/>
        <Route path="/recruiter" exact component={RecDashboard}/>
        <Route path="/recruiter/addjob" exact component={newJob}/>
        <Route path="/recruiter/applications" exact component={RecrApps}/>
        <Route path="/recruiter/editprofile" exact component={RecEdit}/>
        <Route path="/recruiter/profile" exact component={RecProfile}/>
        <Route path="/recruiter/editjob" exact component={editJob}/>
        <Route path="/recruiter/employees" exact component={AcceptedApps}/>
        <Route path="/applicant/profile" exact component={ApplicantProfile}/>
        <Route path="/applicant/editprofile" exact component={EditApplicant}/>
      </div>
    </Router>
  );
}

export default App;
