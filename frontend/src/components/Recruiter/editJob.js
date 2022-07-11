import React, {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ApplicantNav from './recruiternavbar'
import moment from 'moment';

const rest_form=[];
let educatin_code=<div></div>;
let recid = localStorage.getItem("user_id");


export default class editJob extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            max_applications: '',
            max_positions: '',
            curr_applications: 0,
            curr_positions: 0,
            deadline: '',
            skills: [''],
            job_type: '',
            duration: 0,
            salary: ''
        }
        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangeappl = this.onChangeappl.bind(this);
        this.onCompletion = this.onCompletion.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        // this.onChangeContact = this.onChangeContact.bind(this);
        // this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangesalary = this.onChangesalary.bind(this);
        this.onChangeposition = this.onChangeposition.bind(this);
        this.onChangetype = this.onChangetype.bind(this);
    }

    updateForm = (event) => {
        console.log("YAAY")
        event.target.rest_form +="<div>YAAY</div>"

    }
    componentDidMount() {
        let job_id=localStorage.getItem("job_id");
        axios.get('http://localhost:5000/jobs/getbyid/'+job_id)
             .then(response => {
                 console.log("RESPPP",response)
                 this.setState(response.data);
                 let date=this.state.deadline;
                 date=moment(date, "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DDTHH:mm");
                 this.setState({deadline: date});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onChangetitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangeappl(event) {
        this.setState({ max_applications: event.target.value });
        console.log(event.target.value)
    }
    onChangeposition(event){
        this.setState({ max_positions: event.target.value });
    }
    onChangedeadline(event){
        this.setState({ deadline: event.target.value });
    }
    onChangesalary(event){
        this.setState({ salary: event.target.value });
    }
    onChangeduration(event){
        this.setState({ duration: event.target.value });
    }
    onChangetype(event){
        this.setState({ job_type: event.target.value });
    }
    onCompletion(event) {
        if(!this.state.max_applications)
        {
            alert("Maximum applications required!");
            return;
        }
        if(!this.state.max_positions)
        {
            alert("Number of positions required!");
            return;
        }
        if(!this.state.deadline)
        {
            alert("Deadline required!");
            return;
        }
        const re=/^([1-9]\d*)$/;
        if(!re.test(this.state.max_applications))
        {
            alert("Max Applications must be a positive number!");
            return;
        }
         if(!re.test(this.state.max_positions))
        {
            alert("Max Positions must be a positive number!");
            return;
        }
        if(this.state.max_applications < this.state.curr_applications)
        {
            alert(this.state.curr_applications+" have already applied!");
            return;
        }
        if(this.state.max_positions < this.state.curr_positions)
        {
            alert(this.state.curr_positions+" have already been employed!");
            return;
        }
        if(this.state.max_positions==this.state.curr_positions)
        {
            let data1={job_id: localStorage.getItem("job_id")};
            axios.post('http://localhost:5000/application/rejectothers', data1)
                     .then(() => {
                         console.log("DONE");
                     })
        }


        const re1=/^\+?(0|[1-9]\d*)$/;
        const newUser = {
            max_applications: this.state.max_applications,
            max_positions: this.state.max_positions,
            deadline: this.state.deadline,
            job_id: localStorage.getItem("job_id")
        }
        console.log(newUser)
        axios.post('http://localhost:5000/jobs/update', newUser)
             .then((res) => {
                 window.location.reload();
                 })
             .catch(err => {alert("Error: "+err)});

        // this.setState({
        //   email: '',
        //     name: '',
        //     password: '',
        //     conf_pass: '',
        //     institute: [''],
        //     start_year: [''],
        //     end_year: [''],
        //     skills: ['']
        // });
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
    institute.concat(this.state.skills.slice(index+1, this.state.skills.length)); // Update it with the modified email.
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
                <label >Title</label>
                <input disabled className="form-control" placeholder="Job Title" value={this.state.title}></input>
            </div>
            <div>
                <label for="exampleInputEmail">Maximum Applications</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.max_applications}  onChange={this.onChangeappl}></input>
            </div>
            <div >
                <label for="exampleInputPassword1">Number of Positions</label>
                <input className="form-control" id="exampleInputPassword1" onChange={this.onChangeposition} value={this.state.max_positions}></input>
            </div>
            <div >
                <label for="exampleInputPassword1" >Deadline</label>
                <input type="datetime-local" className="form-control" id="exampleInputPassword1" onChange={this.onChangedeadline} value={(this.state.deadline)}></input>
            </div>
    <div>
    <label for="exampleInputEmail">Required Skills</label>
    {this.state.skills.map((skill, index) => (
         <div key={index} className="input-group">
                <input className="form-control" list="languages" disabled value={skill} onChange={this.handleskillChange.bind(this, index)} placeholder="Enter skill"></input>
                <datalist id="languages">
                <option className = "list-group-item"> Python</option>
                <option className = "list-group-item"> Javascript</option>
                <option className = "list-group-item"> React</option>
                <option className = "list-group-item"> Angular</option>
                <option className = "list-group-item"> Node</option>
                <option className = "list-group-item"> Django</option>
                </datalist>
                <button type="button" disabled className="btn btn-primary" onClick={this.handleskillsdelete.bind(this, index)}>Delete</button>
            </div>
    ))}
    <button type="button" className="btn btn-primary" disabled onClick={ () => this.appendInputSkil() }>Add Skills</button>
    </div>
    <div >
                <label >Job Type</label>
                <select onChange={this.onChangetype} disabled className="form-control" placeholder="Job Title" value={this.state.job_type}>
                <option value="Work-from-home">Work From Home</option>
                <option value="Full-time">Full Time</option>
                <option value="Part-time">Part Time</option>
                </select>
    </div>
     <div >
                <label >Duration</label>
                <select onChange={this.onChangeduration} disabled className="form-control" placeholder="Job Title" value={this.state.duration}>
                <option value = {0}>Indefinite</option>
                <option value = {1}>1 month</option>
                <option value = {2}>2 month</option>
                <option value = {3}>3 month</option>
                <option value = {4}>4 month</option>
                <option value = {5}>5 month</option>
                <option value = {6}>6 month</option>
                </select>
    </div>
    <div >
                <label >Salary</label>
                <input onChange={this.onChangesalary} disabled className="form-control" placeholder="Salary in Rs." value={this.state.salary}></input>
            </div>
    {/* <div>
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={this.onChangeEmail}></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div >
                <label for="exampleInputPassword1"  onChange={this.onChangePassword}>Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div> */}
           <div> <button type="button" className="btn btn-primary" onClick={this.onCompletion}>Submit</button>
       </div>
       <div>{this.state.deadline}</div>
       <div>{moment(this.state.deadline, "YYYY-MM-DDTHH:mm:ssZ").format('DD-MM-YYYY')}</div> </form></div>
        )
    }
}