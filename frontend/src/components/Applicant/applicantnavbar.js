import React, {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Applregister from '../Applicant/Register'
import Register from '../Recruiter/Register'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import FormControl from 'react-bootstrap/FormControl'
import { Outlet, Link } from "react-router-dom";
import Footer from "../Common/footer"
const rest_form=[];
let educatin_code=<div></div>;


export default class ApplicantNav extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(event)
    {
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_type");
        window.location = '/';
    }

    render() {
        return(

<div>
        <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
  <Link to="/"><a className="navbar-brand" href="#">Hetero-Mutants</a></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse mr-auto" id="navbarNavDropdown">
      <ul className="navbar-nav navbar-right mr-auto">
      <li className="nav-item">
        <Link to="/applicant"><a className="nav-link" href="#">Home</a></Link>
        </li>
        <li className="nav-item">
        <Link to="/applicant/myjobs"><a className="nav-link" href="#">Applications</a></Link>
        </li>
        <li className="nav-item">
        <Link to="/applicant/profile"><a className="nav-link" href="#">My Profile</a></Link>
        </li>
        <li className="nav-item">
        <Link to="/applicant/editprofile"><a className="nav-link me" href="#">Edit Profile</a></Link>
        </li>
        <li>
        <Button onClick={this.logout}>Logout</Button>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
        )
    }
}