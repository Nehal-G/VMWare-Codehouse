import React, {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {GoogleLogin} from 'react-google-login'
const clientId="412015919690-bevi83d6o6o4jb060kar0rvvct20p467.apps.googleusercontent.com";
const rest_form=[];
let educatin_code=<div></div>;

export default class Recregister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            password: '',
            confirm_password: '',
            contact: '',
            bio: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onCompletion = this.onCompletion.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        // this.onChangeContact = this.onChangeContact.bind(this);
        // this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeconf = this.onChangeconf.bind(this);
        this.onChangecontact = this.onChangecontact.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.successlogin = this.successlogin.bind(this);

    }

    updateForm = (event) => {
        console.log("YAAY")
        event.target.rest_form +="<div>YAAY</div>"

    }
    successlogin(res)
    {
        this.setState({email: res.profileObj.email});
        this.setState({password: res.googleId})
        this.setState({confirm_password: res.googleId})
        this.setState({name: res.profileObj.name})
        console.log(res);
    }
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
        console.log(event.target.value)
    }
    onChangePass(event){
        this.setState({ password: event.target.value });
    }
    onChangeconf(event){
        this.setState({ confirm_password: event.target.value });
    }
     onChangebio(event){
        this.setState({ bio: event.target.value });
    }
     onChangecontact(event){
        this.setState({ contact: event.target.value });
    }

    onCompletion(event) {
         const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(this.state.email).toLowerCase()))
        {
            alert("Invalid Email!");
            return;
        }
        // if(!Number.isInteger(this.state.))
        if(!this.state.name)
        {
            alert("Name is required!");
            return;
        }
        if(!this.state.password)
        {
            alert("Password is required");
            return;
        }
        if(this.state.confirm_password!=this.state.password)
        {
            alert("Both passwords should be equal");
            return;
        }
        if(isNaN(this.state.contact) || this.state.contact.length!=10)
        {
            alert("Please enter valid 10 digit contact");
            return;
        }
         if(!this.state.bio)
        {alert("ENTER BIO");return;}
        var words=this.state.bio.split(" ");
        if(words.length>250){alert("SOP SHOULD BE LESSER THAN 250 WORDS. TRY AGAIN"); return;}
        else{

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.confirm_password,
            contact: this.state.contact,
            bio: this.state.bio
        }
        console.log(newUser)
        axios.post('http://localhost:5000/recruiter/register', newUser)
             .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
             .catch(err => {alert("ERROR: "+err.response.data.err);console.log(err.response)});


        this.setState({
            email: '',
            name: '',
            password: '',
            confirm_password: '',
            contact: '',
            bio: ''
        });
    }
    }

    appendInputEdu() {
        var newInput = "";
        this.setState(prevState => ({ institute: prevState.institute.concat([newInput]) }));
        this.setState(prevState => ({ start_year: prevState.start_year.concat([newInput]) }));
        this.setState(prevState => ({ end_year: prevState.end_year.concat([newInput]) }));
    }
    appendInputSkil() {
        var newInput = "";
        this.setState(prevState => ({ skills: prevState.skills.concat([newInput]) }));
    }
    handleEmailListChange(index, event) {
    var institute = this.state.institute.slice(); // Make a copy of the emails first.
    institute[index] = event.target.value; // Update it with the modified email.
    this.setState({institute: institute}); // Update the state.
}
 handleskillChange(index, event) {
    var institute = this.state.skills.slice(); // Make a copy of the emails first.
    institute[index] = event.target.value; // Update it with the modified email.
    this.setState({skills: institute}); // Update the state.
}
handlestrtchange(index, event) {
    var institute = this.state.start_year.slice(); // Make a copy of the emails first.
    institute[index] = event.target.value; // Update it with the modified email.
    this.setState({start_year: institute}); // Update the state.
}
handleendchange(index, event) {
    var institute = this.state.end_year.slice(); // Make a copy of the emails first.
    institute[index] = event.target.value; // Update it with the modified email.
    this.setState({end_year: institute}); // Update the state.
}
handleskillsdelete(index, event) {
    var institute = this.state.skills.slice(0,index); // Make a copy of the emails first.
    institute.concat(this.state.skills.slice(index+1, this.state.institute.length)); // Update it with the modified email.
    this.setState({skills: institute}); // Update the state.
}
handleeducdelete(index, event) {
    var institute = this.state.institute.slice(0,index); // Make a copy of the emails first.
    institute.concat(this.state.institute.slice(index+1, this.state.institute.length)); // Update it with the modified email.
    var strt = this.state.start_year.slice(0,index); // Make a copy of the emails first.
    strt.concat(this.state.start_year.slice(index+1, this.state.institute.length)); // Update it with the modified email.
    var endyr = this.state.end_year.slice(0,index); // Make a copy of the emails first.
    endyr.concat(this.state.end_year.slice(index+1, this.state.institute.length)); // Update it with the modified email.
    this.setState({institute: institute, start_year: strt, end_year: endyr}); // Update the state.
}
    render() {
        return (
            <form>
            <div>
            <GoogleLogin clientId={clientId} buttonText="Login" onSuccess={this.successlogin}/>
            </div>
            <div >
                <label >Name</label>
                <input disabled onChange={this.onChangeName} className="form-control" placeholder="Name" value={this.state.name}></input>
            </div>
            <div>
                <label for="exampleInputEmail">Email address</label>
                <input disabled type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="abc@xyz.com"  onChange={this.onChangeEmail} value={this.state.email}></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
              <div >
                <label for="exampleInputPassword1" >Contact</label>
                <input className="form-control" id="exampleInputPassword1" onChange={this.onChangecontact} placeholder="10-digit number" value={this.state.contact}></input>
            </div>
              <div >
                <label for="exampleInputPassword1" >Bio</label>
                <textarea type="text" className="form-control" id="exampleInputPassword1" onChange={this.onChangebio} placeholder="Bio" value={this.state.bio}></textarea>
            </div>
            <div>{this.state.bio}</div>
           <div> <button type="button" className="btn btn-primary" onClick={this.onCompletion}>Submit</button>
       </div> </form>
        )
    }
}