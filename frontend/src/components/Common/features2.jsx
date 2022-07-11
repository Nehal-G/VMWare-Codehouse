import React from "react";
import Woman from "./Images/businesswoman.png";
import Office from "./Images/workplace.png";
import tick from "./Images/checked.png";


function Features2(){
    return(

      <div className="container">
  <div className="row align-items-start">
    <div className="col-md-6 f2 user">
    <h2>FOR USER</h2> 
    <img src={Woman} className="main-img"></img>
    <ul style={{listStyle:"none" , textAlign:"left"}}>
    <li >
    <p><img src={tick} style={{height:20 ,width:20}}></img> Create Profile, Add interests</p>
        </li>
        <li >
        <p><img src={tick} style={{height:20 ,width:20}}></img> Get noticed by companies for jobs and internships</p>
        </li>
        <li >
        <p><img src={tick} style={{height:20 ,width:20}}></img> Learn what companies are looking for</p>
        </li>
        <li >
        <p><img src={tick} style={{height:20 ,width:20}}></img> Look for jobs of interest and on basis of experience</p>
        </li>
    </ul>
        

    </div>
    <div className="col-md-6 f2 org">
    <h2>FOR ORGANIZATIONS</h2>
    <img src={Office} className="main-img"></img>
    <ul style={{listStyle:"none", textAlign:"left"} }>
    <li >
    <p><img src={tick} style={{height:20 ,width:20}}></img>   Add Jobs and internships for candidates to apply</p>
        </li>
        <li >
        <p><img src={tick} style={{height:20 ,width:20}}></img>   Look for suitable candidates</p>
        </li>
        <li >
        <p><img src={tick} style={{height:20 ,width:20}}></img>   Connect with candidates that match job profile</p>
        </li>
        <li >
        <p><img src={tick} style={{height:20 ,width:20}}></img>   Post required skillset and expereince</p>
        </li>
    </ul>
    
    </div>
  </div>
  </div> 
    )
}

export default Features2