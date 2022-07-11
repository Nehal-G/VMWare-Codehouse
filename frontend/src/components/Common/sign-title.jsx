import React from "react"
import signupImg from "../Common/Images/office.png";

function Title(){
    return(
        <div style={{backgroundColor:"#B2C8DF"}} className="container">
  <div className="row align-items-start">
    <div className="col title-div">
    <h2 >HEY THERE! </h2>
    <h3>Sign Up on Hetero-Mutants Today</h3>
    </div>
    <div className="col">
      <img src={signupImg}></img>
    </div>
  </div>
  </div>
    )
}

export default Title