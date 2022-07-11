import React, {Component} from 'react';
import { Outlet, Link } from "react-router-dom";
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
const rest_form=[];
let educatin_code=<div></div>;

export default class CommonNav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_type: ''
        }
        this.onChangetype = this.onChangetype.bind(this);
    }


    onChangetype(event) {
        this.setState({ user_type: event.target.value });
    }


    render() {
        return(
//         <Navbar bg="light" expand="lg">
//   <Navbar.Brand href="#home">UnLinkedIn</Navbar.Brand>
//   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//     <Nav className="mr-auto">
//       <Nav.Link href="/">Home</Nav.Link>
//       <Nav.Link href="/login">Login</Nav.Link>
//       <Nav.Link href="/Register">Register</Nav.Link>
//       <Nav.Link href="/googleregister">Register With Google</Nav.Link>
//     </Nav>
//   </Navbar.Collapse>
// </Navbar>

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
        <Link to="/login"><a className="nav-link" href="#">LOGIN</a></Link>
        </li>
        <li className="nav-item">
        <Link to="/register"><a className="nav-link" href="#">REGISTER</a></Link>
        </li>
        <li className="nav-item">
        <Link to="/googleregister"><a className="nav-link me" href="#">SIGNUP WITH GOOGLE</a></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>


        )
    }
}