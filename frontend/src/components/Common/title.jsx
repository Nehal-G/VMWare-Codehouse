import React from "react"
import titleImage from "./Images/titleImage.png";

function Title(){
    return(
        <div className="container">
  <div className="row align-items-start">
  <span className="dot"></span>
    <div className="col title-div">
    <h2 >GET YOUR </h2>
      <h1 className="inline">CAREER</h1>
      <h2 > BACK ON </h2>
      <h1>TRACK</h1>
      <button type="button" class="btn btn-outline-dark">Get Started</button>
    </div>
    <div className="col">
      <img src={titleImage}></img>
    </div>
  </div>
  </div>
    )
}

export default Title