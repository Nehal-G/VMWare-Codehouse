import React, {Component} from 'react';
import axios from 'axios';
import CommonNav from './commonnavbar'
import Title from "./title"
import Features from "./features"
import Features2 from "./features2"
import Team from "./team"
import Footer from "./footer"

let user_id=localStorage.getItem('id');
let user_type=localStorage.getItem('user_type');
let returnval = <div></div>

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(event)
    {
        user_id=localStorage.getItem("id");
        user_type=localStorage.getItem("user_type");
        console.log(user_type);
        console.log(user_id);
        if(user_type=="Applicant")
        {
            console.log("YAAY")
            window.location='/applicant/';
        }
        else if(user_type=="Recruiter")
        {
            window.location='/recruiter'
        }
    }

    render() {
        return (
            <div>
            <div className="gradient">
            <CommonNav></CommonNav>
            <Title></Title>
            </div>
            <Features></Features>
            <Features2></Features2>
            <Team></Team>
            <Footer></Footer>
        </div>
        )
        }
}