import React, {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FileUpload from './fileupload';
import {AssessmentRounded} from '@material-ui/icons';
import ApplicantNav from './applicantnavbar'

const rest_form=[];
let educatin_code=<div></div>;


export default class EditApplicant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            password: '',
            conf_pass: '',
            institute: [''],
            start_year: [''],
            end_year: [''],
            skills: [''],
            resumee: null,
            file: null,
            filename: '',
            filepath: '',
            progress: 0,
            profile_pic: null,
            profile: null,
            profilename: '',
            profilepath: '',
            profileprogress: 0
        }
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onCompletion = this.onCompletion.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        // this.onChangeContact = this.onChangeContact.bind(this);
        // this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeconf = this.onChangeconf.bind(this);
        this.onChangeResumee = this.onChangeResumee.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.onChangeProfile = this.onChangeProfile.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
    }

    updateForm = (event) => {
        console.log("YAAY")
        event.target.rest_form +="<div>YAAY</div>"

    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

//     FileUpload()
//     {
//     // const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
//     // const [data, getFile] = useState({ name: "", path: "" });    const [progress, setProgess] = useState(0); // progess bar
//     const file=this.state.resumee;
//     const uploadFile = () => {
//         const formData = new FormData();
//         formData.append('file', file); // appending file
//         axios.post('http://localhost:5000/upload', formData, {
//             onUploadProgress: (ProgressEvent) => {
//                 let progress = Math.round(
//                 ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
//             }
//         })
//         .then(res => {
//             console.log(res);
//             console.log("YAAAY");
//             this.setState({resumee: "http://localhost:5000"+res.data.path});
//             // getFile({ name: res.data.name,
//             //          path: 'http://localhost:4500' + res.data.path
//             //        })
//         })
//         .catch(err => console.log(err))}

//     // return (
//     //     <div>
//     //         <div className="file-upload">
//     //             <input type="file" ref={el} onChange={handleChange} />                <div className="progessBar" style={{ width: progress }}>
//     //                {progress}
//     //             </div>
//     //             <button onClick={uploadFile} className="upbutton">                   Upload
//     //             </button>
//     //         <hr />
//     //         {/* displaying received image*/}
//     //         {data.path && <img src={data.path} alt={data.name} />}
//     //         </div>
//     //     </div>
//     // );
// }

    onChangeResumee(event) {
        console.log(event.target);
        this.setState({ file: event.target.files[0] });
        console.log(event.target.files[0]);
    }

    onChangeProfile(event) {
        console.log(event.target);
        this.setState({ profile: event.target.files[0] });
        console.log(event.target.files[0]);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
        console.log(event.target.value)
    }
    onChangePass(event){
        this.setState({ password: event.target.value });
    }
    onChangeconf(event){
        this.setState({ conf_pass: event.target.value });
    }
    onChangeUser(event){
        this.setState({ user_type: event.target.value });
        {

        }
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
        var flag=0;
        var len=this.state.skills.length;
        if(!this.state.skills[len-1])
        {
            alert("EMPTY SKILL FIELD!");
            return;
        }

        var len=this.state.institute.length;
        if(!this.state.institute[len-1])
        {
            alert("ENTER INSTITUTE");
            return;
        }
        if(!this.state.start_year[len-1])
        {
            alert("ENTER START YEAR");
            return;
        }
        var l=this.state.start_year[len-1].length;
        console.log(l);
        if(isNaN(this.state.start_year[len-1]) || l!=4)
        {
            alert("INVALID YEAR");
            return;
        }
        console.log(isNaN(this.state.end_year[len-1]));
        if(this.state.end_year[len-1]!='' && (isNaN(this.state.end_year[len-1]) || this.state.end_year[len-1].length!=4))
        {
            alert("INVALID YEAR");
            return;
        }


        const newUser = {
            name: this.state.name,
            institute: this.state.institute,
            start_year: this.state.start_year,
            end_year: this.state.end_year,
            skills: this.state.skills,
            resumee: this.state.filepath,
            profile_pic: this.state.profilepath,
            applicant_id: localStorage.getItem("user_id")
        }
        localStorage.setItem("user_name", this.state.name);
        console.log(newUser)
        axios.post('http://localhost:5000/applicant/update', newUser)
             .then(res => {alert("Updated");console.log(res.data);window.location="/applicant/profile";})
             .catch(err => {alert("Error: "+err)});

        this.setState({
            email: '',
            name: '',
            password: '',
            conf_pass: '',
            institute: [''],
            start_year: [''],
            end_year: [''],
            skills: [''],
            resumee: null,
            file: null,
            filename: '',
            filepath: '',
            progress: 0
        });
    }

    appendInputEdu() {
         var newInput = "";
        var len=this.state.institute.length;
        if(len>0 &&!this.state.institute[len-1])
        {
            alert("ENTER INSTITUTE");
            return;
        }
        if(len>0 && !this.state.start_year[len-1])
        {
            alert("ENTER START YEAR");
            return;
        }
        var l=len>0 ? this.state.start_year[len-1].length : 0;
        console.log(l);
        if(len>0 && (isNaN(this.state.start_year[len-1]) || l!=4))
        {
            alert("INVALID YEAR");
            return;
        }
        console.log(isNaN(this.state.end_year[len-1]));
        if(len>0 && this.state.end_year[len-1]!='' && (isNaN(this.state.end_year[len-1]) || this.state.end_year[len-1].length!=4))
        {
            alert("INVALID YEAR");
            return;
        }
        this.setState(prevState => ({ institute: prevState.institute.concat([newInput]) }));
        this.setState(prevState => ({ start_year: prevState.start_year.concat([newInput]) }));
        this.setState(prevState => ({ end_year: prevState.end_year.concat([newInput]) }));
    }
    appendInputSkil() {
        if(this.state.skills.length>0 && !this.state.skills[this.state.skills.length-1])
        {
            alert("EMPTY SKILL FIELD!")
            return;
        }
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
    console.log(index);
    var array=this.state.skills;
    array.splice(index,1);
    this.setState({skills: array}); // Update the state.
}
handleeducdelete(index, event) {
    var institute = this.state.institute; // Make a copy of the emails first.
    institute.splice(index,1);
    var strt = this.state.start_year; // Make a copy of the emails first.
    strt.splice(index,1);
    var endyr = this.state.end_year; // Make a copy of the emails first.
    endyr.splice(index, 1);
    this.setState({institute: institute, start_year: strt, end_year: endyr}); // Update the state.
}
componentDidMount()
{
        let recruiter_id=localStorage.getItem("user_id");
        axios.get('http://localhost:5000/applicant/getbyid/'+recruiter_id)
             .then(response => {
                 console.log("RESPPP",response)
                 this.setState(response.data);
                 this.setState({profilepath: response.data.profile_pic, filepath: response.data.resumee, profilename: response.data.profile_pic, filename: response.data.resumee})
             })
             .catch(function(error) {
                 console.log(error);
             })
}


uploadFile()
{
        const formData = new FormData();
        formData.append('file', this.state.file); // appending file
        axios.post('http://localhost:5000/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                this.setState({progress: progress});
            }
        }).then(res => {
            console.log(res);
            this.setState({filename: res.data.name});
            this.setState({filepath: 'http://localhost:5000' + res.data.path})
        }).catch(err => console.log(err))
}

