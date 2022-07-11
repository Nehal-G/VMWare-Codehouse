import React, {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Applregister from '../Applicant/Google-Register'
import Register from '../Recruiter/Google-Register'
import CommonNav from './commonnavbar'
import Navbar from 'react-bootstrap/esm/Navbar';
import MetaTags from 'react-meta-tags'
import {GoogleLogin} from 'react-google-login'
const rest_form=[];
let educatin_code=<div></div>;
const clientId="412015919690-bevi83d6o6o4jb060kar0rvvct20p467.apps.googleusercontent.com";

export default class GoogleReg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_type: ''
        }
        this.onChangetype = this.onChangetype.bind(this);
        this.successlogin = this.successlogin.bind(this);
    }


    onChangetype(event) {
        this.setState({ user_type: event.target.value });
    }

    successlogin(res)
    {
        console.log(res);
    }

componentDidMount () {
    const script = document.createElement("script");

    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer=true;

    document.body.appendChild(script);
}

    render() {
        let cont=<div></div>
        if(this.state.user_type=="Applicant")cont=<Applregister/>;
        if(this.state.user_type=="Recruiter")cont=<Register/>;
        return (
            <div>
            <MetaTags>
    <meta name="google-signin-client_id" content="412015919690-bevi83d6o6o4jb060kar0rvvct20p467.apps.googleusercontent.com"/>
            </MetaTags>
            <CommonNav/>
            <form>
            {/* <GoogleLogin clientId={clientId} buttonText="Login" onSuccess={this.successlogin}/> */}
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