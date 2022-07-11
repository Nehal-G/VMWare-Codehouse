import React, {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ApplicantNav from './recruiternavbar'
const rest_form=[];

export default class RecProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            contact: '',
            bio: '',
            email: ''
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
    }

    updateForm = (event) => {
        console.log("YAAY")
        event.target.rest_form +="<div>YAAY</div>"

    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    componentDidMount() {
        let recruiter_id=localStorage.getItem("user_id");
        axios.get('http://localhost:5000/recruiter/getbyid/'+recruiter_id)
             .then(response => {
                 console.log("RESPPP",response)
                 this.setState(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })
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

        const newUser = {
            name: this.state.name,
            contact: this.state.contact,
            bio: this.state.bio,
            recruiter_id: localStorage.getItem("user_id")
        }
        console.log(newUser)
        axios.post('http://localhost:5000/recruiter/update', newUser)
             .then((res) =>
             {
                 window.location='/recruiter'
             })
             .catch(err => console.log(err));

        this.setState({
            email: '',
            name: '',
            password: '',
            confirm_password: '',
            contact: '',
            bio: ''
        });
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
            <div><ApplicantNav/>
            <form>
            <div >
                <label >Email</label>
                <input className="form-control" value={this.state.email} disabled></input>
            </div>
            <div >
                <label >Name</label>
                <input onChange={this.onChangeName} className="form-control" placeholder="Name" value={this.state.name} disabled></input>
            </div>
              <div >
                <label for="exampleInputPassword1" >Contact</label>
                <input className="form-control" id="exampleInputPassword1" onChange={this.onChangecontact} placeholder="Password" disabled value={this.state.contact}></input>
            </div>
              <div >
                <label for="exampleInputPassword1" >Bio</label>
                <textarea type="text" className="form-control" id="exampleInputPassword1" onChange={this.onChangebio} placeholder="Password" disabled value={this.state.bio}></textarea>
            </div>
       </form></div>
        )
    }
}