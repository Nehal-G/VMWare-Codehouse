import React, {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Applregister from '../Applicant/Register'
import Register from '../Recruiter/Register'
import CommonNav from './commonnavbar'
import Title from './sign-title'
import Navbar from 'react-bootstrap/esm/Navbar';
const rest_form=[];
let educatin_code=<div></div>;

export default class CommonReg extends Component {

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
        let cont=<div></div>
        if(this.state.user_type=="Applicant")cont=<Applregister/>;
        if(this.state.user_type=="Recruiter")cont=<Register/>;
        return (
            <div>
            <CommonNav/>
            <Title></Title>
            <form>
                <div className="form-group">
                <label for="exampleFormControlSelect1">Role</label>
                <select className="form-control" id="exampleFormControlSelect1" onChange={this.onChangetype} value={this.state.user_type}>
                <option selected>Select Option</option>
                <option>Applicant</option>
                <option>Recruiter</option>
                </select>
                </div>
                {cont}
            </form>
            </div>
        )
    }
}