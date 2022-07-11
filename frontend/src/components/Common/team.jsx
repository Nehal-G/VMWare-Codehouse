import React from "react"
import FCard from "./features-card"
import Preeti from "./Images/Preeti.jpeg"
import Manasa from "./Images/Manasa.jpg"
import Sathwika from "./Images/Sathwika.jpeg"
import Nehal from "./Images/Nehal.jpg"

function Team(){
    return(       
    <div className="container">
    <div className="row align-items-start">
      <div className="col-md-3">
    <FCard img={Manasa} head="Manasa"></FCard>
      </div>
      <div className="col-md-3">
      <FCard img={Nehal} head="Nehal"></FCard>
      </div>
      <div className="col-md-3">
      <FCard img={Preeti} head="Preeti"></FCard>
      </div>
      <div className="col-md-3">
      <FCard img={Sathwika} head="Sathwika"></FCard>
      </div>
    </div>
    </div>)
}

export default Team