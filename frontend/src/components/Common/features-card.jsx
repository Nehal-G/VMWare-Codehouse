import React from "react";

function Fcard(props){

    return(
        <div className="card fcard" style={{width: '16rem'}}>
  <img src={props.img} style={{height:"10rem" , width:"auto"}} className="card-img-top" alt="..." />
  <div className="card-body">
  <h2 className="card-head">{props.head}</h2>
    <p className="card-text">{props.text}</p>
  </div>
</div>


    )

}

export default Fcard