uploadProfile()
{
        const formData = new FormData();
        formData.append('file', this.state.profile); // appending file
        axios.post('http://localhost:5000/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                this.setState({profileprogress: progress});
            }
        }).then(res => {
            console.log(res);
            this.setState({profilename: res.data.name});
            this.setState({profilepath: 'http://localhost:5000' + res.data.path})
        }).catch(err => console.log(err))
}

    render() {
        return (
            <div>
            <ApplicantNav/>
            <form>
            <div >
                <label >Name</label>
                <input required onChange={this.onChangeName} className="form-control" placeholder="Name" value={this.state.name}></input>
            </div>
            <div>
                <label for="exampleInputEmail">Email address</label>
                <input disabled required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="abc@xyz.com" value={this.state.email}  onChange={this.onChangeEmail}></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
    <div>
    <label for="exampleInputEmail">Skills</label>
    {this.state.skills.map((skill, index) => (
         <div key={index} className="input-group">
                <input className="form-control" list="languages" value={skill} onChange={this.handleskillChange.bind(this, index)} placeholder="Enter skill"></input>
                <datalist id="languages">
                <option className = "list-group-item"> Python</option>
                <option className = "list-group-item"> Javascript</option>
                <option className = "list-group-item"> React</option>
                <option className = "list-group-item"> Angular</option>
                <option className = "list-group-item"> Node</option>
                <option className = "list-group-item"> Django</option>
                </datalist>
                <button type="button" className="btn btn-primary" onClick={this.handleskillsdelete.bind(this, index)}>Delete</button>
            </div>
    ))}
    <button type="button" className="btn btn-primary" onClick={ () => this.appendInputSkil() }>Add Skills</button>

            <hr />

    </div>
    <div>
    <label for="exampleInputEmail">Education</label>
    {this.state.institute.map((insti, index) => (
         <div key={index} className="input-group">
                <label for="exampleInputEmail">Institute</label>
                <input className="form-control" value={insti} onChange={this.handleEmailListChange.bind(this, index)} placeholder="Institute Name"></input>

                <label for="exampleInputEmail" required>Start Year</label>
                <input className="form-control" value={this.state.start_year[index]} onChange={this.handlestrtchange.bind(this, index)} placeholder="YYYY"></input>
                <label for="exampleInputEmail">End Year</label>
                <input className="form-control" value={this.state.end_year[index]} onChange={this.handleendchange.bind(this, index)} placeholder="YYYY(Optional)"></input>
                <button type="button" className="btn btn-primary" onClick={this.handleeducdelete.bind(this, index)}>Delete</button>
            </div>
    ))}
    </div>
    <div>
    <button type="button" className="btn btn-primary" onClick={ () => this.appendInputEdu() }>
                   Add Education</button>
                   </div>
    <div>
            <hr />

            <div className="file-upload">
            <label>UPLOAD RESUME</label>
                <input type="file" onChange={this.onChangeResumee} id="file-selector" multiple />
                    <div className="progessBar">
                   {this.state.progress}
                </div>
                <button type="button" onClick={this.uploadFile} className="upbutton">                   Upload
                </button>
            {/* displaying received image*/}
            <div>
            <a href={this.state.filepath} class="button" download target="_blank"><i class="fa fa-download"></i>Download Resume</a>
            </div>
            <hr />
            </div>
        </div>

    <div>
            <div className="file-upload">
            <label>UPLOAD ProfilePic</label>
                <input type="file" onChange={this.onChangeProfile} id="file-selector" multiple />
                    <div className="progessBar">
                   {this.state.profileprogress}
                </div>
                <button type="button" onClick={this.uploadProfile} className="upbutton">Upload
                </button>
            <hr />
            <div><img src={this.state.profilepath} alt={this.state.profilename} style={{width: 100, height: 100}}></img></div>
            </div>
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
       {/* <FileUpload/> */}
       </form>
       </div>
        )
    }
}