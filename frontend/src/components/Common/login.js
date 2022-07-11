import React, {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';
import signupImg from "./Images/office.png";
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ls from "local-storage";
import CommonNav from "./commonnavbar"
import {GoogleLogin} from 'react-google-login'
import Footer from "./footer"
const clientId="412015919690-bevi83d6o6o4jb060kar0rvvct20p467.apps.googleusercontent.com";


const rest_form=[];
let educatin_code=<div></div>;

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangeContact = this.onChangeContact.bind(this);
        // this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onCompletion = this.onCompletion.bind(this);
        this.successlogin = this.successlogin.bind(this);
    }

    // updateForm = (event) => {
    //     console.log("YAAY")
    //     event.target.rest_form +="<div>YAAY</div>"

    // }

    // onChangeName(event) {
    //     this.setState({ name: event.target.value });
    // }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
        console.log(event.target.value)
    }
    onChangePass(event){
        this.setState({ password: event.target.value });
    }
    // onChangeconf(event){
    //     this.setState({ confirm_password: event.target.value });
    // }
    // onChangeUser(event){
    //     this.setState({ user_type: event.target.value });
    //     {

    //     }
    // }

    successlogin(res)
    {
        console.log(res);
        this.setState({email: res.profileObj.email});
        this.setState({password: res.googleId})
        console.log("YASSSS");
        this.onCompletion();
    }

    onCompletion(event) {

        const UserData = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(UserData)
        axios.post('http://localhost:5000/login', UserData)
             .then((res)=> {
				console.log(res.data);
                localStorage.setItem("user_id", res.data.id);
                localStorage.setItem("user_type", res.data.type);
                localStorage.setItem("user_name", res.data.name);
				window.location = "/";
			})
			.catch((res) => {
				alert("Error",res);
			});
    }

    render() {
        return (
<div>
<CommonNav/>
<div className="container signup-title">
            <div className="row align-items-start">
              <div className="col title-div">
              <h2 className="form-title">WELCOME BACK</h2>
        <h6 className='subline'>Login your details</h6>
              <form>
              
            <div>
                <label for="exampleInputEmail">Email address</label>
                <input type="" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={this.onChangeEmail}></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div >
                <label for="exampleInputPassword1"  >Password</label>
                <input type="password" onChange={this.onChangePass} className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password}></input>
            </div>
            <div> <button type="button" className="btn btn-primary signup-btn" onClick={this.onCompletion}>Submit</button>
            <GoogleLogin clientId={clientId} buttonText="Login" onSuccess={this.successlogin}/>
       </div>
       <div>{this.state.password}</div>
       </form>
              </div>
              <div className="col">
                <img  src={signupImg}></img>
              </div>
            </div>
            </div>
            <Footer></Footer>
</div>
           
        )
    }
}