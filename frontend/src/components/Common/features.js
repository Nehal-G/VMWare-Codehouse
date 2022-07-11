import React from "react";
import Woman from "./Images/woman.png";
import Search from "./Images/search.png";
import Office from "./Images/workspace.png";
import Blog from "./Images/blog.png";
import FCard from "./features-card"

function Features(){
    return(
      

      <div className="container">
  <div className="row align-items-start">
    <h1 style={{textAlign:"center", marginBottom:'3%'}}>WHAT WE OFFER</h1>
    <div className="col-md-3">
    <FCard img={Woman} head="ADD USER PROFILE" text="Users will be able to create profiles for comapnies to look"/> 
    </div>
    <div className="col-md-3">
    <FCard img={Search} head="LOOK FOR REVELANT JOBS" text="  Users can find Jobs/interns according to their insterest"/> 
    </div>
    <div className="col-md-3">
    <FCard img={Office} head="HIRE INTERNS/CANDIDATES" text="Org can post jobs/internships for candidates to apply"/> 
    </div>
    <div className="col-md-3">
    <FCard img={Blog} head="POST OPPORTUNITIES" text="Companies can find employess that fit their profile"/> 
    </div>
  </div>
  </div> 
    )
}

export default Features