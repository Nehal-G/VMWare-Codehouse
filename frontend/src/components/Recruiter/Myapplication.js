import React, {Component} from 'react';
import { useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Rating from '@material-ui/lab/Rating'
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ls from "local-storage";
import ApplicantNav from './recruiternavbar'
import {max} from 'moment';
import moment from 'moment';



let applicant_id=localStorage.getItem('user_id');


class RecrApps extends Component {


    constructor(props) {
        super(props);
        this.state = {jobs: [],sortedUsers: [], sortDur:true, sortRat:true, sortSal:true, filteredjobs: [], searchfilter: '', typefilter: "All", minsal: '', maxsal: ''};
        this.renderIconSal = this.renderIconSal.bind(this);
        this.renderIconDur = this.renderIconDur.bind(this);
        this.renderIconRat = this.renderIconRat.bind(this);
        this.sortChangeRat = this.sortChangeRat.bind(this);
        this.sortChangeDur = this.sortChangeDur.bind(this);
        this.sortChangeSal = this.sortChangeSal.bind(this);
        this.onchangeSearch = this.onchangeSearch.bind(this);
        this.changemax = this.changemax.bind(this);
        this.changemin = this.changemin.bind(this);
        this.typefilterchange = this.typefilterchange.bind(this);
        // this.recruiterids = this.recruiterids.bind(this);
    }

recruiterids(index, event) {
    var institute = this.state.end_year.slice(); // Make a copy of the emails first.
    institute[index] = event.target.value; // Update it with the modified email.
    this.setState({end_year: institute}); // Update the state.
}

shortlist(index, event){
    let data={application_id: this.state.filteredjobs[index]._id, value: 1};
    axios.post('http://localhost:5000/application/status', data)
             .then(() => {window.location.reload()})
             .catch(err => {alert("Error: "+err)});
}

reject(index, event){
    let data={application_id: this.state.filteredjobs[index]._id, value: -1};
    axios.post('http://localhost:5000/application/status', data)
             .then(() => {window.location.reload()})
             .catch(err => {alert("Error: "+err)});
}

accept(index, event){
    let data={application_id: this.state.filteredjobs[index]._id, value: 2};
    let max_positions = this.state.filteredjobs[index].job_id.max_positions;
    let curr_positions = this.state.filteredjobs[index].job_id.curr_positions;
    let data1={job_id: this.state.filteredjobs[index].job_id,
    applicant_id: this.state.filteredjobs[index].applicant_id,
    recruiter_name: localStorage.getItem("user_name"),
    job_name: this.state.filteredjobs[index].job_id.title,
    applicant_name: this.state.filteredjobs[index].applicant_id.name,
    applicant_email: this.state.filteredjobs[index].applicant_id.email,
    application_id: this.state.filteredjobs[index]._id};
    axios.post('http://localhost:5000/application/accept', data1)
    .then(() => {
        console.log("YAAY");
    })
    axios.post('http://localhost:5000/application/status', data)
             .then(() => {
                 console.log(curr_positions);
                 console.log(max_positions);
                 if(curr_positions==max_positions-1)
                 {
                     axios.post('http://localhost:5000/application/rejectothers', data1)
                     .then(() => {
                        window.location.reload();
                     })
                 }
                 else {
                    window.location.reload();
                 }
                 })
             .catch(err => {alert("Error: "+err)});
}

typefilterchange(event) {
    this.setState({typefilter: event.target.value}); // Update the state.
    console.log(this.state.typefilter)
    this.filterJobs();
}

 onchangeSearch(event) {
        this.setState({ searchfilter: event.target.value });
        console.log(event.target.value);

    }
    changemax(event) {
        this.setState({ minsal: event.target.value });
        console.log(event.target.value);

    }
    changemin(event) {
        this.setState({ maxsal: event.target.value });
        console.log(event.target.value);

    }

    componentDidMount() {
        var job_id=localStorage.getItem("job_id");
        var recruiter_id=localStorage.getItem("user_id");
        axios.get('http://localhost:5000/application/job',{params: {job_id: job_id, recruiter_id: recruiter_id}})
             .then(response => {
                 console.log(response);
                 this.setState({jobs: response.data, filteredjobs: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    filterJobs = (event) => {
        let jobfilter = this.state.searchfilter;
        console.log(jobfilter)
        let filteredjobs=this.state.jobs;
        filteredjobs = filteredjobs.filter((job) => {
            let jobname = job.title.toLowerCase();
            console.log(this.state.typefilter);
            return (jobname.indexOf(jobfilter.toLowerCase()) !== -1 && (this.state.typefilter == "All" || job.job_type == this.state.typefilter) && (this.state.minsal=='' || job.salary>=this.state.minsal) && (this.state.maxsal=='' || job.salary<=this.state.maxsal))
        })
        this.setState({
            filteredjobs
        })
    }

    sortChangeDur(){
/**
 *      Note that this is sorting only at front-end.
 */

        var array = this.state.filteredjobs;
        var flag = !this.state.sortDur;
        array.sort(function(a, b) {
            if(a.rating != undefined && b.rating != undefined){
                return (flag ? (a.rating - b.rating) : (b.rating-a.rating));
            }
            else{
                return 1;
            }
          });
        this.setState({
            filteredjobs:array,
            sortDur:!this.state.sortDur,
        })
    }

    sortChangeSal(){
/**
 *      Note that this is sorting only at front-end.
 */

        var array = this.state.filteredjobs;
        var flag = !this.state.sortSal;
        array.sort(function(a, b) {
            if(a.applicant_id.name != undefined && b.applicant_id.name != undefined){
                return flag ? a.applicant_id.name.localeCompare(b.applicant_id.name) : b.applicant_id.name.localeCompare(a.applicant_id.name);
            }
            else{
                return 1;
            }
          });
        this.setState({
            filteredjobs:array,
            sortSal:!this.state.sortSal,
        })
    }

    sortChangeRat(){
/**
 *      Note that this is sorting only at front-end.
 */

        var array = this.state.filteredjobs;
        var flag = !this.state.sortRat;
        array.sort(function(a, b) {
            if(a.createdAt != undefined && b.createdAt != undefined){
                return (1 - flag*2) * (new Date(a.createdAt) - new Date(b.createdAt));
            }
            else{
                return 1;
            }
          });
        this.setState({
            filteredjobs:array,
            sortRat:!this.state.sortRat,
        })
    }


    renderIconSal(){
        if(this.state.sortSal){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )
        }
    }

    renderIconRat(){
        if(this.state.sortRat){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )
        }
    }

    renderIconDur(){
        if(this.state.sortDur){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )
        }
    }

    render() {
        return (
            <div>
            <ApplicantNav/>
                {/* <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    {/* <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField value = {this.state.searchfilter} onChange={this.onchangeSearch}
                        id="standard-basic"
                        label="Search"
                        fullWidth={true}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment >
                                    <IconButton onClick = {this.filterJobs}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        /> */}
                    {/* </List> */}
                    {/* </Grid> */}
                {/* </Grid> */}
                <Grid container>
                    {/* <Grid item xs={12} md={3} lg={3}> */}
                        {/* <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" value={this.state.minsal} onChange={this.changemax} label="Enter Min" fullWidth={true} />
                                    <TextField id="standard-basic" value={this.state.maxsal} onChange={this.changemin} label="Enter Max" fullWidth={true}/>
                                </form>
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                {/* <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.jobs}
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Names" variant="outlined" />}
                                /> */}
                                {/* <FormControl>
                                <InputLabel id="demo-simple-select-helper-label">Job Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper" onChange = {this.typefilterchange} value={this.state.typefilter}
                                >
                                <MenuItem value={"All"}>All</MenuItem>
                                <MenuItem value={"Part-Time"}>Part Time</MenuItem>
                                <MenuItem value={"Full-Time"}>Full Time</MenuItem>
                                <MenuItem value={"Work-From-Home"}>Work From Home</MenuItem>
                                </Select>
                                </FormControl>
                            </ListItem>
                        </List> */}
                    {/* </Grid> */}
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            {/* <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Date</TableCell> */}
                                            <TableCell> <Button onClick={this.sortChangeSal}>{this.renderIconSal()}</Button>Name</TableCell>
                                            <TableCell>Skills</TableCell>
                                            <TableCell> <Button onClick={this.sortChangeRat}>{this.renderIconRat()}</Button>Date of Application</TableCell>
                                            <TableCell>Education</TableCell>
                                            <TableCell>SOP</TableCell>
                                            <TableCell> <Button onClick={this.sortChangeDur}>{this.renderIconDur()}</Button>Rating</TableCell>
                                            <TableCell>Resume</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>

                                            {/* <TableCell>Recruiter Name</TableCell>
                                            <TableCell> <Button onClick={this.sortChangeSal}>{this.renderIconSal()}</Button>Salary</TableCell>
                                            <TableCell> <Button onClick={this.sortChangeRat}>{this.renderIconRat()}</Button>Rating</TableCell>
                                            <TableCell> <Button onClick={this.sortChangeDur}>{this.renderIconDur()}</Button>Duration</TableCell>
                                            <TableCell>Deadline</TableCell>
                                            <TableCell>Job Type</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.filteredjobs.map((job,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.applicant_id.name}</TableCell>
                                            {/* <TableCell>{job.applicant_id.skills}</TableCell> */}
                                            <TableCell>
                                            {job.applicant_id.skills.map((skill, index) => (
                                               <span>{skill}, </span>
                                            ))}
                                            </TableCell>
                                            <TableCell>{moment(job.createdAt).local().format("YYYY-MM-DD")}</TableCell>
                                            {/* <TableCell>{job.applicant_id.education}</TableCell> */}
                                             <TableCell>
                                            {job.applicant_id.institute.map((insti, index) => (
                                               <span>{insti}: {job.applicant_id.start_year[index]}-{job.applicant_id.end_year[index]}<br/></span>
                                            ))}
                                            </TableCell>
                                            <TableCell>{job.sop}</TableCell>
                                            <TableCell>
                                            <Rating name="read-only" value={job.rating} precision={0.1} readOnly />
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    (() => {
                                                        if(!job.applicant_id.resumee){return <span>N/A</span>;}
                                                        else {return <a href={job.applicant_id.resumee} class="button" download target="_blank"><i class="fa fa-download"></i>Download Resume</a>;}
                                                    }
                                                )()}
                                            </TableCell>
                                            <TableCell>
                                             {
                                                (() => {
                                                    if(job.status==0){return <button className="btn-sm btn-dark">APPLIED</button>;}
                                                    else if(job.status==1){return <button className="btn-sm btn-secondary">SHORTLISTED</button>;}
                                                    else if(job.status==2){return <button className="btn-sm btn-success">ACCEPTED</button>}
                                                    else if(job.status==-1){return <button className="btn-sm btn-danger">REJECTED</button>}
                                                }
                                            )()}
                                            </TableCell>
                                            <TableCell>
                                             {
                                                (() => {
                                                    if(job.status==0){return <button className="btn-sm btn-success" onClick={this.shortlist.bind(this, ind)}>SHORTLIST</button>;}
                                                    else if(job.status==1){return <button className="btn-sm btn-success" onClick={this.accept.bind(this, ind)}>ACCEPT</button>;}
                                                }
                                            )()}
                                            </TableCell>
                                            <TableCell>
                                             {
                                                (() => {
                                                    {if(job.status!=2)return <button className="btn-sm btn-danger" onClick={this.reject.bind(this, ind)}>REJECT</button>;}
                                                }
                                            )()}
                                            </TableCell>
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default RecrApps;